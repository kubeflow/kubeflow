import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { VolumeModule } from '../volume/volume.module';
import { FormModule as KfFormModule } from 'kubeflow';

import { FormDataVolumesComponent } from './form-data-volumes.component';

describe('FormDataVolumesComponent', () => {
  let component: FormDataVolumesComponent;
  let fixture: ComponentFixture<FormDataVolumesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormDataVolumesComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatExpansionModule,
          MatIconModule,
          MatButtonToggleModule,
          VolumeModule,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataVolumesComponent);
    component = fixture.componentInstance;
    component.volsArray = new FormArray([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
