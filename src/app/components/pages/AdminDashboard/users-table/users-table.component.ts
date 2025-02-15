import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { FlowbiteService } from '../../../../services/flowbite.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements AfterViewInit, OnDestroy {
  private dataTable: DataTable | null = null;

  constructor(private flowbiteService: FlowbiteService) {}

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      const tableElement = document.getElementById('pagination-table');
      if (tableElement) {
        this.initializeDataTable();
        console.log('DataTable initialized after Flowbite.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy(); // Clean up the DataTable instance
      this.dataTable = null;
      console.log('DataTable destroyed.');
    }
  }

  private initializeDataTable(): void {
    this.dataTable = new DataTable("#pagination-table", {
      paging: true,
      perPage: 5,
      perPageSelect: [5, 10, 15, 20, 25],
      sortable: false
    });
  }
}
