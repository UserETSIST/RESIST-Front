import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LeafletService } from '../../services/leaflet.service';



@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  
  constructor(private leafletService: LeafletService) {}

  ngOnInit(): void {
    this.leafletService.loadLeaflet((leaflet: any) => {
      // Your custom code here
      console.log('Leaflet loaded', leaflet);
    });
  }


}




