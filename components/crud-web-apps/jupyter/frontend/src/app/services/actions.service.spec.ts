import { TestBed } from '@angular/core/testing';
import { JWABackendService } from './backend.service';
import { of } from 'rxjs';
import { ActionsService } from './actions.service';
import { ConfirmDialogService, SnackBarService } from 'kubeflow';

const JWABackendServiceStub: Partial<JWABackendService> = {
  deleteNotebook: () => of(),
  startNotebook: () => of(),
  stopNotebook: () => of(),
};
const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('ActionsService', () => {
  let service: ActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: ConfirmDialogService, useValue: {} },
        { provide: SnackBarService, useValue: SnackBarServiceStub },
      ],
    }).compileComponents();
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
