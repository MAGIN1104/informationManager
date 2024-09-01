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
    this.auth0.loginWithRedirect();
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth0.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  userInfo(): Observable<User | undefined | null> {
    return this.auth0.user$;
  }
}
