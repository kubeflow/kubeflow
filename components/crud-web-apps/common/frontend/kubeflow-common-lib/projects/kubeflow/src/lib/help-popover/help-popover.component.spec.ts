import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpPopoverComponent } from './help-popover.component';
import { HelpPopoverModule } from './help-popover.module';

describe('HelpPopoverComponent', () => {
  let component: HelpPopoverComponent;
  let fixture: ComponentFixture<HelpPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HelpPopoverModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
