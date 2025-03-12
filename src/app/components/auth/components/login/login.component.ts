import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../page-sections/header/header.component';
import { FooterComponent } from '../../../page-sections/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtilitiesService } from '../../../../services/forms-utilities.service';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  GFRLogo = environment.GFR_LOGO;
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({});


  constructor(private authService: AuthService, private router: Router, private formValidator: FormsUtilitiesService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, this.formValidator.noMaliciousContent.bind(this.formValidator)]),
      password: new FormControl('', [Validators.required, this.formValidator.noMaliciousContent.bind(this.formValidator)])
    });
  }


  onLogin(): void {

    if (this.loginForm!.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
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
