import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private _authService: AuthService, public auth0: Auth0Service) {}
  logout() {
    this._authService.logout();
  }
}
