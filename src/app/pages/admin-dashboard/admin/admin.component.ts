import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../components/page-sections/header/header.component';
import { UsersTableComponent } from '../users-table/users-table.component';
import { FlowbiteService } from '../../../services/flowbite.service';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, UsersTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {


}
