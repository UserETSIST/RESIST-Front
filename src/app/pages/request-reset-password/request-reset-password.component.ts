import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormsUtilitiesService } from '../../services/forms-utilities.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-request-reset-password',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent {
  emailForm: FormGroup = new FormGroup({});


  constructor(private formValidator: FormsUtilitiesService, private authService: AuthService, private router: Router) {
    this.emailForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email, this.formValidator.noMaliciousContent.bind(this.formValidator)]),
        });
  }

  sendEmail(): void {

    if (this.emailForm!.invalid) {
      return;
    }

    this.authService.forgotPassword(this.emailForm.value.email).subscribe({
      next:  (response) => {
        if (response.success){
          Swal.fire({
            icon: "success",
            title: response.message,
            text: "A password reset link has been sent to your email address.",
            showConfirmButton: false,
            timer: 3000
          });
          sessionStorage.setItem('email',response.email!);
          sessionStorage.setItem('reset_password_token', response.reset_password_token!)
          this.router.navigate(['/reset-password']);

        } else {
          Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "An unexpected error has occured!",
            showConfirmButton: false,
            timer: 2500
          });
        }
        
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "An unexpected error has occured!",
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }
}



