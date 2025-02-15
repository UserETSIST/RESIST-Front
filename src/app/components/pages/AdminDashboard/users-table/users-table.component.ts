import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { FlowbiteService } from '../../../../services/flowbite.service';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{

  constructor(
        private flowbiteService: FlowbiteService,
  ){};


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {

      if (document.getElementById("pagination-table") && typeof DataTable !== 'undefined') {
        const dataTable = new DataTable("#pagination-table", {
            paging: true,
            perPage: 5,
            perPageSelect: [5, 10, 15, 20, 25],
            sortable: false
        });
      }
      console.log('Flowbite loaded.');
    });
  
  }



}
