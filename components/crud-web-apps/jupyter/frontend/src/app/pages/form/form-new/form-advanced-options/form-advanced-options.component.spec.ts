import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormAdvancedOptionsComponent } from './form-advanced-options.component';

describe('FormAdvancedOptionsComponent', () => {
  let component: FormAdvancedOptionsComponent;
  let fixture: ComponentFixture<FormAdvancedOptionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormAdvancedOptionsComponent],
        imports: [CommonModule, KfFormModule, MatSlideToggleModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdvancedOptionsComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      shm: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
