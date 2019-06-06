import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  goHome() {
    this.router.navigate(['/']);
  }

  constructor(private router: Router, public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
