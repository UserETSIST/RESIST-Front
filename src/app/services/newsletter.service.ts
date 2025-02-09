
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'https://api.example.com/newsletter/subscribe'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  subscribeUser(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
