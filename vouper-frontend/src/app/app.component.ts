import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bodyClass = 'bodyClass';
  constructor(private authService: AuthenticationService){
  }

}
