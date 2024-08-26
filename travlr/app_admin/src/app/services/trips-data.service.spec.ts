import { TestBed } from '@angular/core/testing';

import { TripDataService } from './trips-data.service';

describe('TripsDataService', () => {
  let service: TripDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
