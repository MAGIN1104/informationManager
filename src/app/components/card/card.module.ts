import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  exports: [CardComponent],
  declarations: [CardComponent],
  imports: [CommonModule, MatCardModule, MatMenuModule, MatIcon],
})
export class CardModule {}
