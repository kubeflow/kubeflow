import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-volume-access-modes',
  templateUrl: './access-modes.component.html',
  styleUrls: ['./access-modes.component.scss'],
})
export class VolumeAccessModesComponent implements OnInit {
  // modesArray is always an array
  @Input() modesCtrl: FormControl;

  mode = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {
    // Update the initial value of temp control.
    // We expect the input Group to always have one value
    const modes = this.modesCtrl.value;
    this.mode.setValue(modes[0]);

    this.mode.valueChanges.subscribe(mode => {
      this.modesCtrl.setValue([mode]);
    });
  }
}
