import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    console.log('User is not authenticated. Redirecting to login.');
    router.navigate(['/login']);
    return false;
  }

  if (!authService.isAdmin()) {
    console.log('Access denied. Admins only.');
    router.navigate(['/unauthorized']); // Redirect to unauthorized page
    return false;
  }

  return true; // Allow access if authenticated and admin
};
