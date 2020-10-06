import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  getNameError,
  MAX_NAME_LENGTH,
  getNameSyncValidators,
  getNameAsyncValidators,
} from '../../validators';

@Component({
  selector: 'lib-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss'],
})
export class NameInputComponent implements OnInit {
  private existingNamesPrv = new Set<string>();

  @Input()
  nameControl: AbstractControl;

  @Input()
  resourceName = '';

  @Input()
  maxLength = MAX_NAME_LENGTH;

  @Input()
  get existingNames() {
    return this.existingNamesPrv;
  }
  set existingNames(names: Set<string>) {
    this.existingNamesPrv = names;

    this.nameControl.setAsyncValidators(
      getNameAsyncValidators(this.existingNamesPrv, this.maxLength),
    );

    this.nameControl.setValidators(getNameSyncValidators());
  }
  constructor() {}

  ngOnInit() {
    this.nameControl.setAsyncValidators(
      getNameAsyncValidators(this.existingNamesPrv, this.maxLength),
    );

    this.nameControl.setValidators(getNameSyncValidators());
  }

  nameError() {
    return getNameError(this.nameControl, this.resourceName);
  }
}
