import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YamlsComponent } from './yamls.component';

describe('YamlsComponent', () => {
  let component: YamlsComponent;
  let fixture: ComponentFixture<YamlsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [YamlsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(YamlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
