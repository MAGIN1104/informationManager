import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TableModule } from 'src/app/components/table/table.module';


const routes: Routes = [
  {
      path: '',
      component: UsersComponent
  }
];
@NgModule({
  declarations: [
    UsersComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule
  ]
})
export class UsersModule { }
