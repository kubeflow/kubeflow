import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormImageComponent } from './form-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormModule as KfFormModule } from 'kubeflow';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxChange } from '@angular/material/checkbox';

describe('FormImageComponent', () => {
  let component: FormImageComponent;
  let fixture: ComponentFixture<FormImageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormImageComponent],
        imports: [
          CommonModule,
          KfFormModule,
          MatIconModule,
          MatButtonToggleModule,
          NoopAnimationsModule,
          HttpClientModule,
          MatFormFieldModule,
          MatSelectModule,
          ReactiveFormsModule,
          MatIconTestingModule,
          MatExpansionModule,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImageComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      customImage: new FormControl(),
      customImageCheck: new FormControl(),
      image: new FormControl(),
      imageGroupOne: new FormControl(),
      imageGroupTwo: new FormControl(),
      serverType: new FormControl(),
      imagePullPolicy: new FormControl(),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle image controls when custom image is checked', () => {
    const image = component.parentForm.get('image');
    const imageGroupOne = component.parentForm.get('imageGroupOne');
    const imageGroupTwo = component.parentForm.get('imageGroupTwo');

    let event = { checked: true } as MatCheckboxChange;
    component.onSelect(event);

    expect(image.disabled).toBe(true);
    expect(imageGroupOne.disabled).toBe(true);
    expect(imageGroupTwo.disabled).toBe(true);

    event = { checked: false } as MatCheckboxChange;
    component.onSelect(event);

    expect(image.enabled).toBe(true);
    expect(imageGroupOne.enabled).toBe(true);
    expect(imageGroupTwo.enabled).toBe(true);
  });
});
