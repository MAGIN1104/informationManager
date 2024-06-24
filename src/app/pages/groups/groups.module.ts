import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
  },
];
@NgModule({
  declarations: [GroupsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GroupsModule {}
