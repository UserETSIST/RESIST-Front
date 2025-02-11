import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent,FooterComponent,MapComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
