import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormAffinityTolerationsComponent } from './form-affinity-tolerations.component';

describe('FormAffinityTolerationsComponent', () => {
  let component: FormAffinityTolerationsComponent;
  let fixture: ComponentFixture<FormAffinityTolerationsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormAffinityTolerationsComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          MatInputModule,
          MatSelectModule,
          NoopAnimationsModule,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAffinityTolerationsComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      affinityConfig: new FormControl(),
      tolerationGroup: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
