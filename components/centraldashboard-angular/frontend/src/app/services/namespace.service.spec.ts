import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { CDBNamespaceService } from './namespace.service';

describe('NamespaceService', () => {
  let service: CDBNamespaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CDBNamespaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
