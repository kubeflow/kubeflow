import { Component, OnInit, Input } from '@angular/core';
import { Status, STATUS_TYPE } from './types';
import { StatusValue } from '../types';

@Component({
  selector: 'lib-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() row: any;
  @Input() config: StatusValue;

  STATUS_TYPE = STATUS_TYPE;

  constructor() {}

  ngOnInit() {}
}
