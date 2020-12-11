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

  constructor() {}

  ngOnInit() {}

  getCPUError() {}

  getRAMError() {}
}
