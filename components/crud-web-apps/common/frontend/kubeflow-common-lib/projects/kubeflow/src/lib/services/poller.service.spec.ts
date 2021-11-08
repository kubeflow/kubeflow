import { TestBed } from '@angular/core/testing';

import { PollerService } from './poller.service';

describe('PollerService', () => {
  let service: PollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
