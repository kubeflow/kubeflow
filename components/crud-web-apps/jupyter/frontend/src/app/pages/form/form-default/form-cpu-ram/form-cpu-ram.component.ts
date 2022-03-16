import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {calculateLimits} from '../utils';
import {$localize} from '@angular/localize/init';

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
  @Input() cpuMax: number;
  @Input() memoryLimitFactor: string;
  @Input() memoryMaxGi: number;

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
        .setValue(calculateLimits(cpu, this.cpuLimitFactor, this.cpuMax));
    });

    this.parentForm.get('memory').valueChanges.subscribe(val => {
      // set memory limit when value of the memory request changes
      if (this.parentForm.get('memoryLimit').dirty) {
        return;
      }

      const memory = this.parentForm.get('memory').value;
      this.parentForm
        .get('memoryLimit')
        .setValue(calculateLimits(memory, this.memoryLimitFactor, this.memoryMaxGi));
    });
  }

  getCPURequestError() {
    const cpuForm = this.parentForm.get('cpu');
    if (cpuForm.hasError('max')) {
      return $localize`Max CPUs is ${this.cpuMax}`;
    }
  }
  getCPULimitError() {
    const cpuForm = this.parentForm.get('cpuLimit');
    if (cpuForm.hasError('max')) {
      return $localize`Max CPUs is ${this.cpuMax}`;
    }
  }

  getMemoryRequestError() {
    const memoryForm = this.parentForm.get('memory');
    if (memoryForm.hasError('max')) {
      return $localize`Max memory is ${this.memoryMaxGi}Gi`;
    }
  }
  getMemoryLimitError() {
    const memoryForm = this.parentForm.get('memoryLimit');
    if (memoryForm.hasError('max')) {
      return $localize`Max memory is ${this.memoryMaxGi}Gi`;
    }
  }
}
