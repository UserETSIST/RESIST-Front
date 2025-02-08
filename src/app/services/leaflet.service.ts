import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadLeaflet(callback: (leaflet: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(leaflet => {
        callback(leaflet);
      });
    }
  }


}
