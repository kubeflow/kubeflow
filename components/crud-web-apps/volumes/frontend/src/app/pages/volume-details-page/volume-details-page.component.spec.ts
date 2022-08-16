import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  LoadingSpinnerModule,
  NamespaceService,
  TitleActionsToolbarModule,
} from 'kubeflow';
import { of } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';

import { VolumeDetailsPageComponent } from './volume-details-page.component';
const VWABackendServiceStub: Partial<VWABackendService> = {
  getPVC: () => of(),
};
const NamespaceServiceStub: Partial<NamespaceService> = {
  updateSelectedNamespace: () => {},
  getSelectedNamespace2: () => of(),
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
      ],
      imports: [
        RouterTestingModule,
        TitleActionsToolbarModule,
        LoadingSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
