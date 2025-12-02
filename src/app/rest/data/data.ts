import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Videogame } from '../interfaces/videogame';

@Component({
  selector: 'app-rest',
  imports: [],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class DataRetrieveComponent {

  videogames : Videogame[] = [];

  constructor(private http: HttpClient){
    this.update();
  }

  update(){
    this.videogames = [];
    this.http.get<Videogame[]>("http://localhost:8080/videogames")
    .subscribe({
      next: (data) => this.videogames = data,
      error: (err) => console.error(err)
    })
  }
}
