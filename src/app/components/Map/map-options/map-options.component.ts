import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EventsService } from '../../../services/events.service';
import { FlowbiteService } from '../../../services/flowbite.service';
import { DateRangePicker } from 'flowbite-datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerOptions, initFlowbite } from 'flowbite';
import { Datepicker } from 'flowbite-datepicker';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';


@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./map-options.component.css']
})
export class MapOptionsComponent implements AfterViewInit, OnInit{

  @Output() filteredEventsChange = new EventEmitter<any[]>(); // Event to emit data
  
  events: any[] = [];
  filteredEvents: any[] = [];
  jamming: boolean = true;
  spoofing: boolean = true;
  datepicker: DateRangePicker | undefined;
  startDate: String = "";
  endDate: String = "";

  

  constructor(
    private eventsService: EventsService,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: any,
    ) {
      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // 7 days ago

      this.endDate = this.formatDate(endDate);
      this.startDate = this.formatDate(startDate);
    }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // First, load Flowbite
      this.flowbiteService.loadFlowbite((flowbite) => {
        // Then load Flowbite DateRangePicker
        this.flowbiteService.loadFlowbiteDateRangePicker((flowbiteDateRangePicker) => {
          const datepickerEl = document.getElementById('date-range-picker');
          if (datepickerEl) {
            const options = {
              format: 'yyyy-mm-dd',
              rangePicker: true,
              autohide: true,
              clearButton: true,
              todayButton: true,
              orientation: 'bottom',
              onSelect: (selectedDates: any) => {
                // Now the internal state is updated.
                console.log('onSelect callback:', this.datepicker?.getDates());
                this.onInputTouched();
              }
            };
            // Instantiate the DateRangePicker from the flowbite-datepicker module
            this.datepicker = new flowbiteDateRangePicker.DateRangePicker(datepickerEl, options);
          }
        });

        const modalElement: HTMLElement = document.querySelector('#popup-modal')!;
        const modalOptions: ModalOptions = {
          placement: 'center-left',
          backdrop: 'dynamic',
          backdropClasses:
              'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
          closable: true,
      };

         const modal: ModalInterface = new Modal(modalElement, modalOptions);

      });
    }
    
    this.jamming = true;
    this.spoofing = true;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // First, load Flowbite
      this.flowbiteService.loadFlowbite((flowbite) => {
        // Then load Flowbite DateRangePicker
        this.flowbiteService.loadFlowbiteDateRangePicker((flowbiteDateRangePicker) => {
          const datepickerEl = document.getElementById('date-range-picker');
          if (datepickerEl) {
            const options = {
              format: 'yyyy-mm-dd',
              rangePicker: true,
              autohide: true,
              clearButton: true,
              todayButton: true,
              orientation: 'bottom',
              onSelect: (selectedDates: any) => {
                // Now the internal state is updated.
                console.log('onSelect callback:', this.datepicker?.getDates());
                this.onInputTouched();
              }
            };
            // Instantiate the DateRangePicker from the flowbite-datepicker module
            this.datepicker = new flowbiteDateRangePicker.DateRangePicker(datepickerEl, options);
          }
        });

        const modalElement: HTMLElement = document.querySelector('#popup-modal')!;
        const modalOptions: ModalOptions = {
          placement: 'center-left',
          backdrop: 'dynamic',
          backdropClasses:
              'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
          closable: true,
      };

         const modal: ModalInterface = new Modal(modalElement, modalOptions);

      });
    }
  }
  

  on7DaysClick(): void {
      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // 7 days ago

      this.endDate = this.formatDate(endDate);
      this.startDate = this.formatDate(startDate);

    // this.eventsService.getRecentEvents(7).subscribe({
    //   next: response => {
    //     // console.log('API Response:', response);
    //     this.events = response.data;
    //     this.filterEvents();
    //   },
    //   error: error => console.error('Error fetching recent events:', error)
    // });
  }

  on14DaysClick(): void {

    const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 14); // 7 days ago

      this.endDate = this.formatDate(endDate);
      this.startDate = this.formatDate(startDate);
    // this.eventsService.getRecentEvents(14).subscribe({
    //   next: response => {
    //     // console.log('API Response:', response);
    //     this.events = response.data;
    //     this.filterEvents();
    //   },
    //   error: error => console.error('Error fetching recent events:', error)
    // });
  }

  on30DaysClick(): void {

      const endDate = new Date(); // Today
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 7 days ago

      this.endDate = this.formatDate(endDate);
      this.startDate = this.formatDate(startDate);
    // this.eventsService.getRecentEvents(30).subscribe({
    //   next: response => {
    //     // console.log('API Response:', response);
    //     this.events = response.data;
    //     this.filterEvents();
    //   },
    //   error: error => console.error('Error fetching recent events:', error)
    // });
  }

  onCheckboxChange(filter: string, event: Event): void {
    console.log("Datepicker Dates:", this.datepicker?.getDates())
    const isChecked = (event.target as HTMLInputElement).checked;
    if (filter === 'jamming') {
      this.jamming = isChecked;
    } else if (filter === 'spoofing') {
      this.spoofing = isChecked;
    }
    this.filterEvents();
    // console.log(`Filter ${filter} is now: ${isChecked}`);
  }


  onInputChange(event: Event): void {
    // Cast event.target to HTMLInputElement to access the value property
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', inputValue);
  }

  

   onInputTouched(): void {
     this.startDate = this.formatDate(new Date(this.datepicker!.getDates()[0]!));
     this.endDate = this.formatDate(new Date(this.datepicker!.getDates()[1]!));


    // const startDate = this.formatDate(new Date(this.datepicker!.getDates()[0]!));
    // const endDate = this.formatDate(new Date(this.datepicker!.getDates()[1]!));
    console.log("LO TOCOOOO");
    console.log(this.datepicker?.getDates());

    // this.eventsService.getEventsOnRange(this.startDate, this.endDate, this.jamming, this.spoofing).subscribe({
    //   next: response => {
    //     this.events = response.data;
    //     this.filterEvents();
    //   },
    //   error: error => console.error('Error fetching recent events:', error)
    // });
    // console.log("Fechas Seleccionadas:", this.datepicker?.getDates())
    // console.log("Start Date: ", this.formatDate(new Date(this.datepicker!.getDates()[0]!)), "End Date: ", this.formatDate(new Date(this.datepicker!.getDates()[1]!)))

  }

  filterEvents(): void {
    console.log(`VALORES CHECKBOXES --> SPOOFING: ${this.spoofing}  JAMMING: ${this.jamming}`)
    if (this.jamming && this.spoofing) {
      this.filteredEvents = this.events;
    } else if (this.jamming) {
      this.filteredEvents = this.events.filter(event => event.jamming === 1);
    } else if (this.spoofing) {
      this.filteredEvents = this.events.filter(event => event.spoofing === 1);
    } else {
      this.filteredEvents = [];
    }
    // console.log('Filtered Events:', this.filteredEvents);
    this.filteredEventsChange.emit(this.filteredEvents);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    // Months are 0-based, so add 1 and pad with a leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onFilterConfirmed(): void {
    this.eventsService.getEventsOnRange(this.startDate, this.endDate, this.jamming, this.spoofing).subscribe({
        next: response => {
          this.events = response.data;
          this.filterEvents();
        },
        error: error => console.error('Error fetching recent events:', error)
      });

  }
}
