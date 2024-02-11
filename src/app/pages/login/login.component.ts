import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    console.log('LOGIN');
    this.authService.login('user@example.com', 'password');
    this.router.navigate(['/admin/users']);
  }
  logout() {
    this.authService.logout();
    // Redirigir al usuario o actualizar el estado de la UI
  }
}
