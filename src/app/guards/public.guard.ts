import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated) => console.log(isAuthenticated)),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/admin/users']);
        }
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }
}
