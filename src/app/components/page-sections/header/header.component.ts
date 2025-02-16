import { environment } from '../../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  timeRemaining: string = ''; // Holds the formatted countdown (mm:ss)
  private timerSubscription: Subscription | undefined;

  GfRLogo = environment.GFR_LOGO;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.startTimer();
    }
  }

  /**
   * Starts an interval timer that updates the remaining time until token expiration.
   */
  startTimer(): void {
    const expiration = localStorage.getItem('token_expiration');
    if (expiration) {
      const expirationDate = new Date(expiration);
      this.timerSubscription = interval(1000).subscribe(() => {
        const now = new Date();
        const diff = expirationDate.getTime() - now.getTime();

        if (diff <= 0) {
          this.timeRemaining = '00:00';
          // Optionally, you might auto-logout here if the token expires.
        } else {
          const minutes = Math.floor(diff / 1000 / 60);
          const seconds = Math.floor((diff / 1000) % 60);
          this.timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu state:', this.isMenuOpen ? 'Opened' : 'Closed');
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
