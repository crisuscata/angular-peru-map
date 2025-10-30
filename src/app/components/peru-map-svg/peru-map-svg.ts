import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-peru-map-svg',
  templateUrl: './peru-map-svg.html',
  styleUrls: ['./peru-map-svg.scss']
})
export class PeruMapSvg implements AfterViewInit {
  @ViewChild('mapWrapper', { static: true }) mapWrapper!: ElementRef<HTMLDivElement>;

  private scale = 1;
  private readonly step = 0.1;
  private readonly minScale = 0.5;
  private readonly maxScale = 2;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    const container = (this.mapWrapper && this.mapWrapper.nativeElement) ? this.mapWrapper.nativeElement : this.el.nativeElement;
    const paths = Array.from(container.querySelectorAll('path')) as SVGPathElement[];

    // HTML tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'svg-tooltip';
    Object.assign(tooltip.style, {
      position: 'fixed',
      pointerEvents: 'none',
      padding: '6px 8px',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: '9999',
      display: 'none',
      transform: 'translate(-50%, -100%)'
    });
    document.body.appendChild(tooltip);

    // Info toolbar (hidden by default)
    const toolbar = document.createElement('div');
    toolbar.className = 'dept-toolbar';
    toolbar.innerHTML = `
      <div class="dept-toolbar-inner">
        <button class="dept-toolbar-close" aria-label="Cerrar">✕</button>
        <h3 class="dept-toolbar-title"></h3>
        <div class="dept-toolbar-message"></div>
      </div>
    `;
    document.body.appendChild(toolbar);

    const toolbarTitle = toolbar.querySelector('.dept-toolbar-title') as HTMLElement;
    const toolbarMessage = toolbar.querySelector('.dept-toolbar-message') as HTMLElement;
    const toolbarClose = toolbar.querySelector('.dept-toolbar-close') as HTMLElement;
    toolbarClose?.addEventListener('click', () => toolbar.classList.remove('visible'));

    // Attach events to each path
    paths.forEach((path: SVGPathElement) => {
      const depto = path.getAttribute('title') || path.getAttribute('data-name') || 'Sin nombre';
      const bbox = path.getBBox();
      const originalFill = path.getAttribute('fill') || (window.getComputedStyle(path as any).fill || '#7e57c2'); // morado base

      // --- Añadir pin en el centro del departamento ---
      const svgEl = container.querySelector('svg');
      if (svgEl) {
        const pin = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        pin.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'icons/pin.png');
        pin.setAttribute('width', '16');
        pin.setAttribute('height', '22');
        pin.setAttribute('x', (bbox.x + bbox.width / 2 - 8).toString());
        pin.setAttribute('y', (bbox.y + bbox.height / 2 - 22).toString());
        pin.style.cursor = 'pointer';
        svgEl.appendChild(pin);

        // Eventos para tooltip y clic
        pin.addEventListener('mouseover', (e: MouseEvent) => {
          tooltip.textContent = depto;
          tooltip.style.display = 'block';
          tooltip.style.left = `${e.clientX + 10}px`;
          tooltip.style.top = `${e.clientY + 10}px`;
        });
        pin.addEventListener('mousemove', (e: MouseEvent) => {
          tooltip.style.left = `${e.clientX + 10}px`;
          tooltip.style.top = `${e.clientY + 10}px`;
        });
        pin.addEventListener('mouseout', () => (tooltip.style.display = 'none'));
        pin.addEventListener('click', (ev: MouseEvent) => {
          const msg = path.getAttribute('data-message') || `Información sobre ${depto}`;
          toolbarTitle.textContent = depto;
          toolbarMessage.textContent = msg;
          toolbar.classList.add('visible');
          ev.stopPropagation();
        });
      }

      // --- Tooltip y hover del departamento ---
      const onMouseOver = (e: MouseEvent) => {
        (path as any).style.fill = '#ffffff';
        tooltip.textContent = depto;
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
      };

      const onMouseMove = (e: MouseEvent) => {
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
      };

      const onMouseOut = () => {
        (path as any).style.fill = originalFill;
        tooltip.style.display = 'none';
      };

      path.addEventListener('mouseover', onMouseOver);
      path.addEventListener('mousemove', onMouseMove);
      path.addEventListener('mouseout', onMouseOut);

      // clic abre panel informativo
      path.addEventListener('click', (ev: MouseEvent) => {
        const customMsg = path.getAttribute('data-message') || `Información sobre ${depto}`;
        toolbarTitle.textContent = depto;
        toolbarMessage.textContent = customMsg;
        toolbar.classList.add('visible');
        ev.stopPropagation();
      });
    });

    // ocultar toolbar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!toolbar.contains(e.target as Node)) toolbar.classList.remove('visible');
    });

    this.applyScale();
  }

  reduce(): void {
    this.scale = Math.max(this.minScale, +(this.scale - this.step).toFixed(2));
    this.applyScale();
  }

  expand(): void {
    this.scale = Math.min(this.maxScale, +(this.scale + this.step).toFixed(2));
    this.applyScale();
  }

  private applyScale(): void {
    if (this.mapWrapper && this.mapWrapper.nativeElement) {
      const el = this.mapWrapper.nativeElement;
      el.style.transform = `scale(${this.scale})`;
      el.style.transformOrigin = 'top left';
    }
  }
}
