import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    title : new FormControl('',{ nonNullable: true, validators: Validators.required }),
    platform : new FormControl('',{ nonNullable: true, validators: Validators.required }),
    rating : new FormControl('',{ nonNullable: true, validators: Validators.required }),
  });
}
