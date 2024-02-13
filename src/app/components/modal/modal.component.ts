import { Component, Input } from '@angular/core';
import { Modal } from 'src/app/interfaces/Modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  @Input() title!: string;

  isVisible = false;

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onSubmit(){

  }
}
