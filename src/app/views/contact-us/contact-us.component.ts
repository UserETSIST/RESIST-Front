import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/page-sections/header/header.component';
import { FooterComponent } from '../../components/page-sections/footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtilitiesService } from '../../services/forms-utilities.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  contactForm: FormGroup;

  constructor(
    private formValidator: FormsUtilitiesService
  ) {


    this.contactForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        phone: new FormControl('', [
          Validators.pattern(/^\+?[1-9]\d{1,14}$/),
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
        message: new FormControl('', [
          Validators.required,
          Validators.maxLength(1000), 
          this.formValidator.noMaliciousContent.bind(this.formValidator)
        ]),
      }
    );
  }


  sendContactForm(): void {

    if (this.contactForm.invalid) {
      console.warn('⚠ Form is invalid');
      return;
    }

    const contactFormValues = this.contactForm.value;
    console.log("Form values: ", contactFormValues);
    
    this.formValidator.sendContactForm(contactFormValues).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          text: "Our team will reach out to you as soon as possible.",
          timer: 3000,
          showConfirmButton: false
        });
        this.contactForm.reset();
    
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An unexpected error occurred!',
              timer: 2500,
              showConfirmButton: false
            });
          }
        });




  }

}
