import { TestBed } from '@angular/core/testing';

import { TeslaDataService } from './tesla-data.service';

describe('TeslaDataService', () => {
  let service: TeslaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
