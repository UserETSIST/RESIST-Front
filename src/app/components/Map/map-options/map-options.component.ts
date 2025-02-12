import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-map-options',
  imports: [],
  templateUrl: './map-options.component.html',
  styleUrl: './map-options.component.css'
})
export class MapOptionsComponent {

  events: any[] = [];
  filteredEvents: any[] = [];
  jamming: boolean = false;
  spoofing: boolean = false;


  constructor (private eventsService: EventsService) {}


  on7DaysClick(): void {
    this.eventsService.getRecentEvents(7).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.events = response.data; 
        this.filterEvents();
      },
      error: (error) => {
        console.error('Error fetching recent events:', error);
      }
    });
  }

  on14DaysClick(): void {
    this.eventsService.getRecentEvents(14).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.events = response.data;  
        this.filterEvents();
      },
      error: (error) => {
        console.error('Error fetching recent events:', error);
      }
    });
  }

  on30DaysClick(): void {
    this.eventsService.getRecentEvents(30).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.events = response.data;  

        this.filterEvents();
      },
      error: (error) => {
        console.error('Error fetching recent events:', error);
      }
    });
  }

  onCheckboxChange(filter: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (filter === 'jamming') {
      this.jamming = isChecked;
    } else if (filter === 'spoofing') {
      this.spoofing = isChecked;
    }
    this.filterEvents();
    console.log(`Filter ${filter} is now: ${isChecked}`);
  }

  filterEvents(): void {
    if (this.jamming && this.spoofing) {
      // Return events where both jamming and spoofing are true
      this.filteredEvents = this.events;
    } else if (this.jamming) {
      // Return events where jamming is true
      this.filteredEvents = this.events.filter(event => event.jamming === 1);
    } else if (this.spoofing) {
      // Return events where spoofing is true
      this.filteredEvents = this.events.filter(event => event.spoofing === 1);
    } else {
      // Return all events if no filter is applied
      this.filteredEvents = [];
    }
  
    console.log('Filtered Events:', this.filteredEvents);
  }
  

}
