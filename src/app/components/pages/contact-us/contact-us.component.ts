import { Component } from '@angular/core';
import { HeaderComponent } from '../../page-sections/header/header.component';
import { FooterComponent } from '../../page-sections/footer/footer.component';

@Component({
  selector: 'app-contact-us',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
