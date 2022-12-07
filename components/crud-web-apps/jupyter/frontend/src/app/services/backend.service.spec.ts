import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SnackBarService } from 'kubeflow';
import { JWABackendService } from './backend.service';

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('JWABackendService', () => {
  let service: JWABackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: SnackBarService, useValue: SnackBarServiceStub }],
    }).compileComponents();
    service = TestBed.inject(JWABackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
