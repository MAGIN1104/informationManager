import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuInterface } from 'src/app/interfaces/Menu.interface';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  listMenu: Array<MenuInterface> = [
    {
      id: '1',
      title: 'Usuarios',
      route: '/admin/users',
      icon: 'users',
    },
    {
      id: '2',
      title: 'Grupos',
      route: '/admin/groups',
      icon: 'groups',
    },
  ];

  constructor(
    private _menuSharedService: SharedService,
    public _router: Router
  ) {}
  ngOnInit(): void {
    const menu = this.listMenu.find((data) => data.route === this._router.url);
    this._menuSharedService.menuObservableData = menu!.title;
  }

  navigateTo(path: string, title: string) {
    this._router.navigateByUrl(path);
    this._menuSharedService.menuObservableData = title;
  }
}
