import { Component, signal } from '@angular/core';
import { RestModule } from './rest/rest-module';

@Component({
  selector: 'app-root',
  imports: [RestModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('videogames');
}
