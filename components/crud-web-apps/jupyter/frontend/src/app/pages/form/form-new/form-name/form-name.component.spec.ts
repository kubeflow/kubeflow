import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { NamespaceService } from 'kubeflow';
import { of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { FormModule as KfFormModule } from 'kubeflow';
import { FormNameComponent } from './form-name.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getNotebooks: () => of(),
};

const NamespaceServiceStub: Partial<NamespaceService> = {
  getSelectedNamespace: () => of(),
};

describe('FormNameComponent', () => {
  let component: FormNameComponent;
  let fixture: ComponentFixture<FormNameComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormNameComponent],
        imports: [CommonModule, KfFormModule, NoopAnimationsModule],
        providers: [
          { provide: JWABackendService, useValue: JWABackendServiceStub },
          { provide: NamespaceService, useValue: NamespaceServiceStub },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNameComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      name: new FormControl(),
      namespace: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
