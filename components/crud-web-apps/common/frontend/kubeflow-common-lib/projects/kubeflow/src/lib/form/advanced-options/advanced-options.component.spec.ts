import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedOptionsComponent } from './advanced-options.component';

describe('AdvancedOptionsComponent', () => {
  let component: AdvancedOptionsComponent;
  let fixture: ComponentFixture<AdvancedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
