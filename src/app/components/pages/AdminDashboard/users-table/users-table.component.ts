import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { FlowbiteService } from '../../../../services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  private dataTable: DataTable | null = null;

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    // Initialize Flowbite once
    this.flowbiteService.loadFlowbite((flowbite) => {
      this.initializeDataTable();
      console.log('Flowbite loaded in ngOnInit.', flowbite);
    });
    initFlowbite();
  }

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      this.initializeDataTable();
      console.log('Flowbite loaded in ngOnInit.',flowbite);
    });
    initFlowbite();
     // Ensure the table is initialized when the view is ready
  }

 

  private initializeDataTable(): void {
    const tableElement = document.getElementById('pagination-table');
    if (tableElement) {
      if (!this.dataTable) { // Ensure DataTable isn't reinitialized multiple times
        this.dataTable = new DataTable("#pagination-table", {
          paging: true,
          perPage: 5,
          perPageSelect: [1, 5, 10, 15, 20, 25],
          sortable: false,
          searchable: true
        });
        console.log('DataTable initialized.');
      }
    } else {
      console.warn('Table element not found.');
    }
  }
}
