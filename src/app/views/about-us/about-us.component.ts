import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/page-sections/header/header.component';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
