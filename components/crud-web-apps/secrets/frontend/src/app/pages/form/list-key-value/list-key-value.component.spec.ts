import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListKeyValueComponent } from './list-key-value.component';

describe('ListKeyValueComponent', () => {
  let component: ListKeyValueComponent;
  let fixture: ComponentFixture<ListKeyValueComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListKeyValueComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
