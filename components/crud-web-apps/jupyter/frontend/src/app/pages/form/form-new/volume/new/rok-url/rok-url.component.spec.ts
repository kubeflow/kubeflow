import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RokUrlComponent } from './rok-url.component';

describe('RokUrlComponent', () => {
  let component: RokUrlComponent;
  let fixture: ComponentFixture<RokUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RokUrlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RokUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
