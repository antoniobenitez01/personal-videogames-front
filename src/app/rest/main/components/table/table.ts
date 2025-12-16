import { Component } from '@angular/core';
import { Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  standalone : false
})
export class TableComponent {

  videogames : Videogame[] = [];
  private subscription! : Subscription;

  constructor( private dataService : DataService) {}

  ngOnInit(): void {
    this.subscription = interval(100).pipe(
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
  }

  deleteVideogame( id : number){
    this.dataService.deleteVideogame(id).subscribe({
      next: (response) => {
        console.log("Server Response: ", response);
      },
      error: (error) => {
        console.error("Delete failed: ",error);
      }
    })
  }
}
