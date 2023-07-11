import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StorageClassComponent } from './storage-class.component';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getStorageClasses: () => of([]),
  getDefaultStorageClass: () => of(),
};

describe('StorageClassComponent', () => {
  let component: StorageClassComponent;
  let fixture: ComponentFixture<StorageClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageClassComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageClassComponent);
    component = fixture.componentInstance;
    component.scControl = new FormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
