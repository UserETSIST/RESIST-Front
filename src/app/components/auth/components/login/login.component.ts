import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../page-sections/header/header.component';
import { FooterComponent } from '../../../page-sections/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  GFRLogo = environment.GFR_LOGO;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login successful. Redirecting to the home page...');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err.message);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}
