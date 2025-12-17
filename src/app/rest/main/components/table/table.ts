import { Component, EventEmitter } from '@angular/core';
import { Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';
//import { interval, Subscription } from 'rxjs';
//import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  standalone : false,
})
export class TableComponent {

  videogames : Videogame[] = [];
  //private subscription! : Subscription;

  constructor( private dataService : DataService) {
    this.updateData();
  }

  updateData(){
    this.dataService.getVideogames().subscribe({
      next: (data) => {
        this.videogames = data;
      },
      error: (error) => {
        console.error("ERROR - Error fetching VIDOEGAMES : ", error);
      }
    });
  }

  onUpdate(event : boolean){
    if(event){
      this.updateData();
    }
  }

  // INTERVAL CODE
  /*ngOnInit(): void {
    this.subscription = interval(200).pipe(
      switchMap(() => this.dataService.getVideogames())
    ).subscribe({
      next: (data) => {
        this.videogames = data;
      },
      error: (error) => {
        console.error('ERROR - Error fetching VIDEOGAMES : ', error);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }*/

  deleteVideogame( id : number){
    this.dataService.deleteVideogame(id).subscribe({
      next: (response) => {
        console.log("Server Response: ", response);
        this.updateData();
      },
      error: (error) => {
        console.error("Delete failed: ",error);
      }
    })
  }
}
