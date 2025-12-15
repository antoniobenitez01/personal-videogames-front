import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRetrieveComponent } from './main/data/data';
import { MainPageComponent } from './main/main';
import { TitleComponent } from './main/components/title/title';



@NgModule({
  declarations: [
    DataRetrieveComponent,
    MainPageComponent,
    TitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class RestModule { }
