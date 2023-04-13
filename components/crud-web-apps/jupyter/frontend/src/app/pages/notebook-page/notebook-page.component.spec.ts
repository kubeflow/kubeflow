import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { JWABackendService } from 'src/app/services/backend.service';
import { of, Subject } from 'rxjs';

import { NotebookPageComponent } from './notebook-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsService } from 'src/app/services/actions.service';
import { KubeflowModule, NamespaceService, STATUS_TYPE } from 'kubeflow';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { OverviewModule } from './overview/overview.module';
import { LogsModule } from './logs/logs.module';
import { YamlModule } from './yaml/yaml.module';
import { EventsModule } from './events/events.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockNotebook } from './notebook-mock';

const JWABackendServiceStub: Partial<JWABackendService> = {
  getPodDefaults: () => of(),
  getNotebook: () => of(mockNotebook),
  getNotebookPod: () => of(),
  getNotebookEvents: () => of(),
};
const ActionsServiceStub: Partial<ActionsService> = {
  connectToNotebook: () => {},
  deleteNotebook: () => of(),
  startNotebook: () => of(),
  stopNotebook: () => of(),
};
const NamespaceServiceStub: Partial<NamespaceService> = {
  updateSelectedNamespace: () => {},
  getSelectedNamespace2: () => of(),
};
const ActivatedRouteStub: Partial<ActivatedRoute> = {
  params: of({ namespace: 'kubeflow-user', notebookName: 'asa232rstudio' }),
  queryParams: of({}),
};

describe('NotebookPageComponent', () => {
  let component: NotebookPageComponent;
  let fixture: ComponentFixture<NotebookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotebookPageComponent],
      providers: [
        { provide: JWABackendService, useValue: JWABackendServiceStub },
        { provide: ActionsService, useValue: ActionsServiceStub },
        { provide: NamespaceService, useValue: NamespaceServiceStub },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
      ],
      imports: [
        RouterTestingModule,
        KubeflowModule,
        MatTabsModule,
        OverviewModule,
        LogsModule,
        EventsModule,
        YamlModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show only the proper tab according to query parameters', fakeAsync(() => {
    const checkActiveTab = (name: string) => {
      const activeTab = fixture.debugElement.query(By.css(`app-${name}`));
      expect(activeTab).toBeTruthy();
    };

    const checkInactiveTabs = (name: string) => {
      const allTabs = ['overview', 'logs', 'events', 'yaml'];
      const indexOfActiveTab = allTabs.findIndex(v => v === name);
      allTabs.splice(indexOfActiveTab, 1);

      allTabs.forEach(tab => {
        const inactiveTab = fixture.debugElement.query(By.css(`app-${tab}`));
        if (!inactiveTab) {
          expect(inactiveTab).toBeFalsy();
        } else {
          const parentElement = inactiveTab.parent.nativeElement;
          const styles = getComputedStyle(parentElement);
          expect(styles.overflow).toEqual('hidden');
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
      checkInactiveTabs(params.tab);
    });
    queryParams.next({ tab: 'logs' });
    queryParams.next({ tab: 'events' });
    queryParams.next({ tab: 'overview' });
    queryParams.next({ tab: 'yaml' });

    discardPeriodicTasks();
  }));

  it('should switchTabs according to queryParams', fakeAsync(() => {
    const checkActiveTabIndex = (name: string) => {
      const allTabs = ['overview', 'logs', 'events', 'yaml'];
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
    queryParams.next({ tab: 'logs' });
    queryParams.next({ tab: 'events' });
    queryParams.next({ tab: 'overview' });
    queryParams.next({ tab: 'yaml' });

    discardPeriodicTasks();
  }));

  it('updateButtons should disable buttons according to notebook status', () => {
    fixture.detectChanges();
    component.notebook.processed_status = {
      phase: STATUS_TYPE.TERMINATING,
      state: '',
      message: 'Terminating',
    };

    // check the initial state of the buttons
    for (const button of component.buttonsConfig) {
      expect(button.disabled).toBeFalse();
    }

    const updateButtons = 'updateButtons';
    component[updateButtons]();
    // check the buttons state after updateButton() is called
    for (const button of component.buttonsConfig) {
      expect(button.disabled).toBeTrue();
    }
  });

  it('updateButtons should update Start/Stop button according to notebook status ', () => {
    fixture.detectChanges();
    component.notebook.processed_status = {
      phase: STATUS_TYPE.STOPPED,
      state: '',
      message: 'No Pods are currently running for this Notebook Server.',
    };

    let flag = component.buttonsConfig
      .map(button => button.text)
      .includes('STOP');
    expect(flag).toBeTrue();
    flag = component.buttonsConfig.map(button => button.text).includes('START');
    expect(flag).toBeFalse();

    const updateButtons = 'updateButtons';
    component[updateButtons]();
    flag = component.buttonsConfig.map(button => button.text).includes('STOP');
    expect(flag).toBeFalse();
    flag = component.buttonsConfig.map(button => button.text).includes('START');
    expect(flag).toBeTrue();
  });
});
