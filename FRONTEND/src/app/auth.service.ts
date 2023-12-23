import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { environment } from '../environments/environment';
import { ApiHttpInterceptor } from '../http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken: string | null = null;

  constructor(private http: HttpClient, private apiHttpInterceptor: ApiHttpInterceptor) { }

  login(username: string, password: string): Observable<any> {
    const data = `username=${username}&password=${password}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post<any>(environment.backendLoginClient, data, httpOptions).pipe(
      tap(response => {
        if (response && response.token) {
          this.apiHttpInterceptor.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    this.apiHttpInterceptor.setToken(token);
  }

  getToken(): string | null {
    return this.jwtToken;
  }

  isLogged(): boolean {
    return this.jwtToken !== null;
  }
}