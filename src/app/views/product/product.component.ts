import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/page-sections/header/header.component';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';
import { MapComponent } from '../../components/Map/map/map.component';
import { FlowbiteService } from '../../services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent,FooterComponent,MapComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService,)
  {}



  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    })
  }

}
