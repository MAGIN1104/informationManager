import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/tocken.interceptor';
import { CardModule } from 'src/app/components/card/card.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    CardModule,
    RouterModule.forChild(routes),
    ButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class GroupsModule {}
