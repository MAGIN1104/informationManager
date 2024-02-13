import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];
@NgModule({
  declarations: [UsersComponent, ButtonComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule
  ],
})
export class UsersModule {}
