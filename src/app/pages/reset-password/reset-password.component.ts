import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormsUtilitiesService } from '../../services/forms-utilities.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  
  constructor(
    private formValidator: FormsUtilitiesService, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required, 
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        password_confirmation: new FormControl('', [
          Validators.required, 
          Validators.minLength(8),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ])
      },
      { validators: this.passwordsMatchValidator } 
    );
  }



  /**
   * Custom validator to check if password and password_confirmation fields match
   */
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('password_confirmation')?.value;

    if (password !== passwordConfirmation) {
      return { passwordsMismatch: true }; // Validation error
    }
    return null; // Valid form
  }

  /**
   * Submit new password if the form is valid
   */
  sendNewPassword(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.authService.resetPassword(this.resetPasswordForm.value.password, this.resetPasswordForm.value.password_confirmation).subscribe({
         next:  (response) => {
           if (response.success){
             Swal.fire({
               icon: "success",
               title: response.message,
               showConfirmButton: false,
               timer: 3000
             });
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('reset_password_token');

             this.router.navigate(['/login']);
   
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
