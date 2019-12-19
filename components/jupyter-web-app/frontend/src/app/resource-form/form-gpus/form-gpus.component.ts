import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-gpus',
  templateUrl: './form-gpus.component.html',
  styleUrls: ['./form-gpus.component.scss', '../resource-form.component.scss'],
})
export class FormGpusComponent implements OnInit {
  @Input() parentForm: FormGroup;

  maxGPUs = 16;
  gpusCount = [1, 2, 4, 8];

  constructor() {}

  ngOnInit() {}
}
