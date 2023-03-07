import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGroupsTableComponent } from './link-groups-table.component';

describe('LinkGroupsTableComponent', () => {
  let component: LinkGroupsTableComponent;
  let fixture: ComponentFixture<LinkGroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkGroupsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
