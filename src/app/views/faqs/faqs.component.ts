import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/page-sections/header/header.component';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';

@Component({
  selector: 'app-faqs',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FAQsComponent {

}
