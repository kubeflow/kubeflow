import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-key-value',
  templateUrl: './list-key-value.component.html',
  styleUrls: ['./list-key-value.component.scss'],
})
export class ListKeyValueComponent {
  @Input() header: string;
  @Input() addButtonText = 'Add key-value';
  @Input() keyLabel = 'Key';
  @Input() valueLabel = 'Value';
  @Input() formArray: FormArray;

  addCtrl() {
    this.formArray.push(
      new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        isBase64: new FormControl(false, Validators.required),
      }),
    );
  }

  removeCtrl(i: number) {
    this.formArray.removeAt(i);
  }
}
