import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeWrapperComponent } from './iframe-wrapper.component';

describe('IframeWrapperComponent', () => {
  let component: IframeWrapperComponent;
  let fixture: ComponentFixture<IframeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IframeWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
