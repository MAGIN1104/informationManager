import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';


const routes: Routes = [
  {
      path: '',
      component: UsersComponent
  }
];
@NgModule({
  declarations: [
    UsersComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule { }
