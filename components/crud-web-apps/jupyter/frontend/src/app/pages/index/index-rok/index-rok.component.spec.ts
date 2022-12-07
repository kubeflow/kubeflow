import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  BackendService,
  ConfirmDialogService,
  KubeflowModule,
  NamespaceService,
  PollerService,
  RokService,
  SnackBarService,
} from 'kubeflow';
import { Observable, of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { IndexDefaultModule } from '../index-default/index-default.module';

import { IndexRokComponent } from './index-rok.component';

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

const RokServiceStub: Partial<RokService> = {
  initCSRF: () => {},
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

describe('IndexRokComponent', () => {
  let component: IndexRokComponent;
  let fixture: ComponentFixture<IndexRokComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexRokComponent],
        imports: [
          CommonModule,
          KubeflowModule,
          IndexDefaultModule,
          HttpClientModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: NamespaceService, useValue: NamespaceServiceStub },
          { provide: SnackBarService, useValue: SnackBarServiceStub },
          { provide: PollerService, useValue: {} },
          { provide: ConfirmDialogService, useValue: {} },
          { provide: RokService, useValue: RokServiceStub },
          { provide: BackendService, useValue: MockBackendService },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
