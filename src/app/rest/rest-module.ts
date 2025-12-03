import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRetrieveComponent } from './data/data';
import { MainPageComponent } from './main/main';



@NgModule({
  declarations: [DataRetrieveComponent,MainPageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class RestModule { }
