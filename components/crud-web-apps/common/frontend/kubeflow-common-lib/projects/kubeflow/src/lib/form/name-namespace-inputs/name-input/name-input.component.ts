import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  getNameValidators,
  getNameError,
  MAX_NAME_LENGTH,
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
    this.setNameValidators();
  }
  constructor() {}

  ngOnInit() {
    this.setNameValidators();
  }

  setNameValidators() {
    this.nameControl.setValidators(
      getNameValidators(this.existingNamesPrv, this.maxLength),
    );
  }

  nameError() {
    return getNameError(this.nameControl, this.resourceName);
  }
}
