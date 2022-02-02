import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInfoComponent } from './step-info.component';

describe('StepInfoComponent', () => {
  let component: StepInfoComponent;
  let fixture: ComponentFixture<StepInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
