import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { FlowbiteService } from '../../../services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],

})
export class UsersTableComponent implements OnInit, AfterViewInit {

  private dataTable: DataTable | null = null;
  dataUsers: User[] = []; 
  error: string | null = null;

  constructor(
    private userService: UsersService,
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    


  }



  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.flowbiteService.loadFlowbite(() => {
        this.initializeDataTable();
        console.log('Flowbite loaded in ngOnInit.');
      });

      setTimeout(() => {
        initFlowbite();
        console.log('Flowbite components initialized.');
      }, 0);
    }
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.flowbiteService.loadFlowbite(() => {
        initFlowbite();
        this.initializeDataTable();
        console.log('Flowbite loaded in ngOnInit.');
      });

      setTimeout(() => {
        initFlowbite();
        console.log('Flowbite components initialized.');
      }, 0);

      this.loadUsers();
    }
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


  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.dataUsers = response.data; 
        console.log('Users loaded:', this.dataUsers);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'Failed to load users';
      }
    });
  }

}
