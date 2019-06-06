import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

import { MatToolbarModule, MatRippleModule } from '@angular/material';

/**
 * `NavbarModule`
 * The navigation bar appended to the top of every page in Vouper.
 * Accessible through `<app-navbar>`
 */
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatRippleModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
