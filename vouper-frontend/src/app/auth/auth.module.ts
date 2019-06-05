import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';

import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [
    SignupComponent
  ]
})
export class AuthModule { }
