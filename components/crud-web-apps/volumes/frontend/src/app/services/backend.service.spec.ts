import { TestBed } from '@angular/core/testing';
import { VWABackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarService } from 'kubeflow';

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
};

describe('VWABackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: SnackBarService, useValue: SnackBarServiceStub }],
    }),
  );

  it('should be created', () => {
    const service: VWABackendService = TestBed.inject(VWABackendService);
    expect(service).toBeTruthy();
  });
});
