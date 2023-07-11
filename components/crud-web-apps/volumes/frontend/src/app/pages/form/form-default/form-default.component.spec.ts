import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { KubeflowModule } from 'kubeflow';
import { of } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';

import { FormDefaultComponent } from './form-default.component';

const VWABackendServiceStub: Partial<VWABackendService> = {
  getStorageClasses: () => of(),
  getDefaultStorageClass: () => of(),
  getPVCs: () => of(),
  createPVC: () => of(),
};
const FormBuilderStub: Partial<FormBuilder> = {
  group: () => mockFormGroup,
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

describe('FormDefaultComponent', () => {
  let component: FormDefaultComponent;
  let fixture: ComponentFixture<FormDefaultComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormDefaultComponent],
        providers: [
          { provide: FormBuilder, useValue: FormBuilderStub },
          { provide: VWABackendService, useValue: VWABackendServiceStub },
          { provide: MatDialogRef, useValue: {} },
        ],
        imports: [KubeflowModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
