import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  private flowbiteInstance: any = null;  // Cache the loaded instance

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      // Check if Flowbite has already been loaded
      if (this.flowbiteInstance) {
        console.log('Flowbite already loaded. Using cached instance.');
        callback(this.flowbiteInstance); // Use the cached instance
      } else {
        import('flowbite').then(flowbite => {
          this.flowbiteInstance = flowbite;  // Cache the instance for future use
          callback(flowbite);
        }).catch(error => {
          console.error('Failed to load Flowbite:', error);
        });

      }
    }
  }
}
