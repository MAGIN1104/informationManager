import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Group } from 'src/app/interfaces/Groups.interface';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent {
  groups$: Observable<any[]> | undefined;
  users$: Observable<Group[]> | undefined;
  groups: any[] = [];
  constructor(private _groupsService: GroupsService) {}
  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groups$ = this._groupsService.getGroups().pipe(
      tap((groups) => {
        console.log(groups);
      })
    );
  }
}
