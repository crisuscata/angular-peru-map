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


    paths.forEach((path: SVGPathElement) => {
      const depto = path.getAttribute('title') || '';
      const bbox = path.getBBox();

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (bbox.x + bbox.width / 2).toString());
      text.setAttribute('y', (bbox.y + bbox.height / 2).toString());
      text.textContent = depto;
      path.parentNode?.appendChild(text);
    });

  }
}