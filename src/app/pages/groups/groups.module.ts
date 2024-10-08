import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/tocken.interceptor';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
  },
];

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class GroupsModule { }
