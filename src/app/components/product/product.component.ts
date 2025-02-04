import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TableComponent } from '../table/table.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent,FooterComponent,TableComponent,MapComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
