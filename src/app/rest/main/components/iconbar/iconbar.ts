import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-iconbar',
  standalone: false,
  templateUrl: './iconbar.html',
  styleUrl: './iconbar.css',
})
export class Iconbar {

  @Output() update = new EventEmitter<boolean>();

  sendUpdate(){
    this.update.emit(true);
  }
}
