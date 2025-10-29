import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vector-peru',
  imports: [],
  templateUrl: './vector-peru.html',
  styleUrls: ['./vector-peru.scss']
})
export class VectorPeru implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Seleccionamos todos los departamentos (paths)
    const svg = this.el.nativeElement.querySelector('#peru-map');
    if (!svg) {
      console.error('No se encontró el SVG con id peru-map');
      return;
    }

    const paths = svg.querySelectorAll('path');

    paths.forEach((path: SVGPathElement) => {
      // Estilo base
      this.renderer.setStyle(path, 'fill', '#7b6ef6');
      this.renderer.setStyle(path, 'stroke', '#fff');
      this.renderer.setStyle(path, 'strokeWidth', '1');
      this.renderer.setStyle(path, 'transition', 'all 0.2s ease-in-out');
      this.renderer.setStyle(path, 'cursor', 'pointer');

      // Evento hover
      this.renderer.listen(path, 'mouseenter', () => {
        this.renderer.setStyle(path, 'fill', '#a998ff');
        this.renderer.setStyle(path, 'transform', 'scale(1.02)');
      });

      // Evento mouseout
      this.renderer.listen(path, 'mouseleave', () => {
        this.renderer.setStyle(path, 'fill', '#7b6ef6');
        this.renderer.removeStyle(path, 'transform');
      });

      // Evento click
      this.renderer.listen(path, 'click', () => {
        const depName = path.id || 'Departamento desconocido';
        alert(`Has hecho clic en ${depName}`);
      });
    });
  }
}