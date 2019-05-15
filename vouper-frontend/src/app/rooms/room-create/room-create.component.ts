import { Component } from '@angular/core';
import {  FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RoomCreateService } from './room-create.service';

@Component({
    selector: 'app-room-create',
    templateUrl: './room-create.component.html',
    styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent {
    createRoomForm = this.fb.group({
        questionField: ['', Validators.required],
        answers: this.fb.array([
            this.fb.control('', Validators.required)
        ])
    });
    get answers() {
        return this.createRoomForm.get('answers') as FormArray;
    }

    limit = 10;

    addAnswer() {
        if (this.answers.length === this.limit) {
            return;
        }
        const answer = this.fb.control('', Validators.required);
        this.answers.push(answer);
    }

    removeAnswer(index) {
        this.answers.removeAt(index);
    }

    onSubmit() {
        this.rcs.createRoomOnDatabase(this.createRoomForm);
    }

    constructor(private fb: FormBuilder, private rcs: RoomCreateService) {
    }
}
