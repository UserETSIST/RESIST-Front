import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { NewsletterService } from '../../../services/newsletter.service';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  GfRLogo = environment.GFR_LOGO;

  subscribeToNewsLetterForm = new FormGroup ({
    email: new FormControl('', [Validators.required,Validators.email, this.forbiddenCodeValidator])
  })



  constructor(private newsletterService: NewsletterService) {}

  onSubscribe(): void {
    if (this.subscribeToNewsLetterForm.valid) {
      this.newsletterService.subscribeUser(this.subscribeToNewsLetterForm.value.email!).subscribe({
        next: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            text: "You will be among the first to receive our GNSS Spoofing and Jamming insights!",
            showConfirmButton: false,
            timer: 2500
          });
        },
        error: (response) => {
          Swal.fire({
            position: "top-end",
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


  forbiddenCodeValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,  // Detecta etiquetas <script>
      /\b(SELECT|INSERT|UPDATE|DELETE|DROP|--)\b/gi,          // Detecta palabras clave SQL
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/gi,                      // Detecta caracteres de inyección SQL (' -- #)
    ];
  
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(control.value)) {
        return { forbiddenCode: true };
      }
    }
  
    return null;  
  }

}
