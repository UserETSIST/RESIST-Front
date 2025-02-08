import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../page-sections/header/header.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  GFRLogo = environment.GFR_LOGO;

}
