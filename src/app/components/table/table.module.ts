import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [CommonModule, MatTableModule],
})
export class TableModule {}
