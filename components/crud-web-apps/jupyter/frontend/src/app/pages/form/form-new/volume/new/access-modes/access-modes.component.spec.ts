import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessModesComponent } from './access-modes.component';

describe('AccessModesComponent', () => {
  let component: AccessModesComponent;
  let fixture: ComponentFixture<AccessModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessModesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
