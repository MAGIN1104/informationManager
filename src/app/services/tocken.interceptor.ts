import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.idTokenClaims$.pipe(
      mergeMap((claims) => {
        console.log('CLAIMS', claims?.exp!);
        if (claims && Date.now() < claims.exp! * 1000) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${claims.__raw}`,
            },
          });
        } else {
          // Token expirado, maneja la expiración aquí, como cerrar sesión.
          this.auth.logout({
            logoutParams: { returnTo: document.location.origin },
          });
        }
        return next.handle(request);
      }),
      catchError((error) => {
        // Maneja otros errores de solicitud HTTP aquí
        return throwError(error);
      })
    );
  }
}
