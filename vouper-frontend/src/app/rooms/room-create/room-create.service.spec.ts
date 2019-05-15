import { TestBed } from '@angular/core/testing';

import { RoomCreateService } from './room-create.service';

describe('RoomCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomCreateService = TestBed.get(RoomCreateService);
    expect(service).toBeTruthy();
  });
});
