import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { callbackify } from 'util';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User>;
  sessionId: ReplaySubject<string>;
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private apiService: ApiService) {
    this.user = this.firebaseAuth.authState;
    this.sessionId = new ReplaySubject<string>();

    this.user.subscribe((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          this.apiService.createUser(idToken, user.email);
          this.setSessionID(idToken);
          this.isLoggedIn = true;
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
        }).catch((error) => {
          console.log('Session ID does not exist: ' + error);
        });
      } else {
        this.sessionId.next(null);
        this.router.navigate(['/']);
        this.isLoggedIn = false;
      }
    });
  }

  setSessionID(sid: string) {
    this.sessionId.next(sid);
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

}
