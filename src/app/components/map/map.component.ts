import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  
  private map: any;
  private center: L.LatLngExpression = [42.3, -71.05];


constructor(@Inject(PLATFORM_ID) private platformId: object) {}


async ngOnInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const L = await import('leaflet');

    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

    

    

  }
  
}



}
