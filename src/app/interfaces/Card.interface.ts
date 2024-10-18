import { CardOptionEnum } from '../enums/card.enum';

export interface CardInterface {
  id?: string;
  title: string;
  description: string;
  idGroup?: number;
  option?: CardOptionEnum;
}
