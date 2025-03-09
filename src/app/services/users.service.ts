import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { API_CONFIG } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../environments/api-endpoints';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }


  getAllUsers(): Observable<any> {
    const isBrowser = isPlatformBrowser(this.platformId);
    console.log(`🌍 Checking platform: ${isBrowser ? 'Browser' : 'Server'}`);

    if (isBrowser) {
      console.log("✅ Running in browser, making API call...");

      const tokenType = sessionStorage.getItem('token_type');
      const accessToken = sessionStorage.getItem('access_token');


      if (tokenType && accessToken) {
        console.log("TOKENS AVAILABLE")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${tokenType} ${accessToken}`
        });
        return this.http.get(`${this.baseUrl}${API_ENDPOINTS.USERS.GET_ALL}`, { headers })

      } else {
        console.warn('⚠ No token found in sessionStorage.');
        return of([]);
      }
    } else {
      console.warn('⚠ getAllUsers() called on the server. Skipping request.');
      return of([]);
    }
  }

  createUser(first_name: string, last_name: string, email: string, password: string, is_admin: Boolean, is_active: Boolean): Observable<any> {
    const isBrowser = isPlatformBrowser(this.platformId);
    console.log(`🌍 Checking platform: ${isBrowser ? 'Browser' : 'Server'}`);


    console.log("✅ Running in browser, making API call...");

    const tokenType = sessionStorage.getItem('token_type');
    const accessToken = sessionStorage.getItem('access_token');


    if (tokenType && accessToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${accessToken}`
      });

      const body = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        is_admin: is_admin,
        is_active: is_active,


      }
      return this.http.post(`${this.baseUrl}${API_ENDPOINTS.USERS.NEW}`, body, { headers });

    } else {
      console.warn('⚠ No token found in sessionStorage.');
      return of([]);
    }


  }


}
