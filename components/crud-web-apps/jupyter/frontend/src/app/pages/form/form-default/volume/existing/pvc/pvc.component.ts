import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NamespaceService } from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { PvcResponseObject } from 'src/app/types';

@Component({
  selector: 'app-existing-pvc',
  templateUrl: './pvc.component.html',
  styleUrls: ['./pvc.component.scss'],
})
export class ExistingPvcComponent implements OnInit {
  @Input() pvcGroup: FormGroup;

  pvcs: PvcResponseObject[] = [];

  constructor(
    private backend: JWABackendService,
    private ns: NamespaceService,
  ) {}

  ngOnInit(): void {
    this.ns.getSelectedNamespace().subscribe(ns => {
      this.backend.getVolumes(ns).subscribe(pvcs => {
        this.pvcs = pvcs;
      });
    });
  }
}
