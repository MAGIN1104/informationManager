import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor() {} // Inyecta AngularFirestore

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');

    if (request.url.includes('firestore.googleapis.com')) {
      console.log('INTERCEPTOR');
      if (request.method === 'POST' || request.method === 'PUT') {
      } else {
      }
    }
    return next.handle(request);
  }
}
