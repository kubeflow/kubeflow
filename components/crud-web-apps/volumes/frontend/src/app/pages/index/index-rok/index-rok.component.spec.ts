import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  BackendService,
  ConfirmDialogService,
  KubeflowModule,
  NamespaceService,
  PollerService,
  RokService,
  SnackBarService,
} from 'kubeflow';
import { VWABackendService } from 'src/app/services/backend.service';
import { Observable, of } from 'rxjs';

import { IndexRokComponent } from './index-rok.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

let VWABackendServiceStub: Partial<VWABackendService>;
let SnackBarServiceStub: Partial<SnackBarService>;
let NamespaceServiceStub: Partial<NamespaceService>;
let MockBackendService: Partial<BackendService>;
let RokServiceStub: Partial<RokService>;

VWABackendServiceStub = {
  getPVCs: () => of(),
};

SnackBarServiceStub = {
  open: () => {},
  close: () => {},
};

NamespaceServiceStub = {
  getSelectedNamespace: () => of(),
  getSelectedNamespace2: () => of(),
};

MockBackendService = {
  getNamespaces(): Observable<string[]> {
    return of([]);
  },
};

RokServiceStub = {
  initCSRF: () => {},
};

describe('IndexRokComponent', () => {
  let component: IndexRokComponent;
  let fixture: ComponentFixture<IndexRokComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IndexRokComponent],
      providers: [
        { provide: ConfirmDialogService, useValue: {} },
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: SnackBarService, useValue: SnackBarServiceStub },
        { provide: NamespaceService, useValue: NamespaceServiceStub },
        { provide: PollerService, useValue: {} },
        { provide: BackendService, useValue: MockBackendService },
        { provide: RokService, useValue: RokServiceStub },
      ],
      imports: [MatDialogModule, RouterTestingModule, KubeflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
