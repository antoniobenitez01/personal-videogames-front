import { Component, EventEmitter } from '@angular/core';
import { ExportVideogame, Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';
import { PLATFORMS, RATINGS } from '../../shared/constants';
import { EditGameComponent } from '../editgame/editgame';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
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

  platformControl = new FormControl<string[]>([]);
  ratingControl = new FormControl<string[]>([]);

  filterTitle = '';
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
    this.platformControl.valueChanges.subscribe(() => this.applyFilters());
    this.ratingControl.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const selectedPlatforms = this.platformControl.value;
    const selectedRatings = this.ratingControl.value;

    this.filteredGames = this.videogames.filter(game =>
      (!this.filterTitle || game.title.toLowerCase().includes(this.filterTitle.toLowerCase())) &&
      (!selectedPlatforms?.length || selectedPlatforms.includes(game.platform)) &&
      (!selectedRatings?.length || selectedRatings.includes(game.rating)) &&
      (!this.filterCollection || game.collection) &&
      (!this.filterFangame || game.fangame) &&
      (!this.filterFlash || game.flash) &&
      (!this.filterFavourite || game.favourite)
    );
  }

  updateData() {
    this.dataService.getVideogames().subscribe(games => {
      this.videogames = games;
      this.applyFilters();
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
