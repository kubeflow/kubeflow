import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule as KfFormModule, SnackBarService } from 'kubeflow';
import { FormGpusComponent } from './form-gpus.component';
import { CommonModule } from '@angular/common';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getGPUVendors: () => of(),
};

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('FormGpusComponent', () => {
  let component: FormGpusComponent;
  let fixture: ComponentFixture<FormGpusComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormGpusComponent],
        imports: [
          CommonModule,
          KfFormModule,
          NoopAnimationsModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
        ],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: SnackBarService, useValue: SnackBarServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGpusComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      gpus: new FormGroup({
        vendor: new FormControl(),
        num: new FormControl(),
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
