import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './main/components/table/table';
import { MainPageComponent } from './main/main';
import { TitleComponent } from './main/components/title/title';



@NgModule({
  declarations: [
    TableComponent,
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
