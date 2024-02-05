import { Component } from '@angular/core';
import { Button } from 'src/app/interfaces/button.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  dataButton: Button = {
    icon: 'users',
    label: 'Crear',
  };
  constructor() {}
}
