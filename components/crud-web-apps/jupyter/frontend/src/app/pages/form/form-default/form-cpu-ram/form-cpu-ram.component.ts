import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpu-ram',
  templateUrl: './form-cpu-ram.component.html',
  styleUrls: ['./form-cpu-ram.component.scss'],
})
export class FormCpuRamComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() readonlyCPU: boolean;
  @Input() readonlyMemory: boolean;
  @Input() cpuLimitFactor: number;
  @Input() memoryLimitFactor: number;

  constructor() {}

  ngOnInit() {
    this.parentForm.get('cpu').valueChanges.subscribe(val => {
      //set cpu limit when value of the cpu request changes
      this.parentForm
        .get('cpuLimit')
        .setValue(
          (this.cpuLimitFactor * this.parentForm.get('cpu').value).toFixed(1),
        );
    });
    this.parentForm.get('memory').valueChanges.subscribe(val => {
      //set memory limit when value of the memory request changes
      this.parentForm
        .get('memoryLimit')
        .setValue(
          (
            this.memoryLimitFactor * this.parentForm.get('memory').value
          ).toFixed(1),
        );
    });
  }

  getCPUError() {}

  getRAMError() {}
}
