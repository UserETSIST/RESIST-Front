import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService) {}

  GfRLogo = environment.GFR_LOGO;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite: any) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

}
