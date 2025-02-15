import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: Awaited<typeof import('flowbite')>) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite')
        .then((flowbiteModule) => {
          console.log("flowbite imported", flowbiteModule);
          // Call the initialization from the module if available
          if (typeof flowbiteModule.initFlowbite === 'function') {
            flowbiteModule.initFlowbite();
          }
          callback(flowbiteModule);
        })
        .catch((error) => {
          console.error('Failed to load Flowbite:', error);
        });
    }
  }
  


  loadFlowbiteDateRangePicker(callback: (flowbite: Awaited<typeof import('flowbite-datepicker')>)=> void) {
    if (isPlatformBrowser(this.platformId)) {
        import('flowbite-datepicker').then(flowbiteDateRangePicker => {
          console.log("imported date-range-picker", flowbiteDateRangePicker)
          callback(flowbiteDateRangePicker);
        })
    }
  }
}
