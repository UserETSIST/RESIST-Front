import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../components/page-sections/header/header.component';
import { FlowbiteService } from '../../../services/flowbite.service';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { DataTableComponent } from '../../../components/data-table/data-table.component';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, DataTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {


}
