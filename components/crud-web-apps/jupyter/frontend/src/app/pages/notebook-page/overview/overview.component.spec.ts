import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ContentListItemModule,
  DetailsListModule,
  HeadingSubheadingRowModule,
  LoadingSpinnerModule,
  PollerService,
  SnackBarModule,
  VariablesGroupsTableModule,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { OverviewComponent } from './overview.component';
import { of } from 'rxjs';
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
      declarations: [OverviewComponent],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
