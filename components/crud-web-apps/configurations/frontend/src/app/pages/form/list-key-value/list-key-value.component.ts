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
  @Input() fromLabel = 'From';
  @Input() valueLabel = 'Value';
  @Input() pathLabel = 'Path';
  @Input() formArray: FormArray;
  @Input() fromLabels: FormArray;
  @Input() valueMultSelect: Boolean = false;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter(); 

  addCtrl() {
    this.formArray.push(
      new FormGroup({
        key: new FormControl('', Validators.required),
        from: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        path: new FormControl('/etc', Validators.required),
        valueList: new FormControl([], Validators.required),
      }),
    );
  }

  removeCtrl(i: number) {
    this.formArray.removeAt(i);
  }

  onSelectionChange(i: number){
    this.selectionChange.emit(i);
  }
}
