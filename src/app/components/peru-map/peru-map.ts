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

    // Crear el mapa centrado en Perú 🇵🇪
    this.map = L.map('map', {
      center: [-9.19, -75.0152],
      zoom: 6,
    });

    // Capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // 📍 Marcadores
    const lima = L.marker([-12.0464, -77.0428])
      .addTo(this.map)
      .bindPopup('<b>📍 Lima</b><br>Capital del Perú')
      .openPopup();

    const ica = L.marker([-14.0678, -75.7286])
      .addTo(this.map)
      .bindPopup('<b>🍇 Ica</b><br>Tierra del vino y el sol');

    const huancayo = L.circleMarker([-12.0667, -75.2047], {
      radius: 8,
      color: '#ff1ef4ff',
      weight: 2,
      fillColor: '#ff1ef4ff',
      fillOpacity: 0.9,
    })
      .addTo(this.map)
      .bindPopup('<b>📍 Huancayo</b><br>Ciudad de Huancayo');

    // Evento global de click
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      alert(`Has hecho click en: ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
    });
  }
}
