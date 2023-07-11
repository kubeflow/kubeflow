import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ContentListItemModule,
  DetailsListModule,
  HeadingSubheadingRowModule,
  LoadingSpinnerModule,
  PollerService,
  SnackBarModule,
  STATUS_TYPE,
  VariablesGroupsTableModule,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { OverviewComponent } from './overview.component';
import { of } from 'rxjs';
import { mockNotebook } from '../notebook-mock';
import { mockPod } from '../pod-mock';
import { VolumesComponent } from './volumes/volumes.component';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getPodDefaults: () => of(),
};
const PollerServiceStub: Partial<PollerService> = {
  exponential: () => of(),
};

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent, VolumesComponent],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: PollerService, useValue: PollerServiceStub },
      ],
      imports: [
        SnackBarModule,
        DetailsListModule,
        ContentListItemModule,
        ConfigurationsModule,
        VariablesGroupsTableModule,
        HeadingSubheadingRowModule,
        LoadingSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.notebook = mockNotebook;
    component.pod = mockPod;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct podDefaultsMessage', () => {
    let message = component.getPodDefaultsMessage(true, []);
    expect(message).toBeTruthy();

    message = component.getPodDefaultsMessage(true, [{}, {}]);
    expect(message).toBeFalsy();
  });

  it('should return correct docker image', () => {
    const dockerImage = component.getDockerImage(component.notebook);
    expect(dockerImage).toEqual(
      'public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse:master-e9324d39',
    );
  });
});
