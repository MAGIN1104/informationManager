import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuInterface } from 'src/app/interfaces/Menu.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  listMenu: Array<MenuInterface> = [
    {
      id: '1',
      title: 'Gestion de Usuarios',
      route: '/admin/users',
      icon: 'users',
    },
    {
      id: '2',
      title: 'Roles',
      route: '/admin/groups',
      icon: 'user_role',
    },
    {
      id: '3',
      title: 'Celulas Familiares',
      route: '/admin/groups',
      icon: 'family',
    },
    {
      id: '4',
      title: 'Grupos Generales',
      route: '/admin/groups',
      icon: 'groups',
    },
  ];

  constructor(
    private _menuSharedService: SharedService,
    public _router: Router,
    private _http: HttpClient,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userInfo();
    const menu = this.listMenu.find((data) => data.route === this._router.url);
    this._menuSharedService.menuObservableData = menu!.title;
  }

  userInfo() {
    this._authService.userInfo().subscribe((x) => {
      console.log(x);
    });
  }

  navigateTo(path: string, title: string) {
    this._router.navigateByUrl(path);
    this._menuSharedService.menuObservableData = title;
  }
}
