import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingSubheadingRowComponent } from './heading-subheading-row.component';
import { HeadingSubheadingRowModule } from './heading-subheading-row.module';

describe('HeadingSubheadingRowComponent', () => {
  let component: HeadingSubheadingRowComponent;
  let fixture: ComponentFixture<HeadingSubheadingRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeadingSubheadingRowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingSubheadingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
