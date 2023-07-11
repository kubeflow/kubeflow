import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from 'kubeflow';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormWorkspaceVolumeComponent } from './form-workspace-volume.component';
import { VolumeModule } from '../volume/volume.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('FormWorkspaceVolumeComponent', () => {
  let component: FormWorkspaceVolumeComponent;
  let fixture: ComponentFixture<FormWorkspaceVolumeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormWorkspaceVolumeComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatExpansionModule,
          MatIconModule,
          MatButtonToggleModule,
          VolumeModule,
          NoopAnimationsModule,
          MatCheckboxModule,
          MatSelectModule,
          HttpClientModule,
        ],
        providers: [
          { provide: SnackBarService, useValue: SnackBarServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWorkspaceVolumeComponent);
    component = fixture.componentInstance;
    component.volGroup = new FormGroup({
      mount: new FormControl(),
      newPvc: new FormControl({ spec: { storageClassName: '' } }),
      existingSource: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
