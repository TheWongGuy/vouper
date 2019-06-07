import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationGuard } from './authentication.guard';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
