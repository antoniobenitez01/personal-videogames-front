import { Component, EventEmitter } from '@angular/core';
import { Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';
import { PLATFORMS, RATINGS } from '../../shared/constants';
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
  filteredGames : Videogame[] = [];
  //private subscription! : Subscription;

  filterTitle = '';
  filterPlatform = '';
  filterRating = '';

  platforms = PLATFORMS;
  ratings = RATINGS;

  constructor( private dataService : DataService) {
    this.updateData();
  }

  applyFilters(){
    this.filteredGames = this.videogames.filter(game =>
      game.title.toLowerCase().includes(this.filterTitle.toLowerCase()) &&
      (this.filterPlatform === '' || game.platform === this.filterPlatform) &&
      (this.filterRating === '' || game.rating === this.filterRating)
    )
  }

  updateData(){
    this.dataService.getVideogames().subscribe({
      next: (data) => {
        this.videogames = data;
        this.filteredGames = [...this.videogames];
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
