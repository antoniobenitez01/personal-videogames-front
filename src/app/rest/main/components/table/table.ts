import { Component } from '@angular/core';
import { Videogame } from '../../interfaces/videogame';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  standalone : false
})
export class TableComponent {

  videogames : Videogame[] = [];

  constructor( private dataService : DataService) {}

  update(){
    this.dataService.getVideogames().subscribe({
      next: (data) => {
        this.videogames = data;
      }
    })
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
