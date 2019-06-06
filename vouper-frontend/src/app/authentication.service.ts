import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = this.firebaseAuth.authState;
  }

  signup(email: string, password: string, signUpCallback = (msg) => { }) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Created user!', value);
      })
      .catch(err => {
        console.log('Could not create user:', err.message);
        signUpCallback(err.message);
        throw err;
      });
  }

  signin(email: string, password: string, signInCallback = (msg) => { }) {
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Signed in!', value);
    })
    .catch(err => {
      console.log('Could not sign in:', err.message);
      signInCallback(err.message);
      throw err;
    });
  }

  signout() {
    this.firebaseAuth.auth.signOut().then(value => {
      console.log('Signed out!', value);
    })
    .catch(err => {
      console.log('Could not sign out:', err.message);
      throw err;
    });
  }

  currentUser() {
    return this.firebaseAuth.auth.currentUser;
  }

  isSignedIn() {
    return (this.firebaseAuth.auth.currentUser != null);
  }


}
