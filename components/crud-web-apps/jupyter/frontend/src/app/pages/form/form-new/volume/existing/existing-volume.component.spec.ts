import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditorModule } from 'kubeflow';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExistingVolumeComponent } from './existing-volume.component';
import { ExistingPvcModule } from './pvc/pvc.module';

describe('ExistingVolumeComponent', () => {
  let component: ExistingVolumeComponent;
  let fixture: ComponentFixture<ExistingVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingVolumeComponent],
      imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        ExistingPvcModule,
        NoopAnimationsModule,
        EditorModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingVolumeComponent);
    component = fixture.componentInstance;
    component.volGroup = new FormGroup({
      existingSource: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
