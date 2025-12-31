import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-addgame',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './addgame.html',
  styleUrl: './addgame.css',
})
export class AddGameComponent {
  form = new FormGroup({
    title : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    platform : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    rating : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    collection : new FormControl<boolean>(false, { nonNullable : true }),
    fangame : new FormControl<boolean>(false, { nonNullable : true }),
    flash : new FormControl<boolean>(false, { nonNullable : true }),
    favourite : new FormControl<boolean>(false, { nonNullable : true })
  });

  submitting = false;

  constructor(
    private dialogRef : MatDialogRef<AddGameComponent>,
    private dataService : DataService
  ){}

  platforms = [
    "NINTENDO_ENTERTAINMENT_SYSTEM",
    "SUPER_NINTENDO",
    "GAME_BOY",
    "GAME_BOY_COLOR",
    "GAME_BOY_ADVANCED",
    "NINTENDO_DS",
    "NINTENDO_3DS",
    "NINTENDO_64",
    "NINTENDO_GAMECUBE",
    "NINTENDO_WII",
    "NINTENDO_WII_U",
    "NINTENDO_SWITCH",
    "NINTENDO_SWITCH_2",
    "SEGA_MASTER_SYSTEM",
    "SEGA_MEGA_DRIVE",
    "SEGA_GAME_GEAR",
    "SEGA_SATURN",
    "SEGA_32X",
    "SEGA_CD",
    "SEGA_DREAMCAST",
    "PLAYSTATION",
    "PLAYSTATION_2",
    "PLAYSTATION_3",
    "PLAYSTATION_4",
    "NEO_GEO_POCKET_COLOR",
    "PC",
    "JAVA_PHONE",
    "IOS",
    "ANDROID",
    "ARCADE"];
  ratings = [
    "SHADOW_REALM",
    "HORRIBLE",
    "BAD",
    "OKAY",
    "GOOD",
    "GREAT",
    "FANTASTIC",
    "BEST"];
}
