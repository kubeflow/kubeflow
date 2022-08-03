import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VolumeMountComponent } from './mount.component';

describe('VolumeMountComponent', () => {
  let component: VolumeMountComponent;
  let fixture: ComponentFixture<VolumeMountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeMountComponent],
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeMountComponent);
    component = fixture.componentInstance;
    component.volGroup = new FormGroup({
      mount: new FormControl(),
      newPvc: new FormControl({
        metadata: {},
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
