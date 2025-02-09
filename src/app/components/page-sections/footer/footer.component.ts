import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { NewsletterService } from '../../../services/newsletter.service';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  GfRLogo = environment.GFR_LOGO;


  email: string = '';

  constructor(private newsletterService: NewsletterService) {}

  onSubscribe(): void {
    if (this.email) {
      this.newsletterService.subscribeUser(this.email).subscribe({
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

}
