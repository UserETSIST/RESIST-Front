import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../environments/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any> {
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
     })
 
     return this.http.get(`${this.baseUrl}${API_ENDPOINTS.USERS.GET_ALL}`, {headers});
   }
}
