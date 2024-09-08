import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndexComponent2 } from './index2.component';

describe('IndexComponent2', () => {
  let component: IndexComponent2;
  let fixture: ComponentFixture<IndexComponent2>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexComponent2],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
