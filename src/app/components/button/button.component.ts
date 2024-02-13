import { Component, Input } from '@angular/core';
import { Size } from 'src/app/enums/button.enum';
import { Button } from 'src/app/interfaces/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() data: Button = {
    label: 'Guardar',
    icon: undefined,
    size: Size.Small,
    color: undefined
  };
  Size = Size;
  iconButton: string | undefined;

  constructor() {}
}
