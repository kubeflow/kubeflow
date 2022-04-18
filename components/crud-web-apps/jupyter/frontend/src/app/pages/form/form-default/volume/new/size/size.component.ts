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
  private sub: Subscription;
  public sizeNum = new FormControl(1, Validators.required);

  @Input()
  get sizeCtrl(): FormControl {
    return this.ctrl;
  }
  set sizeCtrl(ctrl) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.ctrl = ctrl;
    this.sub = this.ctrl.valueChanges.subscribe(size => {
      this.sizeNum.setValue(this.parseK8sGiSizeToInt(size));
    });
  }

  constructor() {}

  ngOnInit(): void {
    this.sizeNum.setValue(this.parseK8sGiSizeToInt(this.sizeCtrl.value));
    this.sizeCtrl.setValue(`${this.sizeNum.value}Gi`);

    this.sizeNum.valueChanges.subscribe(size => {
      this.sizeCtrl.setValue(`${size}Gi`, { emitEvent: false });
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
