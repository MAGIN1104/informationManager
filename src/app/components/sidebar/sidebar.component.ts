import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  listMenu: Array<any> = [
    {
      id: '1',
      title: 'Gestion Usuarios',
      route: '/admin/users',
    },
    {
      id: '2',
      title: 'Gestion Grupos',
      route: '/admin/groups',
    },
  ];

  constructor(public _router: Router) {}

  navigateTo(path: string) {
    console.log('NAVEGAR A ' + path);
    this._router.navigateByUrl(path);
  }
}
