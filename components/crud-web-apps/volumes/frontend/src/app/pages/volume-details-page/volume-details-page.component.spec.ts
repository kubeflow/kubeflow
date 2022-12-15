import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  KubeflowModule,
  LoadingSpinnerModule,
  NamespaceService,
  TitleActionsToolbarModule,
} from 'kubeflow';
import { of, Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { VWABackendService } from 'src/app/services/backend.service';
import { EventsModule } from './events/events.module';
import { OverviewModule } from './overview/overview.module';
import { mockPvc } from './pvc-mock';
import { VolumeDetailsPageComponent } from './volume-details-page.component';
import { YamlModule } from './yaml/yaml.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const ActionsServiceStub: Partial<ActionsService> = {
  deleteVolume: () => of(),
};
const VWABackendServiceStub: Partial<VWABackendService> = {
  getPVC: () => of(mockPvc),
  getPodsUsingPVC: () => of(),
  getPVCEvents: () => of(),
};
const NamespaceServiceStub: Partial<NamespaceService> = {
  updateSelectedNamespace: () => {},
  getSelectedNamespace2: () => of(),
};
const ActivatedRouteStub: Partial<ActivatedRoute> = {
  params: of({ namespace: 'kubeflow-user', notebookName: 'asa232rstudio' }),
  queryParams: of({}),
};

describe('VolumeDetailsPageComponent', () => {
  let component: VolumeDetailsPageComponent;
  let fixture: ComponentFixture<VolumeDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeDetailsPageComponent],
      providers: [
        { provide: VWABackendService, useValue: VWABackendServiceStub },
        { provide: NamespaceService, useValue: NamespaceServiceStub },
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
      ],
      imports: [
        RouterTestingModule,
        KubeflowModule,
        MatTabsModule,
        OverviewModule,
        EventsModule,
        YamlModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeDetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show only the proper tab according to query parameters', fakeAsync(() => {
    const checkActiveTab = (name: string) => {
      const activeTab = fixture.debugElement.query(By.css(`app-${name}`));
      expect(activeTab).toBeTruthy();
      expect(
        activeTab.parent.parent.classes['mat-tab-body-active'],
      ).toBeTruthy();
    };

    const checkTabs = (name: string) => {
      // The order of tabs in this array should much the order we have in the
      // template.
      const allTabs = ['overview', 'events', 'yaml'];
      allTabs.forEach((tab, index) => {
        const tabBodies = fixture.debugElement.queryAll(
          By.css('.mat-tab-body'),
        );
        const isActive = tabBodies[index].classes['mat-tab-body-active'];
        if (tab === name) {
          expect(isActive).toBeTrue();
        } else {
          expect(isActive).toBeFalsy();
        }
      });
    };

    const activatedRoute: ActivatedRoute = TestBed.inject(ActivatedRoute);
    const queryParams = new Subject();
    activatedRoute.queryParams = queryParams;
    fixture.detectChanges();
    activatedRoute.queryParams.subscribe(params => {
      fixture.detectChanges();
      tick();
      checkActiveTab(params.tab);
      checkTabs(params.tab);
    });
    queryParams.next({ tab: 'events' });
    queryParams.next({ tab: 'overview' });
    queryParams.next({ tab: 'yaml' });

    discardPeriodicTasks();
  }));

  it('should switchTabs according to queryParams', fakeAsync(() => {
    const checkActiveTabIndex = (name: string) => {
      const allTabs = ['overview', 'events', 'yaml'];
      const expectedIndexOfActiveTab = allTabs.findIndex(v => v === name);
      expect(component.selectedTab.index).toEqual(expectedIndexOfActiveTab);
    };

    const activatedRoute: ActivatedRoute = TestBed.inject(ActivatedRoute);
    const queryParams = new Subject();
    activatedRoute.queryParams = queryParams;
    fixture.detectChanges();
    activatedRoute.queryParams.subscribe(params => {
      fixture.detectChanges();
      tick();
      checkActiveTabIndex(params.tab);
    });
    queryParams.next({ tab: 'events' });
    queryParams.next({ tab: 'overview' });
    queryParams.next({ tab: 'yaml' });

    discardPeriodicTasks();
  }));
});
