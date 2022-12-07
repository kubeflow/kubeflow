import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule, RokService, SnackBarService } from 'kubeflow';

import { RokUrlComponent } from './rok-url.component';

const SnackBarServiceStub: Partial<SnackBarService> = {
  open: () => {},
  close: () => {},
};

describe('RokUrlComponent', () => {
  let component: RokUrlComponent;
  let fixture: ComponentFixture<RokUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RokUrlComponent],
      imports: [
        CommonModule,
        FormModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: SnackBarService, useValue: SnackBarServiceStub },
        { provide: RokService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RokUrlComponent);
    component = fixture.componentInstance;
    component.volGroup = new FormGroup({
      mount: new FormControl(),
      newPvc: new FormGroup({
        metadata: new FormGroup({
          annotations: new FormGroup({
            ['rok/origin']: new FormControl(),
          }),
        }),
        spec: new FormGroup({
          resources: new FormGroup({
            requests: new FormGroup({
              storage: new FormControl(),
            }),
          }),
        }),
      }),
      existingSource: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
