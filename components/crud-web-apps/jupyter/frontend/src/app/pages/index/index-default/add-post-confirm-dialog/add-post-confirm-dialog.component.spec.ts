import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostConfirmDialogComponent } from './add-post-confirm-dialog.component';

describe('AddPostConfirmDialogComponent', () => {
  let component: AddPostConfirmDialogComponent;
  let fixture: ComponentFixture<AddPostConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
