import { Component, OnInit } from '@angular/core';
import { Datepicker } from 'flowbite-datepicker';
import type { DatepickerOptions, DatepickerInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { DateRangePicker } from 'flowbite-datepicker';
import { FlowbiteService } from '../../../services/flowbite.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-table',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})


export class TableComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite: any) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }



  

  

  
 




}
