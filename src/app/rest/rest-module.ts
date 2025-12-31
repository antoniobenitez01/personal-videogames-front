import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './main/components/table/table';
import { MainPageComponent } from './main/main';
import { TitleComponent } from './main/components/title/title';
import { Iconbar } from './main/components/iconbar/iconbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    MainPageComponent,
    TitleComponent,
    Iconbar,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class RestModule { }
