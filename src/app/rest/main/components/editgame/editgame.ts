import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data';
import { Videogame, EditGameForm } from '../../interfaces/videogame';
import { PLATFORMS, RATINGS } from '../../shared/constants';
import { MaterialModule } from '../../shared/material-module';

@Component({
  selector: 'app-editgame',
  imports: [ MaterialModule ],
  templateUrl: './editgame.html',
  styleUrl: './editgame.css',
})
export class EditGameComponent {
  platforms = PLATFORMS;
  ratings = RATINGS;

  form: FormGroup<EditGameForm>;

  constructor(
    private dialogRef: MatDialogRef<EditGameComponent>,
    private dataService : DataService,
    @Inject(MAT_DIALOG_DATA) public data : Videogame | null
  ){
    this.form = new FormGroup<EditGameForm>({
      title : new FormControl(data?.title || '', { nonNullable: true, validators: Validators.required }),
      platform : new FormControl(data?.platform || '', { nonNullable: true, validators: Validators.required }),
      rating : new FormControl(data?.rating || '', { nonNullable: true, validators: Validators.required }),
      genres : new FormControl(data?.genres || [], { nonNullable: true }),
      collection : new FormControl(data?.collection || false, { nonNullable: true }),
      romhack : new FormControl(data?.romhack || false, { nonNullable: true }),
      fangame : new FormControl(data?.fangame || false, { nonNullable: true }),
      flash : new FormControl(data?.flash || false, { nonNullable: true }),
      favourite : new FormControl(data?.favourite || false, { nonNullable: true }),
    })
  }

  addGenre(event: any){
    let value = event.value?.trim();
    if(!value) return;

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

  submit(){
    if (this.form.valid){
      const videogame : Videogame = {
        ...this.data,
        ...this.form.getRawValue()
      };
      const obs = this.data ? this.dataService.updateVideogame( videogame ) : this.dataService.postVideogame( videogame );
      obs.subscribe({
        next : response => {
          console.log(response);
          this.dialogRef.close( videogame );
        },
        error : err => console.error(err)
      })
    }
  }
}
