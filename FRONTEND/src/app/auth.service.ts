import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ApiHttpInterceptor } from '../http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public nom = new BehaviorSubject<string>('');
  public prenom = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private apiHttpInterceptor: ApiHttpInterceptor) { }

  login(username: string, password: string): Observable<any> {
    const data = `login=${username}&password=${password}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post<any>(environment.backendLoginClient, data, httpOptions).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(environment.backendRegisterClient, user);
  }

  setToken(token: string): void {
    this.apiHttpInterceptor.setToken(token);
    this.jwtToken = token;
  }

  getToken(): string | null {
    return this.jwtToken;
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setUserData(nom: string, prenom: string): void {
    this.nom.next(nom);
    this.prenom.next(prenom);
  }
}
