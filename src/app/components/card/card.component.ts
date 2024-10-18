import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardInterface } from 'src/app/interfaces/Card.interface';
import { CardOptionEnum } from '../../enums/card.enum';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: CardInterface = {
    title: 'TITLE',
    description: 'DECRIPTION',
  };
  @Input() edit: boolean = false;
  @Output() cardData: EventEmitter<CardInterface> = new EventEmitter<CardInterface>();

  public CardOptionEnum = CardOptionEnum;


  emitData(option: CardOptionEnum) {
    const newData: CardInterface = {
      ...this.card,
      option: option,
    };
    this.cardData.emit(newData);
  }
}
