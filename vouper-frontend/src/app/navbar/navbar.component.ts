import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signedIn = null;
  goHome() {
    this.router.navigate(['/']);
  }

  goSignUp() {
    this.router.navigate(['/login']);
  }

  goSignOut() {
    this.router.navigate(['/']);
    this.authService.signout();
  }
  constructor(private router: Router, public authService: AuthenticationService) { 
    this.authService.user.subscribe(() => {
      this.signedIn = this.authService.isSignedIn();
    });
  }

  ngOnInit() {
  }

}
