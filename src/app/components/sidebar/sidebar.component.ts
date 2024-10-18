import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInterface } from 'src/app/interfaces/Menu.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SharedService } from 'src/app/services/shared.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  listMenu: Array<MenuInterface> = [];
  listMenuAdmin: Array<MenuInterface> = [
    { title: 'Gestion de Usuarios', route: '/admin/users', icon: 'users' },
    { title: 'Roles', route: '/admin/groups', icon: 'user_role' },
    { title: 'Celulas Familiares', route: '/admin/groups', icon: 'family' },
    { title: 'Grupos Generales', route: '/admin/groups', icon: 'groups' },
  ];

  listMenuAssistance: Array<MenuInterface> = [
    { title: 'Gestion de Usuarios', route: '/admin/users', icon: 'users' },
    { title: 'Celulas Familiares', route: '/admin/groups', icon: 'user_role' },
  ];

  assistant: string = '';
  admin: string = 'Au30V95puKmkvNP9FUCV';

  constructor(
    private _menuSharedService: SharedService,
    public _router: Router,
    private _authService: AuthService,
    private _permissionService: PermissionsService
  ) {
    this.userInfo();
  }

  ngOnInit(): void {
    const menu = this.listMenu.find((data) => data.route === this._router.url);
    if (menu) {
      this._menuSharedService.menuObservableData = menu.title;
    }
  }

  userInfo() {
    this._authService.userInfo().subscribe((x) => {
      this._permissionService.findByEmail(x?.email!).subscribe((r) => {
        this.setMenuByRole(r);
      });
    });
  }

  navigateTo(path: string, title: string) {
    this._router.navigateByUrl(path);
    this._menuSharedService.menuObservableData = title;
  }

  setMenuByRole(role: Array<any>) {
    console.log('ROLE ', role);
    switch (role[0].role) {
      case 'Au30V95puKmkvNP9FUCV':
        this.listMenu = this.listMenuAssistance;
        break;
      case 'Q72THz2zZva7xWxAUiSY':
        this.listMenu = this.listMenuAssistance;
        break;
      default:
        this.listMenu = [];
        break;
    }
  }
}
