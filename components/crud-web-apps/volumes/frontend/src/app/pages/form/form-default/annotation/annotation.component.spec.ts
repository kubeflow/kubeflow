import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnnotationComponent } from './annotation.component';

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AnnotationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
