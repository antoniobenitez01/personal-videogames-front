import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data';
import { Videogame } from '../../interfaces/videogame';
import { MatSelectModule } from '@angular/material/select';
import { PLATFORMS, RATINGS } from '../../shared/constants';

@Component({
  selector: 'app-editgame',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './editgame.html',
  styleUrl: './editgame.css',
})
export class EditGameComponent {
  platforms = PLATFORMS;
  ratings = RATINGS;

  form: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<EditGameComponent>,
    private dataService : DataService,
    @Inject(MAT_DIALOG_DATA) public data : Videogame | null
  ){
    this.form = new FormGroup({
      title : new FormControl(data?.title || '', { nonNullable: true, validators: Validators.required }),
      platform : new FormControl(data?.platform || '', { nonNullable: true, validators: Validators.required }),
      rating : new FormControl(data?.rating || '', { nonNullable: true, validators: Validators.required }),
      collection : new FormControl(data?.collection || false, { nonNullable: true }),
      fangame : new FormControl(data?.fangame || false, { nonNullable: true }),
      flash : new FormControl(data?.flash || false, { nonNullable: true }),
      favourite : new FormControl(data?.favourite || false, { nonNullable: true }),
    })
  }

  submit(){
    if (this.form.valid){
      const videogame : Videogame = {
        ...this.data,
        ...this.form.value
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
