import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
