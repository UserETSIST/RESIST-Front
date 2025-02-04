import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';




@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  
  private leaflet: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  async ngOnInit(): Promise<void> {
    if(isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.leaflet = L;


      const map = this.leaflet.map('map').setView([51.505, -0.09], 13);
      this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{z}.png');
    }

  }

}




