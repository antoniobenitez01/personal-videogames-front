import { Component, EventEmitter } from '@angular/core';
import { ExportVideogame, Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';
import { PLATFORMS, RATINGS } from '../../shared/constants';
import { EditGameComponent } from '../editgame/editgame';
import { MatDialog } from '@angular/material/dialog';
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

  ratingSort: 'asc' | 'desc' | '' = '';

  filterTitle = '';
  filterPlatform = '';
  filterRating = '';

  filterCollection = false;
  filterFangame = false;
  filterFlash = false;
  filterFavourite = false;

  platforms = PLATFORMS;
  ratings = RATINGS;

  constructor(
    private dialog : MatDialog,
    private dataService : DataService
  )
  {
    this.updateData();
  }

  applyFilters(){
    this.filteredGames = this.videogames.filter(game =>
      (!this.filterTitle || game.title.toLowerCase().includes(this.filterTitle.toLowerCase())) &&
      (!this.filterPlatform || game.platform === this.filterPlatform) &&
      (!this.filterRating || game.rating === this.filterRating) &&
      (!this.filterCollection || game.collection) &&
      (!this.filterFangame || game.fangame) &&
      (!this.filterFlash || game.flash) &&
      (!this.filterFavourite || game.favourite)
    );
    if (this.ratingSort) {
      this.filteredGames.sort((a, b) => {
        if (this.ratingSort === 'asc') return a.rating.localeCompare(b.rating);
        return b.rating.localeCompare(a.rating);
      });
    }
  }

  toggleRatingSort() {
    if (!this.ratingSort) this.ratingSort = 'asc';
    else if (this.ratingSort === 'asc') this.ratingSort = 'desc';
    else this.ratingSort = '';
    this.applyFilters();
  }

  updateData(){
    this.dataService.getVideogames().subscribe({
      next: (data) => {
        this.videogames = data;
        this.filteredGames = [...this.videogames];
        this.applyFilters();
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

  editVideogame( game : Videogame ){
    const dialogRef = this.dialog.open(EditGameComponent,{
      data : game
    });
    dialogRef.afterClosed().subscribe(result => {
      console.info(result);
      this.updateData();
    });
  }

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
