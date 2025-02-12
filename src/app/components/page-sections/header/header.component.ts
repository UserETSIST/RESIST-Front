import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

  constructor() {}


  GfRLogo = environment.GFR_LOGO;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu state:', this.isMenuOpen ? 'Opened' : 'Closed');
  }

}
