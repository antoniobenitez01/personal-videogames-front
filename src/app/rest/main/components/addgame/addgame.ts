import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data';
import { ExportVideogame } from '../../interfaces/videogame';
import { DIFFICULTIES, PLATFORMS, RATINGS } from '../../shared/constants';
import { MaterialModule } from '../../shared/material-module';

@Component({
  selector: 'app-addgame',
  imports: [ MaterialModule ],
  templateUrl: './addgame.html',
  styleUrl: './addgame.css',
})
export class AddGameComponent {
[x: string]: any;
  form = new FormGroup({
    title : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    platform : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    rating : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    difficulty : new FormControl<string>('',{ nonNullable: true, validators: Validators.required }),
    genres : new FormControl<string[]>([],{nonNullable: true}),
    fangame : new FormControl<boolean>(false, { nonNullable : true }),
    favourite : new FormControl<boolean>(false, { nonNullable : true })
  });

  submitting = false;

  constructor(
    private dialogRef : MatDialogRef<AddGameComponent>,
    private dataService : DataService
  ){}

  platforms = PLATFORMS;
  ratings = RATINGS;
  difficulties = DIFFICULTIES;

  addGenre(event: any){
    let value = event.value?.trim();
    if(!value) return;

    const genres = this.form.controls.genres.value;
    if (genres.some(g => g.toLowerCase() === value.toLowerCase())) {
      event.chipInput.clear();
      return;
    }

    this.form.controls.genres.setValue([
      ...this.form.controls.genres.value,
      value
    ]);

    event.chipInput.clear();
  }

  removeGenre(genre: string){
    this.form.controls.genres.setValue(
      this.form.controls.genres.value.filter(gen => gen !== genre)
    );
  }

  submit() {
    if (this.form.valid) {
      this.submitting = true;

      const videogame: ExportVideogame = {
        title: this.form.controls['title'].value,
        platform: this.form.controls['platform'].value,
        rating: this.form.controls['rating'].value,
        difficulty: this.form.controls['difficulty'].value,
        genres: this.form.controls['genres'].value,
        fangame: this.form.controls['fangame'].value,
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
