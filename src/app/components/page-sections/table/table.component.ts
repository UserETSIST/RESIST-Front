import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FlowbiteService } from '../../../services/flowbite.service';
import { EventsService } from '../../../services/events.service';
import { Event } from '../../../models/event.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css', '@angular/material/prebuilt-themes/indigo-pink.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  events: Event[] = [];
  displayedColumns: string[] = [
    'lat', 'lon', 'flightlevel', 'lastdetectiontimestamp',
    'jamming', 'spoofing', 'strength', 'pfa', 'datum', 'sat_ua'
  ];
  eventDataSource = new MatTableDataSource<Event>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private flowbiteService: FlowbiteService, private eventService: EventsService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite: any) => {
      console.log('Flowbite initialized');
      this.on7DaysClick();
    });
  }

  ngAfterViewInit(): void {
    this.eventDataSource.paginator = this.paginator;
  }

  on7DaysClick(): void {
    this.eventService.getRecentEvents(7).subscribe({
      next: (data) => {
        console.log('Events:', data);
        this.events = data.data;  
        this.eventDataSource.data = this.events;  
        console.log('DataSource updated:', this.eventDataSource.data);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }
}
