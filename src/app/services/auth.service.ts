import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {} // Inyectar Router

  login(email: string, password: string): boolean {
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return of(true);
  }

}
