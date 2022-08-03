import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { NotebookPageComponent } from './notebook-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsService } from 'src/app/services/actions.service';
import { NamespaceService } from 'kubeflow';
let JWABackendServiceStub: Partial<JWABackendService>;
let ActionsServiceStub: Partial<ActionsService>;
let NamespaceServiceStub: Partial<NamespaceService>;

JWABackendServiceStub = {
  getNotebook: () => of(),
  getNotebookPod: () => of(),
};
ActionsServiceStub = {
  connectToNotebook: () => {},
  deleteNotebook: () => of(),
  startNotebook: () => of(),
  stopNotebook: () => of(),
};
NamespaceServiceStub = {
  updateSelectedNamespace: () => {},
};

describe('NotebookInfoComponent', () => {
  let component: NotebookPageComponent;
  let fixture: ComponentFixture<NotebookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotebookPageComponent],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: ActionsService, useValue: ActionsServiceStub },
        { provide: NamespaceService, useValue: NamespaceServiceStub },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
