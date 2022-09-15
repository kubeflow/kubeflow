import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonComponent } from './delete-button.component';

const mockElement = {
  age: 'Mon, 19 Sep 2022 16:39:10 GMT',
  capacity: '5Gi',
  class: 'rok',
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

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    component.element = mockElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
