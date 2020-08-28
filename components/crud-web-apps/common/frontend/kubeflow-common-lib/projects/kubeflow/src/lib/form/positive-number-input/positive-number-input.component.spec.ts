import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveNumberInputComponent } from './positive-number-input.component';

describe('PositiveNumberInputComponent', () => {
  let component: PositiveNumberInputComponent;
  let fixture: ComponentFixture<PositiveNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveNumberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
