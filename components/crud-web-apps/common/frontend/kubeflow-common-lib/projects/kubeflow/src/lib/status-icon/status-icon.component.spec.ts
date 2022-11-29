import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusIconComponent } from './status-icon.component';

describe('StatusIconComponent', () => {
  let component: StatusIconComponent;
  let fixture: ComponentFixture<StatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
