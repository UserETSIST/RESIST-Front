import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';

@Component({
  selector: 'app-faqs',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FAQsComponent {

}
