import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RokUrlInputComponent } from './rok-url-input.component';
import { FormControl } from '@angular/forms';
import { FormModule } from '../form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

describe('RokUrlInputComponent', () => {
  let component: RokUrlInputComponent;
  let fixture: ComponentFixture<RokUrlInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormModule,
          BrowserAnimationsModule,
          MatSnackBarModule,
          HttpClientModule,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RokUrlInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();

    fixture.detectChanges();
  });

  it('should return a valid date using formatDate()', () => {
    expect(component.formatDate('2022-08-01T10:02:00.716339+00:00')).toEqual(
      '01/08/2022 - 10:02:00',
    );
  });
});
