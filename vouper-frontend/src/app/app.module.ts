import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Custom
import { RoomCreateModule } from './rooms/room-create/room-create.module';

// Material
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    // Material
    MatCardModule,

    // Custom
    RoomCreateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
