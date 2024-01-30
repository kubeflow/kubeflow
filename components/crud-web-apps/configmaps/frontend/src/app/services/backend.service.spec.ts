import { TestBed } from '@angular/core/testing';

import { CMWABackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';

describe('CMWABackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: CMWABackendService = TestBed.inject(CMWABackendService);
    expect(service).toBeTruthy();
  });
});
