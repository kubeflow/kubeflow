import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RokUrlInputComponent } from './rok-url-input.component';

describe('RokUrlInputComponent', () => {
  let component: RokUrlInputComponent;
  let fixture: ComponentFixture<RokUrlInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RokUrlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RokUrlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
