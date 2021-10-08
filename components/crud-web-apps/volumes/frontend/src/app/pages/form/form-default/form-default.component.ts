import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  NamespaceService,
  DIALOG_RESP,
} from 'kubeflow';
import { VWABackendService } from 'src/app/services/backend.service';
import { PVCPostObject } from 'src/app/types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-default',
  templateUrl: './form-default.component.html',
  styleUrls: ['./form-default.component.scss'],
})
export class FormDefaultComponent implements OnInit, OnDestroy {
  public TYPE_ROK_SNAPSHOT = 'rok_snapshot';
  public TYPE_EMPTY = 'empty';

  public subs = new Subscription();
  public formCtrl: FormGroup;
  public blockSubmit = false;

  public currNamespace = '';
  public pvcNames = new Set<string>();
  public storageClasses: string[] = [];
  public defaultStorageClass: string;

  constructor(
    public ns: NamespaceService,
    public fb: FormBuilder,
    public backend: VWABackendService,
    public dialog: MatDialogRef<FormDefaultComponent>,
  ) {
    this.formCtrl = this.fb.group({
      type: ['empty', [Validators.required]],
      name: ['', [Validators.required]],
      namespace: ['', [Validators.required]],
      size: [10, []],
      class: ['$empty', [Validators.required]],
      mode: ['ReadWriteOnce', [Validators.required]],
      annotations: fb.array([]),
    });
  }

  ngOnInit() {
    this.formCtrl.controls.namespace.disable();

    this.backend.getStorageClasses().subscribe(storageClasses => {
      this.storageClasses = storageClasses;

      // Once we have the list of storage classes, get the
      // default one from the backend and make it the preselected
      this.backend.getDefaultStorageClass().subscribe(defaultClass => {
        this.defaultStorageClass = defaultClass;
        this.formCtrl.controls.class.setValue(defaultClass);
      });
    });

    this.subs.add(
      this.ns.getSelectedNamespace().subscribe(ns => {
        this.currNamespace = ns;
        this.formCtrl.controls.namespace.setValue(ns);

        this.backend.getPVCs(ns).subscribe(pvcs => {
          this.pvcNames.clear();
          pvcs.forEach(pvc => this.pvcNames.add(pvc.name));
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    const pvc: PVCPostObject = JSON.parse(JSON.stringify(this.formCtrl.value));
    pvc.size = pvc.size + 'Gi';
    this.blockSubmit = true;

    this.backend.createPVC(this.currNamespace, pvc).subscribe(
      result => {
        this.dialog.close(DIALOG_RESP.ACCEPT);
      },
      error => {
        this.blockSubmit = false;
      },
    );
  }

  public onCancel() {
    this.dialog.close(DIALOG_RESP.CANCEL);
  }

  get annotations() {
    const annotations = this.formCtrl.get('annotations') as FormArray;
    return annotations.controls;
  }

  addAnnotation() {
    const fb = new FormBuilder();
    const ctrl = fb.group({
      key: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });

    const annotations = this.formCtrl.get('annotations') as FormArray;
    annotations.push(ctrl);
  }

  deleteAnnotation(idx: number) {
    const annotations = this.formCtrl.get('annotations') as FormArray;
    annotations.removeAt(idx);
    this.formCtrl.updateValueAndValidity();
  }
}
