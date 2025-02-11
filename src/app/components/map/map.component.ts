import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LeafletService } from '../../services/leaflet.service';
import { MapOptionsComponent } from '../map-options/map-options.component';
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

  constructor(
    private leafletService: LeafletService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.leafletService.loadLeaflet((leaflet: any) => {
        this.L = leaflet; // Assign Leaflet instance
        console.log('Leaflet loaded');

        // Initialize the map
        this.map = this.L.map('map').setView([0, 0], 2);

        this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
      });
    }
  }
}
