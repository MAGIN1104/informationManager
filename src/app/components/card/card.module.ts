import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card.component';

@NgModule({
  exports: [CardComponent],
  declarations: [CardComponent],
  imports: [CommonModule, MatCardModule],
})
export class CardModule {}
