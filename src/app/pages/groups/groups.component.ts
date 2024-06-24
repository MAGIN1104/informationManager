import { Component } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  constructor(private _groupService: GroupsService) {}
  ngOnInit(): void {
    this.loadGroups();
  }
  loadGroups() {
    this._groupService.getGroups().subscribe((x) => {
      console.log(x[0].users);
    });
  }
}
