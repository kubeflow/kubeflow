import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPVCViewerButtonComponent } from './open-pvcviewer-button.component';

const mockElement = {
  age: 'Mon, 19 Sep 2022 16:39:10 GMT',
  capacity: '5Gi',
  class: '',
  modes: ['ReadWriteOnce'],
  name: 'a0-new-image-workspace-d8pc2',
  namespace: 'kubeflow-user',
  notebooks: ['a0-new-image'],
  status: {
    message: 'Bound',
    phase: 'ready',
    state: '',
  },
  viewer: 'uninitialized',
};

describe('OpenPVCViewerButtonComponent', () => {
  let component: OpenPVCViewerButtonComponent;
  let fixture: ComponentFixture<OpenPVCViewerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenPVCViewerButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPVCViewerButtonComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
