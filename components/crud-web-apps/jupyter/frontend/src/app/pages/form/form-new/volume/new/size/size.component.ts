import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-volume-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class VolumeSizeComponent implements OnInit {
  private ctrl: FormControl;
  public sizeNum = new FormControl(1, Validators.required);

  @Input()
  get sizeCtrl(): FormControl {
    return this.ctrl;
  }
  set sizeCtrl(ctrl) {
    const size = ctrl.value;
    this.ctrl = ctrl;
    this.sizeNum.setValue(this.parseK8sGiSizeToInt(size));
  }

  constructor() {}

  ngOnInit(): void {
    // This is used for the form, and does not contain Gi
    this.sizeNum.setValue(this.parseK8sGiSizeToInt(this.sizeCtrl.value));

    // This is the FormGroup's control value, and we want Gi here
    this.sizeCtrl.setValue(`${this.sizeNum.value}Gi`);

    this.sizeNum.valueChanges.subscribe(size => {
      if (size === null) {
        this.sizeCtrl.setValue('');
      } else {
        this.sizeCtrl.setValue(`${size}Gi`, { emitEvent: false });
      }
    });
  }

  private parseK8sGiSizeToInt(sizeK8s: string): number {
    if (sizeK8s.includes('Gi')) {
      return parseInt(sizeK8s.replace('Gi', ''), 10);
    }

    if (sizeK8s.includes('Mi')) {
      return parseInt(sizeK8s.replace('Mi', ''), 10) / 1000;
    }

    return parseInt(sizeK8s, 10);
  }
}
