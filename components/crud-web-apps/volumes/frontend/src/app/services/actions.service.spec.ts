import { TestBed } from '@angular/core/testing';
import { ConfirmDialogService, SnackBarService } from 'kubeflow';
import { of } from 'rxjs';
import { ActionsService } from './actions.service';
import { VWABackendService } from './backend.service';

let VWABackendServiceStub: Partial<VWABackendService>;
let SnackBarServiceStub: Partial<SnackBarService>;

VWABackendServiceStub = {
  deletePVC: () => of(),
};
SnackBarServiceStub = {
  open: () => {},
};

describe('ActionsService', () => {
  let service: ActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfirmDialogService, useValue: {} },
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: SnackBarService, useValue: SnackBarServiceStub },
      ],
    });
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
