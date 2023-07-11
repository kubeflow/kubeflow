import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerModule, PollerService } from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { LogsComponent } from './logs.component';
const JWABackendServiceStub: Partial<JWABackendService> = {
  getPodDefaults: () => of(),
};
const PollerServiceStub: Partial<PollerService> = {
  exponential: () => of(),
};

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogsComponent],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: PollerService, useValue: PollerServiceStub },
      ],
      imports: [LoadingSpinnerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
