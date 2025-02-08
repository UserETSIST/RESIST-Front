import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../page-sections/header/header.component';
import { FooterComponent } from '../../../page-sections/footer/footer.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  GFRLogo = environment.GFR_LOGO;

}
