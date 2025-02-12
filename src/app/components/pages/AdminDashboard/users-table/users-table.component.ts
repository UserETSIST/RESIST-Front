import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{


  ngOnInit(): void {
    
  //   if (document.getElementById("pagination-table") && typeof simpleDatatables.DataTable !== 'undefined') {
  //     const dataTable = new simpleDatatables.DataTable("#pagination-table", {
  //         paging: true,
  //         perPage: 5,
  //         perPageSelect: [5, 10, 15, 20, 25],
  //         sortable: false
  //     });
  //   }
    
  }



}
