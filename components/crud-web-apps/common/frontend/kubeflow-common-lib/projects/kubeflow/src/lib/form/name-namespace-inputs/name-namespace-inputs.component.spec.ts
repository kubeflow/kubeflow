import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameNamespaceInputsComponent } from './name-namespace-inputs.component';

describe('NameNamespaceInputsComponent', () => {
  let component: NameNamespaceInputsComponent;
  let fixture: ComponentFixture<NameNamespaceInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameNamespaceInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameNamespaceInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
