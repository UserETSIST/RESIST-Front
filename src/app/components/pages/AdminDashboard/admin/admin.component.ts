import { Component } from '@angular/core';
import { HeaderComponent } from '../../../page-sections/header/header.component';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, UsersTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
