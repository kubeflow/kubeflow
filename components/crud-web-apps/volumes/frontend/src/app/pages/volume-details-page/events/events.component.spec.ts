import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KubeflowModule, PollerService } from 'kubeflow';
import { VWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
import { EventsComponent } from './events.component';

const VWABackendServiceStub: Partial<VWABackendService> = {
  getPVCEvents: () => of(),
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
        { provide: VWABackendService, useValue: VWABackendServiceStub },
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
