import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-volume-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.scss'],
})
export class VolumeMountComponent implements OnInit {
  @Input() volGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
