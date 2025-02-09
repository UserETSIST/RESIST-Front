
import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments/environment';
import { API_ENDPOINTS } from '../../environments/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  
  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient) {}

  subscribeUser(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };

    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.NEWSLETTER.SUBSCRIBE}`, body, { headers });
  }
}
