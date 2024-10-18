import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@NgModule({
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  imports: [CommonModule],
})
export class ButtonModule {}
