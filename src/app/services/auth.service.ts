import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { Observable, of, tap } from 'rxjs';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth0: Auth0Service, private router: Router) {} // Inyectar Router

  login(): boolean {
    /* const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);*/
    this.auth0.loginWithRedirect();
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth0.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
    /*if (!localStorage.getItem('token')) return of(false);
    return of(true);*/
  }

  userInfo(): Observable<User | undefined | null> {
    return this.auth0.user$;
  }
}
