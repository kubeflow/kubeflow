import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsTableComponent } from './conditions-table.component';
import { ConditionsTableModule } from './conditions-table.module';

describe('ConditionsTableComponent', () => {
  let component: ConditionsTableComponent;
  let fixture: ComponentFixture<ConditionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConditionsTableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
