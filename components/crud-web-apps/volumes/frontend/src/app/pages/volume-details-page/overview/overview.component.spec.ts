import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentListItemModule,
  DetailsListModule,
  KubeflowModule,
  LoadingSpinnerModule,
  PollerService,
  SnackBarModule,
} from 'kubeflow';
import { VWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { OverviewComponent } from './overview.component';

const VWABackendServiceStub: Partial<VWABackendService> = {
  getPodsUsingPVC: () => of(),
};
const PollerServiceStub: Partial<PollerService> = {
  exponential: () => of(),
};

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      providers: [
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: PollerService, useValue: PollerServiceStub },
      ],
      imports: [
        DetailsListModule,
        LoadingSpinnerModule,
        SnackBarModule,
        ContentListItemModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
