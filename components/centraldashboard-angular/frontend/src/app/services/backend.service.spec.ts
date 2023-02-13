import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CDBBackendService } from './backend.service';

describe('BackendService', () => {
  let service: CDBBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(CDBBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
