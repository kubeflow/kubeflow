import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvcComponent } from './pvc.component';

describe('PvcComponent', () => {
  let component: PvcComponent;
  let fixture: ComponentFixture<PvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvcComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
