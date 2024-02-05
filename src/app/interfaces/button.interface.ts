import { Size } from '../enums/button.enum';

export interface Button {
  label: string;
  icon?: string | undefined;
  size?: Size | undefined;
  color?: string | undefined;
}
