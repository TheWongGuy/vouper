import { NgModule } from '@angular/core';

// Reactive Forms
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angulater Material
import { MatInputModule, MatButtonModule, MatIconModule, MatExpansionModule, MatToolbarModule, MatCardModule, MatCard} from '@angular/material';

// Custom
import { RoomCreateComponent } from './room-create.component';

// Services
import { RoomCreateService } from './room-create.service';

@NgModule({
    imports: [
        // Material
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,

        // Reactive Forms
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        RoomCreateService
    ],
    declarations: [
        RoomCreateComponent
    ],
    exports: [
        RoomCreateComponent
    ]
})
export class RoomCreateModule { }
