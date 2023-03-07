import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { calculateLimits } from '../utils';

@Component({
  selector: 'app-form-cpu-ram',
  templateUrl: './form-cpu-ram.component.html',
  styleUrls: ['./form-cpu-ram.component.scss'],
})
export class FormCpuRamComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() readonlyCPU: boolean;
  @Input() readonlyMemory: boolean;
  @Input() cpuLimitFactor: string;
  @Input() memoryLimitFactor: string;
  @Input() popoverPosition = 'below';

  constructor() {}

  ngOnInit() {
    this.parentForm.get('cpu').valueChanges.subscribe(val => {
      // set cpu limit when value of the cpu request changes
      if (this.parentForm.get('cpuLimit').dirty) {
        return;
      }

      const cpu = this.parentForm.get('cpu').value;
      this.parentForm
        .get('cpuLimit')
        .setValue(calculateLimits(cpu, this.cpuLimitFactor));
    });

    this.parentForm.get('memory').valueChanges.subscribe(val => {
      // set memory limit when value of the memory request changes
      if (this.parentForm.get('memoryLimit').dirty) {
        return;
      }

      const memory = this.parentForm.get('memory').value;
      this.parentForm
        .get('memoryLimit')
        .setValue(calculateLimits(memory, this.memoryLimitFactor));
    });
  }

  getCPUError() {}

  getRAMError() {}
}
