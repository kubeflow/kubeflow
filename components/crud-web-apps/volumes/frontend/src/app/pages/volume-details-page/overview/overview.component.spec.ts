import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  ContentListItemModule,
  DetailsListModule,
  LoadingSpinnerModule,
  PollerService,
  SnackBarModule,
} from 'kubeflow';
import { VWABackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';

import { OverviewComponent } from './overview.component';
import { mockPods } from './pods-mock';
import { mockPvc } from '../pvc-mock';
import { mockPodGroups } from './pod-groups-mock';

const VWABackendServiceStub: Partial<VWABackendService> = {
  getPodsUsingPVC: () => of(mockPods),
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
    component.pvc = mockPvc;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct PodUrl according to group', () => {
    const newPodLink = 'newPodLink';
    let podLink = component[newPodLink](
      'podName',
      'namespace',
      'Notebooks',
      'viewerUrl',
    );
    expect(podLink.url).toEqual(
      'viewerUrl/jupyter/notebook/details/namespace/podName/',
    );
    podLink = component[newPodLink](
      'podName',
      'namespace',
      'InferenceService',
      'viewerUrl',
    );
    expect(podLink.url).toEqual('viewerUrl/models/details/namespace/podName/');
  });

  it('should initialize correct podGroups', () => {
    const generatePodGroups = 'generatePodGroups';
    const groups = component[generatePodGroups](mockPods, 'viewerUrl');
    const names = groups.map(group => group.name);
    expect(names).toContain('InferenceService');
  });

  it('should generate expected podGroups', () => {
    const podGroups = mockPodGroups;
    const pods = mockPods;
    const viewerUrl = 'viewerUrl';
    const generatePodGroups = 'generatePodGroups';
    const newPodGroups = component[generatePodGroups](pods, viewerUrl);
    expect(newPodGroups).toEqual(podGroups);
  });
});
