import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments/environment';
import { API_ENDPOINTS } from '../../environments/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient) { }

  getRecentEvents(days: number, jamming?: boolean, spoofing?: boolean): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
     });

    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.EVENTS.RECENT_EVENTS}?days=${days}&spoofing=${spoofing?1:""}&jamming=${jamming?1:""}`, { headers });
  }

  
}
