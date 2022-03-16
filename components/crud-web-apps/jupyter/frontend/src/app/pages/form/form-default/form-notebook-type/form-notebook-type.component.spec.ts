import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormNotebookTypeComponent } from './form-notebook-type.component';

describe('FormNotebookTypeComponent', () => {
  let component: FormNotebookTypeComponent;
  let fixture: ComponentFixture<FormNotebookTypeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormNotebookTypeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNotebookTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
