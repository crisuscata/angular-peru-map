import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-peru-map-svg',
  imports: [],
  templateUrl: './peru-map-svg.html',
  styleUrls: ['./peru-map-svg.scss']
})
export class PeruMapSvg implements AfterViewInit {


@ViewChild('mapWrapper', { static: true }) mapWrapper!: ElementRef<HTMLDivElement>;

  private scale = 1;
  private readonly step = 0.1;
  private readonly minScale = 0.5;
  private readonly maxScale = 2;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // ensure NodeList supports iteration in all envs
    const paths = Array.from(this.el.nativeElement.querySelectorAll('path')) as SVGPathElement[];

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

    paths.forEach((path: SVGPathElement) => {
      const depto = path.getAttribute('title') || '';
      const bbox = path.getBBox();

      // native SVG title (fallback)
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `Departamento: ${depto}`;
      path.appendChild(title);

      // show tooltip (HTML) and highlight
      const onMouseOver = (e: MouseEvent) => {
        // highlight
        (path as any).style.fill = '#ffffff';
        // show HTML tooltip with depto
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
        (path as any).style.fill = ''; // reset to stylesheet color
        tooltip.style.display = 'none';
      };

      path.addEventListener('mouseover', onMouseOver);
      path.addEventListener('mousemove', onMouseMove);
      path.addEventListener('mouseout', onMouseOut);

      // optional: add centered label text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (bbox.x + bbox.width / 2).toString());
      text.setAttribute('y', (bbox.y + bbox.height / 2).toString());
      // don't append text by default (uncomment if needed)
      // path.parentNode?.appendChild(text);
    });

    // apply initial scale to wrapper
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