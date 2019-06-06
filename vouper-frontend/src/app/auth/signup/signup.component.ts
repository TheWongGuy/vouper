import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpError = '';

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signUp() {
    this.authService.signup(this.signupForm.get('email').value, this.signupForm.get('password').value,
      (msg) => { this.signUpError = msg; });
  }

  signIn() {
    this.authService.signin(this.signupForm.get('email').value, this.signupForm.get('password').value,
      (msg) => { this.signUpError = msg; });
  }

  constructor(public authService: AuthenticationService, public router: Router) { 
  }

  ngOnInit() {
  }

}
