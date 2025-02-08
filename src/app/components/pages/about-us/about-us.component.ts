import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
