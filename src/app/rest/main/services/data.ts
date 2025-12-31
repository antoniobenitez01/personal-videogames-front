import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportVideogame, Videogame } from '../interfaces/videogame';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url : string = "http://localhost:8080/games";

  constructor(private http : HttpClient) {}

  getVideogames(): Observable<Videogame[]>{
    return this.http.get<Videogame[]>(this.url + '/all');
  }

  deleteVideogame(id : number){
    return this.http.delete(this.url + '/' + id, { responseType : 'text'});
  }

  postVideogame(data : ExportVideogame): Observable<any> {
    return this.http.post(this.url + '/add', data, { responseType: 'text' });
  }
}
