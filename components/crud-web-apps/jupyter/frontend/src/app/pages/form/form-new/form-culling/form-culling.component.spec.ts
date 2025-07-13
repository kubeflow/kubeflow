import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { FormCullingComponent } from './form-culling.component';
import { FormCullingModule } from './form-culling.module';
import { JWABackendService } from 'src/app/services/backend.service';
import { NamespaceService } from 'kubeflow';

describe('FormCullingComponent', () => {
  let component: FormCullingComponent;
  let fixture: ComponentFixture<FormCullingComponent>;
  let mockBackendService: jasmine.SpyObj<JWABackendService>;
  let mockNamespaceService: jasmine.SpyObj<NamespaceService>;

  beforeEach(async () => {
    const backendSpy = jasmine.createSpyObj('JWABackendService', ['getCullingPolicy']);
    const namespaceSpy = jasmine.createSpyObj('NamespaceService', ['getSelectedNamespace']);

    await TestBed.configureTestingModule({
      imports: [
        FormCullingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: JWABackendService, useValue: backendSpy },
        { provide: NamespaceService, useValue: namespaceSpy },
      ],
    }).compileComponents();

    mockBackendService = TestBed.inject(JWABackendService) as jasmine.SpyObj<JWABackendService>;
    mockNamespaceService = TestBed.inject(NamespaceService) as jasmine.SpyObj<NamespaceService>;

    // Setup default mocks
    mockNamespaceService.getSelectedNamespace.and.returnValue(of('test-namespace'));
    mockBackendService.getCullingPolicy.and.returnValue(of({
      source: 'cluster',
      enabled: true,
      idleTimeout: '24h',
      checkPeriod: '1m',
      exempt: false
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCullingComponent);
    component = fixture.componentInstance;

    // Create a test form
    const fb = new FormBuilder();
    component.parentForm = fb.group({
      culling: fb.group({
        enabled: [false],
        idleTimeValue: [5],
        idleTimeUnit: ['minutes'],
        checkPeriodValue: [1],
        checkPeriodUnit: ['minutes'],
        exempt: [false]
      })
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load effective policy on init', () => {
    expect(mockBackendService.getCullingPolicy).toHaveBeenCalledWith('test-namespace');
    expect(component.effectivePolicy).toBeTruthy();
  });

  it('should format duration correctly', () => {
    const result = component['formatDuration'](5, 'minutes');
    expect(result).toBe('5m');
  });

  it('should get correct policy source label', () => {
    expect(component.getPolicySourceLabel('notebook')).toBe('Notebook Level');
    expect(component.getPolicySourceLabel('profile')).toBe('Profile Level');
    expect(component.getPolicySourceLabel('cluster')).toBe('Cluster Level');
  });

  it('should return null configuration when culling is disabled', () => {
    component.parentForm.get('culling.enabled').setValue(false);
    const config = component.getCullingConfiguration();
    expect(config).toBeNull();
  });

  it('should return correct configuration when culling is enabled', () => {
    component.parentForm.get('culling.enabled').setValue(true);
    component.parentForm.get('culling.idleTimeValue').setValue(10);
    component.parentForm.get('culling.idleTimeUnit').setValue('hours');
    
    const config = component.getCullingConfiguration();
    expect(config).toEqual({
      enabled: true,
      idleTimeout: '10h',
      checkPeriod: '1m',
      exempt: false
    });
  });
});
