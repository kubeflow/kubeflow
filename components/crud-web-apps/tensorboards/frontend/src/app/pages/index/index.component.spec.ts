import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BackendService,
  ConfirmDialogService,
  KubeflowModule,
  NamespaceService,
  PollerService,
  SnackBarService,
} from 'kubeflow';
import { Observable, of } from 'rxjs';
import { TWABackendService } from 'src/app/services/backend.service';
import { MatRadioModule } from '@angular/material/radio';

import { IndexComponent } from './index.component';

const TWABackendServiceStub = {
  getTensorBoards: () => of(),
  deleteTensorboard: () => of(),
};

const NamespaceServiceStub = {
  getSelectedNamespace: () => of(),
  getSelectedNamespace2: () => of(),
};

const SnackBarServiceStub = {
  open: () => {},
  close: () => {},
};

const MockBackendService = {
  getNamespaces(): Observable<string[]> {
    return of([]);
  },
};

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexComponent],
        imports: [KubeflowModule, MatDialogModule, MatRadioModule],
        providers: [
          { provide: TWABackendService, useValue: TWABackendServiceStub },
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
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
