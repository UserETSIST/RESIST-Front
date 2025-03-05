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
export class AdminComponent implements OnInit, AfterViewInit {


 constructor(
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}



  ngAfterViewInit(): void {
 if (isPlatformBrowser(this.platformId)) {
      this.flowbiteService.loadFlowbite(() => {
        console.log('Flowbite loaded in ngOnInit.');
      });
      
      setTimeout(() => {
        initFlowbite();
        console.log('Flowbite components initialized.');
      }, 0);
    }  }

  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.flowbiteService.loadFlowbite(() => {
        console.log('Flowbite loaded in ngOnInit.');
      });
      
      setTimeout(() => {
        initFlowbite();
        console.log('Flowbite components initialized.');
      }, 0);
    }
  }


}
