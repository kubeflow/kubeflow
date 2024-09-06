import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPostNotifyComponent } from './after-post-notify.component';

describe('AfterPostNotifyComponent', () => {
  let component: AfterPostNotifyComponent;
  let fixture: ComponentFixture<AfterPostNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterPostNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterPostNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
