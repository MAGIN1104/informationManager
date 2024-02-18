import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { Firestore } from '@angular/fire/firestore'; // Importa AngularFirestore

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private firestore: Firestore) {} // Inyecta AngularFirestore

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("STATUS, ", request.method )

    // Verifica si la solicitud es para Firestore
    if (request.url.includes('firestore.googleapis.com')) {
      
      if (request.method === 'POST' || request.method === 'PUT') {
        // Agregar encabezado de autorización usando el token de Auth0
          console.log("STATUS, ", request.method )
        } else {
          // Manejar caso en el que no hay token de autenticación disponible
          // Aquí puedes redirigir al usuario a iniciar sesión o tomar otra acción según tu aplicación
        } 
    }

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
