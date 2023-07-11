import { Component, Input, OnInit } from '@angular/core';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { dump } from 'js-yaml';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.scss'],
})
export class YamlComponent implements OnInit {
  @Input() pvc: V1PersistentVolumeClaim;
  @Input() pvcInfoLoaded = false;

  get yaml(): string {
    return this.getYaml(this.pvc, this.pvcInfoLoaded);
  }

  getYaml(pvc: V1PersistentVolumeClaim, pvcInfoLoaded: boolean): string {
    if (!pvc && !pvcInfoLoaded) {
      return 'PVC information is being loaded.';
    } else if (!pvc && pvcInfoLoaded) {
      return 'No data has been found.';
    } else {
      return dump(pvc);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
