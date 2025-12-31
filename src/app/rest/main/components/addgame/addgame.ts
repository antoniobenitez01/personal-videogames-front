import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data';
import { ExportVideogame } from '../../interfaces/videogame';
import { MatSelectModule } from '@angular/material/select';
import { PLATFORMS, RATINGS } from '../../shared/constants';

@Component({
  selector: 'app-addgame',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './addgame.html',
  styleUrl: './addgame.css',
})
export class AddGameComponent {
[x: string]: any;
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

  platforms = PLATFORMS;
  ratings = RATINGS;

  submit() {
    if (this.form.valid) {
      this.submitting = true;

      const videogame: ExportVideogame = {
        title: this.form.controls['title'].value,
        platform: this.form.controls['platform'].value,
        rating: this.form.controls['rating'].value,
        collection: this.form.controls['collection'].value,
        fangame: this.form.controls['fangame'].value,
        flash: this.form.controls['flash'].value,
        favourite: this.form.controls['favourite'].value
      };

      this.dataService.postVideogame(videogame).subscribe({
        next: (response) => {
          console.log(response);
          this.dialogRef.close(videogame);
        },
        error: (err) => {
          console.error('Error adding videogame:', err);
          this.submitting = false;
        }
      });
    }
  }
}
