import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndexDefaultComponent2 } from './index-default2.component';

describe('IndexDefaultComponent2', () => {
  let component: IndexDefaultComponent2;
  let fixture: ComponentFixture<IndexDefaultComponent2>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexDefaultComponent2],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDefaultComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
