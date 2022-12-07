import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { JWABackendService } from 'src/app/services/backend.service';

import { IndexDefaultComponent } from './index-default.component';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getNotebooks: () => of(),
  deleteNotebook: () => of(),
  startNotebook: () => of(),
  stopNotebook: () => of(),
};

const NamespaceServiceStub: Partial<NamespaceService> = {
  getSelectedNamespace: () => of(),
  getSelectedNamespace2: () => of(),
};

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

const MockBackendService: Partial<BackendService> = {
  getNamespaces(): Observable<string[]> {
    return of([]);
  },
};

describe('IndexDefaultComponent', () => {
  let component: IndexDefaultComponent;
  let fixture: ComponentFixture<IndexDefaultComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexDefaultComponent],
        imports: [CommonModule, KubeflowModule, RouterTestingModule],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: NamespaceService, useValue: NamespaceServiceStub },
          { provide: SnackBarService, useValue: SnackBarServiceStub },
          { provide: PollerService, useValue: {} },
          { provide: ConfirmDialogService, useValue: {} },
          { provide: BackendService, useValue: MockBackendService },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
