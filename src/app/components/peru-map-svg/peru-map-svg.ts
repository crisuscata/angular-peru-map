import { Component, AfterViewInit, Renderer2, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-peru-map-svg',
  imports: [],
  templateUrl: './peru-map-svg.html',
  styleUrls: ['./peru-map-svg.scss']
})
export class PeruMapSvg implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {

    //const paths = this.el.nativeElement.querySelectorAll('path');
    const paths = this.el.nativeElement.querySelectorAll('path') as NodeListOf<SVGPathElement>;


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
        path.style.fill = '#ffffff';
        tooltip.textContent = depto;
        tooltip.style.display = 'block';
        // initial position
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
      };

      const onMouseMove = (e: MouseEvent) => {
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
      };

      const onMouseOut = () => {
        path.style.fill = ''; // reset to stylesheet color
        tooltip.style.display = 'none';
      };

      path.addEventListener('mouseover', onMouseOver);
      path.addEventListener('mousemove', onMouseMove);
      path.addEventListener('mouseout', onMouseOut);

      // optional: add centered label text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (bbox.x + bbox.width / 2).toString());
      text.setAttribute('y', (bbox.y + bbox.height / 2).toString());
      //text.textContent = depto;
      path.parentNode?.appendChild(text);


    });

  }
}