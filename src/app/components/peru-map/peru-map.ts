import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-peru-map',
  templateUrl: './peru-map.html',
  styleUrls: ['./peru-map.scss'],
})
export class PeruMapComponent implements AfterViewInit {
  private map: any;
  private L: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.L = L;
      this.initMap();
    }
  }

  private initMap(): void {
    const L = this.L;

    // Crear mapa base centrado en Perú (Lima)
    this.map = L.map('map', {
      center: [-12.0464, -77.0428], // Coordenadas de Lima
      zoom: 12,
      zoomControl: true,
    });

    // Capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // 📍 Datos de pines personalizados con coordenadas exactas
    const markers = [
      { coords: [-12.0464, -77.0428], color: 'red', number: 2034588 }, // Lima Centro
      { coords: [-12.03, -77.05], color: 'yellow', number: 2033741 },   // Miraflores
      { coords: [-12.06, -77.08], color: 'green', number: 2036426 },    // San Isidro
      { coords: [-12.05, -77.03], color: 'red', number: 2053749 },      // Barranco
    ];

    // 📍 Crear y agregar pines con íconos y números personalizados
    markers.forEach((m) => {
      const html = `
        <div class="custom-pin ${m.color}">
          <img src="https://maps.google.com/mapfiles/ms/icons/${m.color}-dot.png" class="pin-icon" />
          <div class="pin-label">${m.number}</div>
        </div>
      `;

      const icon = L.divIcon({
        className: '', // Limpiar la clase por defecto
        html: html,
        iconSize: [32, 40], // Ajustar el tamaño general del ícono y número
        iconAnchor: [16, 32], // Centrar el ícono en el marcador
        popupAnchor: [0, -40], // Ajustar el popup para mostrar el número correctamente
      });

      // Crear el marcador con el ícono y el número
      L.marker(m.coords, { icon }).addTo(this.map);
    });
  }
}
