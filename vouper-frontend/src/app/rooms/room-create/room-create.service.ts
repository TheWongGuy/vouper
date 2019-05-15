import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomCreateService {

  createRoomOnDatabase(createRoomForm){
    console.log(createRoomForm);
  }
  constructor() { }
}
