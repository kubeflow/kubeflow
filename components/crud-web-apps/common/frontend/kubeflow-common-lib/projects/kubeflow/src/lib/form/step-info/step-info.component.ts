import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-step-info',
  templateUrl: './step-info.component.html',
  styleUrls: ['./step-info.component.scss'],
})
export class StepInfoComponent implements OnInit {
  @Input() header: string;
  @HostBinding('class.lib-step-info') selfClass = true;

  constructor() {}

  ngOnInit() {}
}
