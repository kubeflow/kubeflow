import { FormControl, AbstractControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

export function updateNonDirtyControl(control: AbstractControl, value: any) {
  if (!control.dirty) {
    control.setValue(value);
  }
}

export function updateControlNonNullValue(
  control: AbstractControl,
  value: any,
  msg = 'Can not update control with value null',
) {
  if (value === null) {
    console.warn(msg);
    return;
  }

  control.setValue(value);
  control.markAsDirty();
}
