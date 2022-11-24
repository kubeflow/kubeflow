import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingVolumeComponent } from './existing-volume.component';

describe('ExistingVolumeComponent', () => {
  let component: ExistingVolumeComponent;
  let fixture: ComponentFixture<ExistingVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingVolumeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
