import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { STATUS_TYPE } from '../resource-table/status/types';
import { StatusInfoComponent } from './status-info.component';

describe('StatusInfoComponent', () => {
  let component: StatusInfoComponent;
  let fixture: ComponentFixture<StatusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusInfoComponent],
      imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusInfoComponent);
    component = fixture.componentInstance;
    component.status = {
      phase: STATUS_TYPE.READY,
      state: 'Running',
      message: '',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
