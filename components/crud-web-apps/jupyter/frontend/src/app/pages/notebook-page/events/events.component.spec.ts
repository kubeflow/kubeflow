import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KubeflowModule, PollerService } from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { EventsComponent } from './events.component';
const JWABackendServiceStub: Partial<JWABackendService> = {
  getPodDefaults: () => of(),
};
const PollerServiceStub: Partial<PollerService> = {
  exponential: () => of(),
};

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsComponent],
      imports: [KubeflowModule],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: PollerService, useValue: PollerServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
