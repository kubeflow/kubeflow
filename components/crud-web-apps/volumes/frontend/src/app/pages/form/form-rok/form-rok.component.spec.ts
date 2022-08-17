import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService, KubeflowModule, RokService } from 'kubeflow';
import { Observable, of } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';

import { FormRokComponent } from './form-rok.component';
let VWABackendServiceStub: Partial<VWABackendService>;
let FormBuilderStub: Partial<FormBuilder>;
let RokServiceStub: Partial<RokService>;
let MockBackendService: Partial<BackendService>;

VWABackendServiceStub = {
  getStorageClasses: () => of(),
  getDefaultStorageClass: () => of(),
  getPVCs: () => of(),
  createPVC: () => of(),
};

function getFormDefaults(): FormGroup {
  const fb = new FormBuilder();

  return fb.group({
    type: ['empty', [Validators.required]],
    name: ['', [Validators.required]],
    namespace: ['', [Validators.required]],
    size: [10, []],
    class: ['$empty', [Validators.required]],
    mode: ['ReadWriteOnce', [Validators.required]],
  });
}
const mockFormGroup: FormGroup = getFormDefaults();

FormBuilderStub = {
  group: () => mockFormGroup,
};

RokServiceStub = {
  initCSRF: () => {},
  getObjectMetadata: () => of(),
  getRokManagedStorageClasses: () => of(),
};

MockBackendService = {
  getNamespaces(): Observable<string[]> {
    return of([]);
  },
};

describe('FormRokComponent', () => {
  let component: FormRokComponent;
  let fixture: ComponentFixture<FormRokComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormRokComponent],
      providers: [
        { provide: FormBuilder, useValue: FormBuilderStub },
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: RokService, useValue: RokServiceStub },
        { provide: BackendService, useValue: MockBackendService },
      ],
      imports: [KubeflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
