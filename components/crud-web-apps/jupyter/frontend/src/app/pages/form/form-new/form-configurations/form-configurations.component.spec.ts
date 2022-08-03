import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NamespaceService } from 'kubeflow';
import { of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormConfigurationsComponent } from './form-configurations.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getPodDefaults: () => of(),
};

const NamespaceServiceStub: Partial<NamespaceService> = {
  getSelectedNamespace: () => of(),
};

describe('FormConfigurationsComponent', () => {
  let component: FormConfigurationsComponent;
  let fixture: ComponentFixture<FormConfigurationsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormConfigurationsComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: NamespaceService, useValue: NamespaceServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfigurationsComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      configurations: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
