import { environment } from '../../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  GfRLogo = environment.GFR_LOGO;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu state:', this.isMenuOpen ? 'Opened' : 'Closed');
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
