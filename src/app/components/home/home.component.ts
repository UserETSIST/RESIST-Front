import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TableComponent } from '../table/table.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, TableComponent, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
