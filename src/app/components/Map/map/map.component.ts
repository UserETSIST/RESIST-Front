import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LeafletService } from '../../../services/leaflet.service';
import { MapOptionsComponent } from '../map-options/map-options.component';
import proj4 from 'proj4';
import * as turf from '@turf/turf';
import { HexCell } from '../../../models/hexagon.model';
import { FlowbiteService } from '../../../services/flowbite.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MapOptionsComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private L: any;
  filteredEvents: any[] = [];


  // -------------------------------
  // CONFIGURACIÓN DEL GRID:
  // -------------------------------
  private EPSG4326 = '+proj=longlat +datum=WGS84 +no_defs';
  private EPSG3857 = '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +over';

  private minLat = -80; 
  private maxLat = 80;
  private minLng = -180;
  private maxLng = 180;

  // Ejemplo: cada hex de 250 km de diámetro => 250000 m
  private diameterMeters = 250_000;
  private r = this.diameterMeters / 2; // radio

  // Se calculan en ngOnInit, pero definimos aquí para poder usarlos
  private minX = 0;
  private minY = 0;
  private maxX = 0;
  private maxY = 0;

  // Spacings para "flat-top" (con +30°):
  private horizontalSpacing = Math.sqrt(3) * this.r; // ~1.732 * r
  private verticalSpacing = 1.5 * this.r;            // 1.5 * r

  // Guarda la referencia de los hexágonos dibujados en el mapa
  // Key: "row_col"
  private hexMap: Map<string, HexCell> = new Map();

  constructor(
    private leafletService: LeafletService,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}


 

  onFilteredEventsChange(events: any[]): void {
    this.filteredEvents = events;
    console.log('Filtered Events received in MapComponent:', this.filteredEvents);
    this.updateHexbinLayer();
  }


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.platformId)) {
      this.leafletService.loadLeaflet((leaflet: any) => {
        this.L = leaflet; // Assign Leaflet instance
        console.log('Leaflet loaded');

        this.map = this.L.map('map').setView([0, 0], 2);
        this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
    
        // Calcula bounding box en XY (EPSG:3857)
        [this.minX, this.minY] = proj4(this.EPSG4326, this.EPSG3857, [this.minLng, this.minLat]);
        [this.maxX, this.maxY] = proj4(this.EPSG4326, this.EPSG3857, [this.maxLng, this.maxLat]);
    
        // Pintamos la primera vez (si hay events)
        this.updateHexbinLayer();


      });
    }
  }

 

  private updateHexbinLayer(): void {
    // 1) Eliminar los hexágonos previos
    this.clearHexes();

    // 2) Mapa vacío
    this.hexMap = new Map();

    // 3) Recorrer events
    for (const event of this.filteredEvents) {
      // Ojo: asumiendo que event.geometry.coordinates = [lngHex, latHex] en formato '0x...' 
      // o que ya vengan en hex => ajusta si tu data es distinta.
      const [lngHex, latHex] = [event.lon_hex, event.lat_hex]
      const jamming = event.jamming;      // 1 => jam
      const spoofing = event.spoofing;    // 1 => spoofer
      const strength = event.strength;    // num => fuerza
      const lastDet = event.last_detection;

      const lat = this.parseHexToDecimal(latHex);
      const lng = this.parseHexToDecimal(lngHex);
      // Convertimos a XY
      const [x, y] = proj4(this.EPSG4326, this.EPSG3857, [lng, lat]);

      // Obtenemos row,col
      const { row, col } = this.getHexRowColForXY(x, y);

      console.log('lat:', lat, 'lng:', lng, 'jam:', jamming, 'spf:', 'strength:', strength, 'lastDet:', lastDet);

      // Fuera de rango (por ej. lat = 90 con proyección) => skip
      if (row < 0 || col < 0) {
        continue;
      }

      // key row_col
      const key = `${row}_${col}`;

      // 4) Insertar/Actualizar la info del hexágono
      const isJammer = (jamming === 1);
      const isSpoofer = (spoofing === 1);

      let hexCell = this.hexMap.get(key);
      if (!hexCell) {
        // Crear un nuevo HexCell
        hexCell = {
          row, col,
          events: [],
          color: isJammer ? '#f8e84e' : this.redScale(strength), // color inicial
          maxStrength: isSpoofer ? strength : 0,           // si es spoofer
          isSpoofer: isSpoofer,
        };
        this.hexMap.set(key, hexCell);
      }

      // Agregar este evento a la lista
      hexCell.events.push(event);

      // Determinar si hay que actualizar color
      if (isSpoofer) {
        // Spoofer vs Jammer => spoofer gana => color = rojo
        if (!hexCell.isSpoofer) {
          // Antes era Jam => pasamos a spoofer
          hexCell.isSpoofer = true;
          hexCell.maxStrength = strength;
          hexCell.color = this.redScale(strength);
        } else {
          // Ya era spoofer => elegir el de mayor fuerza
          if (strength > hexCell.maxStrength) {
            hexCell.maxStrength = strength;
            hexCell.color = this.redScale(strength);
          }
        }
      } else {
        // Es un jammer
        if (hexCell.isSpoofer) {
          // Spoofer vs Jam => spoofer prevalece => no cambiar color
        } else {
          // Sencillamente, ambos jam => color #f8e84e
          // (o podrías implementar lógicas de jam con distinta "fuerza")
          hexCell.color = '#f8e84e';
        }
      }
    }

    // 5) Dibujar cada hex que tenga al menos un evento
    for (const [key, cell] of this.hexMap) {
      // Construye el polígono del hex
      const polygonLatLon = this.buildHexPolygon(cell.row, cell.col);

      // Creamos la capa en Leaflet
      const leafletPolygon = this.L.polygon(polygonLatLon, {
        color: cell.color,
        fillColor: cell.color,
        fillOpacity: 0.7,
        weight: 1
      }).addTo(this.map);

      // Popup con todos los eventos
      const popupContent = this.buildPopupContent(cell.events);
      leafletPolygon.bindPopup(popupContent);

      // Guardamos la capa en cell
      cell.polygon = leafletPolygon;
    }
  }

  /**
   * Elimina del mapa todos los hexágonos dibujados anteriormente.
   */
  private clearHexes(): void {
    if (!this.hexMap) return;
    for (const [key, cell] of this.hexMap) {
      if (cell.polygon) {
        cell.polygon.remove(); // o this.map.removeLayer(cell.polygon)
      }
    }
  }

  /**
   * Construye el texto que se mostrará en el popup,
   * agrupando la información de todos los eventos en ese hexágono.
   */
  private buildPopupContent(events: any[]): string {
    // Ejemplo: listamos la fecha, si es jamming/spoofing, y la fuerza
    // Ajusta el formato a tu gusto
    let content = `<b>Detected Events</b><br/>`;
    for (const ev of events) {
      const jam = (ev.jamming === 1) ? 'Jammer' : '';
      const spf = (ev.spoofing === 1) ? 'Spoofer' : '';
      const str = ev.strength;
      const time = ev.last_detection;
      const label = jam || spf || '??';
      content += `Last detected: ${time} | Type: ${label} | strength=${str}<br/>`;
    }
    return content;
  }

  /**
   * Dado row,col, construimos la geometría "flat-top" (ángulos 30,90,...)
   * en coords XY, luego transformamos a lat-lon.
   */
  private buildHexPolygon(row: number, col: number): [number, number][] {
    const { cx, cy } = this.getHexCenterXY(row, col);
    try {

      const coordsXY: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angleDeg = 60 * i + 30; // "flat-top"
        const angleRad = (Math.PI / 180) * angleDeg;
        const x = cx + this.r * Math.cos(angleRad);
        const y = cy + this.r * Math.sin(angleRad);
        coordsXY.push([x, y]);
      }
      coordsXY.push(coordsXY[0]); // cerrar polígono

      // Pasamos a lat-lon
      const polygonLatLon: [number, number][] = coordsXY.map(([xx, yy]) => {
        const [lng, lat] = proj4(this.EPSG3857, this.EPSG4326, [xx, yy]);
        return [lat, lng];
      });
      return polygonLatLon;
  } catch (error) {
      console.error('Error en buildHexPolygon:', error);
      console.log('row:', row, 'col:', col);
      console.log('cx:', cx, 'cy:', cy);
      return [];
  }
    

  }

  /**
   * Calcula el centro X,Y de la celda (row,col).
   */
  private getHexCenterXY(row: number, col: number): { cx: number, cy: number } {
    const cy = this.minY + (row * this.verticalSpacing);
    let cx = this.minX + (col * this.horizontalSpacing);
    // offset si la fila es impar
    if (row % 2 !== 0) {
      cx += this.horizontalSpacing / 2;
    }
    return { cx, cy };
  }

  /**
   * Determina la fila y columna aproximada para (x,y)
   * en la proyección EPSG:3857.
   */
  private getHexRowColForXY(x: number, y: number): { row: number, col: number } {
    const dx = x - this.minX;
    const dy = y - this.minY;

    let row = Math.floor(dy / this.verticalSpacing);
    let offsetX = 0;
    if (row % 2 !== 0) {
      offsetX = this.horizontalSpacing / 2;
    }
    const col = Math.floor((dx - offsetX) / this.horizontalSpacing);

    return { row, col };
  }

  /**
   * Retorna true si (lat,lng) está dentro de polygonLatLon.
   * (Aquí ya no se usa en el flujo principal, pero lo dejamos por si se requiere.)
   */
  private pointInPolygon(lat: number, lng: number, polygonLatLon: [number, number][]): boolean {
    const point = turf.point([lng, lat]); 
    const coordsLngLat = polygonLatLon.map(([la, ln]) => [ln, la]);
    const poly = turf.polygon([coordsLngLat]);
    return turf.booleanPointInPolygon(point, poly);
  }

  /**
   * Parseo básico de hexa a decimal. Ajusta si usas escalas.
   */
  private parseHexToDecimal(hexStr: string, scale: number = 1e5): number {
    let sign = 1;
    if (hexStr.startsWith('-')) {
      sign = -1;
      hexStr = hexStr.slice(1);
    }
    if (hexStr.startsWith('0x') || hexStr.startsWith('0X')) {
      hexStr = hexStr.slice(2);
    }
  
    // parseamos a entero
    const val = parseInt(hexStr, 16);
    // ahora desescalamos
    const result = val / scale;
  
    return sign * result;
  }
  /**
   * Ajusta el color rojo según la intensidad (strength) en [1..5].
   * 1 => rojo muy claro
   * 5 => rojo intenso
   */
  private redScale(strength: number): string {
    // Aseguramos que strength esté entre 1 y 5
    if (strength < 1) strength = 1;
    if (strength > 5) strength = 5;
  
    // fracción en [0..1], donde 0 => strength=1, 1 => strength=5
    const fraction = (strength - 1) / (5 - 1); 
    // Por ejemplo, si strength=1 => fraction=0
    //              si strength=5 => fraction=1
  
    // Definimos un rango para G y B. 
    // Inicia en 230 (rojo claro => rgb(255,230,230)) 
    // y va a 0 (rojo puro => rgb(255,0,0)).
    const startGB = 230;
    const endGB = 0;
  
    // Interpolamos linealmente
    const gbValue = Math.round(startGB + (endGB - startGB) * fraction);
    // => si fraction=0 => gbValue= 230 => #ffe6e6
    //    si fraction=1 => gbValue=   0 => #ff0000
  
    return `rgb(255, ${gbValue}, ${gbValue})`;
  }
}






  

