import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { API_CONFIG, TOKEN } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../../environments/api-endpoints';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_CONFIG.baseUrl;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Sends login request to the API with email and password.
   * If successful, it saves the token and is_admin flag to localStorage.
   * @param email User email
   * @param password User password
   */
  login(email: string, password: string): Observable<void> {
    return this.http
      .post<{ access_token: string; token_type: string; is_admin: boolean }>(
        `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
        { email, password }
      )
      .pipe(
        // When login is successful, set the token expiration and start the logout timer
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            const expirationDuration = TOKEN.EXPIRATION_TIME_ms;
            const expirationDate = new Date(Date.now() + expirationDuration);
            localStorage.setItem('token_expiration', expirationDate.toString());
            this.startLogoutTimer(expirationDuration);
          }
        }),
        catchError(this.loginHandleError),
        this.handleLoginResponse()
      );
  }
  

  /**
   * Saves the token and is_admin flag to localStorage if running in the browser.
   * @param response API response containing token and is_admin
   */
  private handleLoginResponse(): (source: Observable<{ access_token: string; token_type: string; is_admin: boolean }>) => Observable<void> {
    return (source) =>
      new Observable<void>((observer) => {
        source.subscribe({
          next: (response) => {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('token_type', response.token_type);
              localStorage.setItem('is_admin', JSON.stringify(response.is_admin));
            }
            console.log('Login successful, token and admin status saved.');
            observer.next();
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
      });
  }



  forgotPassword(email: string): Observable<{ success: Boolean; message: string; reset_password_token?: string; email?: string }> {
    const url = `${this.apiUrl}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`;

    return this.http.post<{  success: Boolean; message: string; reset_password_token?: string; email?: string }>(url, { email }).pipe(
      catchError(this.forgotPasswordHandleError)
    );
  }

  resetPassword(password: string, password_confirmation: string): Observable<{ success: boolean; message: string }> {
    const url = `${this.apiUrl}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`;
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('reset_password_token');

    const payload = {
        email,
        password,
        token,
        password_confirmation
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    return this.http.post<{ success: boolean; message: string }>(url, payload, { headers }).pipe(
        catchError((error: any) => {
            console.error('Error resetting password:', error);
            return throwError(() => new Error(error));
        })
    );
}



  /**
   * Error handler for login requests.
   */
  private loginHandleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error('Login failed. Please check your email and password.'));
  }

  /**
   * Error handler for forgot password requests.
   */

  private forgotPasswordHandleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error('Failed to send password reset email. Please try again.'));
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }
  

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isAdmin = localStorage.getItem('is_admin');
      return isAdmin !== null ? JSON.parse(isAdmin) : false;
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      const token_type = localStorage.getItem('token_type');
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `${token_type} ${token}`
        });

        this.http.post(`${this.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}`, {}, { headers }).subscribe({
          next: () => {
            console.log('Logout successful');
            this.clearSession();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Logout failed:', err);
            this.clearSession();
            this.router.navigate(['/login']);
          }
        });
      } else {
        console.error('No token found for logout');
        this.router.navigate(['/login']);
      }

      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.clearSession();
    }
  }

  private clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('is_admin');
      localStorage.removeItem('token_type');
    }
  }

  startLogoutTimer(duration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }



}
