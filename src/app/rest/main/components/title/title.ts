import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.html',
  styleUrl: './title.css',
  standalone: false
})
export class TitleComponent {
  myScript : HTMLScriptElement;
  constructor(){
    this.myScript = document.createElement("script");
    this.myScript.src = "scripts/title.js";
    document.body.appendChild(this.myScript);
  }
}
