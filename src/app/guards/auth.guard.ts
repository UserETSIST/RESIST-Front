import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow navigation
  } else {
    console.log('Access denied. Redirecting...');
    router.navigate(['/403-forbidden']);
    return false; // Block navigation
  }
};
