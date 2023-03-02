import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VolumeAccessModesComponent } from './access-modes.component';

describe('VolumeAccessModesComponent', () => {
  let component: VolumeAccessModesComponent;
  let fixture: ComponentFixture<VolumeAccessModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeAccessModesComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatTooltipModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeAccessModesComponent);
    component = fixture.componentInstance;
    component.modesCtrl = new FormControl('test');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
