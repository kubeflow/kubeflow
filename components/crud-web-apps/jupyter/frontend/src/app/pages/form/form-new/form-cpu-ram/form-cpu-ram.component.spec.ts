import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule as KfFormModule, SnackBarService } from 'kubeflow';
import { FormCpuRamComponent } from './form-cpu-ram.component';

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('FormCpuRamComponent', () => {
  let component: FormCpuRamComponent;
  let fixture: ComponentFixture<FormCpuRamComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormCpuRamComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: SnackBarService, useValue: SnackBarServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCpuRamComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      cpu: new FormControl(),
      cpuLimit: new FormControl(),
      memory: new FormControl(),
      memoryLimit: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
