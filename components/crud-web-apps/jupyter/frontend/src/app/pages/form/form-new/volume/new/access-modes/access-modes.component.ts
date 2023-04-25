import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-volume-access-modes',
  templateUrl: './access-modes.component.html',
  styleUrls: ['./access-modes.component.scss'],
})
export class VolumeAccessModesComponent implements OnInit {
  // Control used in the FormGroup and is always an array
  private modesCtrlPrv: FormControl;

  @Input()
  get modesCtrl(): FormControl {
    return this.modesCtrlPrv;
  }
  set modesCtrl(ctrl) {
    this.modesCtrlPrv = ctrl;

    // Update the initial value of temp control.
    // We expect the input Group to always have one value
    const modes = ctrl.value;
    this.mode.setValue(modes[0]);
  }

  // used in the form, takes the first value of the array
  mode = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {
    this.mode.valueChanges.subscribe(mode => {
      this.modesCtrl.setValue([mode]);
    });
  }
}
