import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { NotebookPageComponent } from './notebook-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NamespaceService } from 'kubeflow';
const JWABackendServiceStub: Partial<JWABackendService> = {
  getNotebook: () => of(),
  getNotebookPod: () => of(),
};
const NamespaceServiceStub: Partial<NamespaceService> = {
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
