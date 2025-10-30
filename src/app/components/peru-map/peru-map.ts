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

    // Crear mapa base centrado en Perú
    this.map = L.map('map', {
      center: [-9.19, -75.0152],
      zoom: 6,
      zoomControl: true,
    });

    // Capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // 📍 Definir íconos personalizados
    const redIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });

    const blueIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });

    const greenIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });

    const purpleIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });

    // 📍 Agregar pines en Lima
    const limaCoords = [-12.0464, -77.0428];

    L.marker(limaCoords, { icon: redIcon })
      .addTo(this.map)
      .bindPopup('<b>Lima Centro</b>');

    L.marker([-12.03, -77.05], { icon: blueIcon })
      .addTo(this.map)
      .bindPopup('<b>Miraflores</b>');

    L.marker([-12.06, -77.08], { icon: greenIcon })
      .addTo(this.map)
      .bindPopup('<b>San Isidro</b>');

    L.marker([-12.05, -77.03], { icon: purpleIcon })
      .addTo(this.map)
      .bindPopup('<b>Barranco</b>');
  }
}
