import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  jwtToken: String = '';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajout du JWT aux requêtes sortantes si le token est présent
    if (this.jwtToken) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` } });
      console.log('Bearer renvoyé : ' + this.jwtToken);
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        // Récupération du JWT des réponses entrantes
        if (evt instanceof HttpResponse) {
          let enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization) {
            let match = enteteAuthorization.match(/Bearer\s+(.*)$/i);
            if (match && match.length > 1) {
              this.jwtToken = match[1];
              console.log('Bearer récupéré : ' + this.jwtToken);
            }
          }
        }
      })
    );
  }

  setToken(token: String) {
    this.jwtToken = token;
  }

  
}
