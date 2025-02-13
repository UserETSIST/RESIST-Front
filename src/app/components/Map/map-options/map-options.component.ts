import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EventsService } from '../../../services/events.service';
import { FlowbiteService } from '../../../services/flowbite.service';
import { DateRangePicker } from 'flowbite-datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerOptions } from 'flowbite';


@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./map-options.component.css']
})
export class MapOptionsComponent implements OnInit, AfterViewInit {

  @Output() filteredEventsChange = new EventEmitter<any[]>(); // Event to emit data
  
  events: any[] = [];
  filteredEvents: any[] = [];
  jamming: boolean = true;
  spoofing: boolean = true;
  datepicker: DateRangePicker | undefined;

  

  constructor(
    private eventsService: EventsService,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object // Injects the platform (browser/server)
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      console.log('Flowbite loaded.');
    });
    this.jamming = true;
    this.spoofing = true;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dateRangePickerEl = document.getElementById('date-range-picker');
      if (dateRangePickerEl) {
        const options = {
          format: 'yyyy-mm-dd',
          rangePicker: true,
          autohide: false,
          orientation: 'bottom'
        };
        this.datepicker = new DateRangePicker(dateRangePickerEl, options);
        console.log('Date range picker initialized.');
      } else {
        console.error('Date picker element not found.');
      }
    } else {
      console.log('Skipping DateRangePicker initialization on the server side.');
    }
  }

  on7DaysClick(): void {
    this.eventsService.getRecentEvents(7).subscribe({
      next: response => {
        console.log('API Response:', response);
        this.events = response.data;
        this.filterEvents();
      },
      error: error => console.error('Error fetching recent events:', error)
    });
  }

  on14DaysClick(): void {
    this.eventsService.getRecentEvents(14).subscribe({
      next: response => {
        console.log('API Response:', response);
        this.events = response.data;
        this.filterEvents();
      },
      error: error => console.error('Error fetching recent events:', error)
    });
  }

  on30DaysClick(): void {
    this.eventsService.getRecentEvents(30).subscribe({
      next: response => {
        console.log('API Response:', response);
        this.events = response.data;
        this.filterEvents();
      },
      error: error => console.error('Error fetching recent events:', error)
    });
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
    console.log(`Filter ${filter} is now: ${isChecked}`);
  }

  onDateChange(): void {
    console.log(`Selected Date Range: ${this.datepicker?.getDates()}`);
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
    console.log('Filtered Events:', this.filteredEvents);
    this.filteredEventsChange.emit(this.filteredEvents);
  }
}
