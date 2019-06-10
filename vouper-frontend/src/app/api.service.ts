import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { 
  }

  makeAPICall(sessionId) {
    const headers = new HttpHeaders().set('Session-ID', sessionId);
    return this.http.get(this.apiUrl + '/users', {headers});
  }

  createUser(sessionId, email) {
    const body = { sessionId, email };
    return this.http.post(this.apiUrl + '/users', body).subscribe(() => {});
  }
}
