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

  private async initMap(): Promise<void> {
    const L = this.L;

    // Crear mapa vacío (sin capa base global)
    this.map = L.map('map', {
      center: [-9.19, -75.0152],
      zoom: 5.2,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 8,
    });

    // Color base único para el mapa
    const baseStyle = {
      color: '#ffffff',      // borde
      weight: 1,
      fillColor: '#007bff',  // azul uniforme
      fillOpacity: 0.7,
    };

    // Efecto hover (resalta el departamento)
    const highlightStyle = {
      weight: 2,
      color: '#000',
      fillColor: '#0056b3',
      fillOpacity: 0.9,
    };

    // Cargar el archivo GeoJSON de Perú
    //const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/PER.geo.json');
    const response = await fetch('/peru-departamentos.json');
    //const response = await fetch('');
    const geojson = await response.json();

    const geoLayer = L.geoJSON(geojson, {
      style: baseStyle,
      onEachFeature: (feature: any, layer: any) => {
        // Tooltip con el nombre del departamento
        layer.bindTooltip(feature.properties.NOMBDEP || 'Sin nombre', {
          permanent: false,
          direction: 'center',
          className: 'map-tooltip'
        });

        layer.on({
          mouseover: (e: any) => {
            e.target.setStyle(highlightStyle);
          },
          mouseout: (e: any) => {
            geoLayer.resetStyle(e.target);
          },
          click: (e: any) => {
            alert(`🗺️ Departamento: ${feature.properties.NOMBDEP}`);
          }
        });
      }
    }).addTo(this.map);

    // Ajustar el mapa al contorno del Perú
    this.map.fitBounds(geoLayer.getBounds());

    // 📍 Agregar algunos puntos de referencia
    L.marker([-12.0464, -77.0428])
      .addTo(this.map)
      .bindPopup('<b>📍 Lima</b><br>Capital del Perú');

    L.marker([-14.0678, -75.7286])
      .addTo(this.map)
      .bindPopup('<b>🍇 Ica</b><br>Tierra del vino y el sol');
  }
}