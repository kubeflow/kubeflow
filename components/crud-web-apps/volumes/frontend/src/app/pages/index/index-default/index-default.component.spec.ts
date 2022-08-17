import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BackendService,
  ConfirmDialogService,
  KubeflowModule,
  NamespaceService,
  PollerService,
  SnackBarService,
} from 'kubeflow';
import { Observable, of } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';

import { IndexDefaultComponent } from './index-default.component';

let VWABackendServiceStub: Partial<VWABackendService>;
let SnackBarServiceStub: Partial<SnackBarService>;
let NamespaceServiceStub: Partial<NamespaceService>;
let MockBackendService: Partial<BackendService>;

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

describe('IndexDefaultComponent', () => {
  let component: IndexDefaultComponent;
  let fixture: ComponentFixture<IndexDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IndexDefaultComponent],
      providers: [
        { provide: ConfirmDialogService, useValue: {} },
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: SnackBarService, useValue: SnackBarServiceStub },
        { provide: NamespaceService, useValue: NamespaceServiceStub },
        { provide: PollerService, useValue: {} },
        { provide: BackendService, useValue: MockBackendService },
      ],
      imports: [MatDialogModule, RouterTestingModule, KubeflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
