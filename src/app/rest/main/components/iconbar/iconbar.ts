import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from '../addgame/addgame';

@Component({
  selector: 'app-iconbar',
  standalone: false,
  templateUrl: './iconbar.html',
  styleUrl: './iconbar.css',
})
export class Iconbar {

  constructor(private dialog: MatDialog){}

  @Output() update = new EventEmitter<boolean>();

  sendUpdate(){
    this.update.emit(true);
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddGameComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.info(result);
      this.update.emit(true);
    });
  }
}
