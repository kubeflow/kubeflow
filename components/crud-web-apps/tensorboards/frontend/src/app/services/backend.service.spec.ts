import { TestBed } from '@angular/core/testing';

import { TWABackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';

describe('TWABackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: TWABackendService = TestBed.inject(TWABackendService);
    expect(service).toBeTruthy();
  });
});
