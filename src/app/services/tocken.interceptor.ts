import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _afs: AngularFirestore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request.url)
    if (this.isFirestoreRequest(request)) {
      if (request.method === 'POST' || request.method === 'PUT') {
        console.log('Handling POST/PUT request to Firestore');
      }
    }

    return next.handle(request);
  }

  private isFirestoreRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('firestore.googleapis.com');
  }

}
