import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedOptionsComponent } from './advanced-options.component';
import { FormModule } from '../form.module';

describe('AdvancedOptionsComponent', () => {
  let component: AdvancedOptionsComponent;
  let fixture: ComponentFixture<AdvancedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
