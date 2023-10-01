import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { KubeflowModule, NamespaceService } from 'kubeflow';
import { of } from 'rxjs';
import { TWABackendService } from 'src/app/services/backend.service';
import { MatRadioModule } from '@angular/material/radio';

import { FormComponent } from './form.component';
import { FormConfigurationsModule } from './form-configurations/form-configurations.module';

const TWABackendServiceStub = {
  getTensorBoards: () => of(),
  getPVCNames: () => of(),
  createTensorboard: () => of(),
};

const NamespaceServiceStub = {
  getSelectedNamespace: () => of(),
};

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormComponent],
        imports: [
          KubeflowModule,
          MatDialogModule,
          MatRadioModule,
          FormConfigurationsModule,
        ],
        providers: [
          { provide: TWABackendService, useValue: TWABackendServiceStub },
          { provide: NamespaceService, useValue: NamespaceServiceStub },
          { provide: MatDialogRef, useValue: {} },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
