import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesGroupsTableComponent } from './variables-groups-table.component';

describe('VariablesGroupsTableComponent', () => {
  let component: VariablesGroupsTableComponent;
  let fixture: ComponentFixture<VariablesGroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablesGroupsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
