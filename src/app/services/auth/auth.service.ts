import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { API_CONFIG } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../../environments/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sends login request to the API with email and password.
   * If successful, it saves the token and is_admin flag to localStorage.
   * @param email User email
   * @param password User password
   */
  login(email: string, password: string): Observable<void> {
    return this.http.post<{ access_token: string; token_type: string; is_admin: boolean }>(`${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`, { email, password })
      .pipe(
        catchError(this.handleError),
        this.handleLoginResponse()
      );
  }

  /**
   * Saves the token and is_admin flag to localStorage.
   * @param response API response containing token and is_admin
   */
  private handleLoginResponse(): (source: Observable<{ access_token: string; token_type: string; is_admin: boolean }>) => Observable<void> {
  return (source) =>
    new Observable<void>((observer) => {
      source.subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.access_token);  // Save access token
          localStorage.setItem('token_type', response.token_type);      // Save token type (optional, but useful)
          localStorage.setItem('is_admin', JSON.stringify(response.is_admin));  // Save is_admin as a boolean
          console.log('Login successful, token and admin status saved.');
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
}


  /**
   * Error handler for login requests.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Login failed:', error.message);
    return throwError(() => new Error('Login failed. Please check your email and password.'));
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const isAdmin = localStorage.getItem('is_admin');
    return isAdmin !== null ? JSON.parse(isAdmin) : false;  
  }

  logout(): void {
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
        },
      });
    } else {
      console.error('No token found for logout');
      this.router.navigate(['/login']);
    }
  }

  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token_type');
  }
}
