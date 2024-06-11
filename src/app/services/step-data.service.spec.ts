import { TestBed } from '@angular/core/testing';

import { StepDataService } from './step-data.service';

describe('StepDataService', () => {
  let service: StepDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
