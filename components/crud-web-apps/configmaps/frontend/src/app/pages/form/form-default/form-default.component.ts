import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  NamespaceService,
  DIALOG_RESP,
} from 'kubeflow';
import { CMWABackendService } from 'src/app/services/backend.service';
import { ConfigMapPostObject, ConfigMapProcessedObject } from 'src/app/types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-default',
  templateUrl: './form-default.component.html',
  styleUrls: ['./form-default.component.scss'],
})
export class FormDefaultComponent implements OnInit {

  public subs = new Subscription();
  public formCtrl: FormGroup;
  public blockSubmit = false;
  public isPatch = false;

  public currNamespace = '';
  public configMapNames = new Set<string>();

  @ViewChild('yamleditor') yamleditor;
  @ViewChild('labeleditor') labeleditor;
  @ViewChild('annotationeditor') annotationeditor;

  constructor(
    public ns: NamespaceService,
    public fb: FormBuilder,
    public backend: CMWABackendService,
    public dialog: MatDialogRef<FormDefaultComponent>,
  ) {
    this.formCtrl = this.fb.group({
      name: ['', [Validators.required]],
      namespace: ['', [Validators.required]],
      labels: [null],
      annotations: [null],
      data: [null],
    });
  }

  ngOnInit() {
    this.formCtrl.controls.namespace.disable();

    this.subs.add(
      this.ns.getSelectedNamespace().subscribe(ns => {
        this.currNamespace = ns;
        this.formCtrl.controls.namespace.setValue(ns);
      }),
    );

    const cmap: ConfigMapProcessedObject = this.dialog._containerInstance._config.data;
    if (cmap != null)
    {
      this.isPatch = true;
      this.formCtrl.controls.name.setValue(cmap.name);
      this.formCtrl.controls.name.disable();

      this.formCtrl.controls.labels.setValue(cmap.labels);
      this.formCtrl.controls.annotations.setValue(cmap.annotations);
      this.formCtrl.controls.data.setValue(cmap.data);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.formCtrl.controls.data.setValue(this.yamleditor.data);
    this.formCtrl.controls.labels.setValue(this.labeleditor.data);
    this.formCtrl.controls.annotations.setValue(this.annotationeditor.data);
    const configMap: ConfigMapPostObject = JSON.parse(JSON.stringify(this.formCtrl.getRawValue()));
    this.blockSubmit = true;
    console.log(configMap);
    
    if (!this.isPatch){
      this.backend.createConfigMap(this.currNamespace, configMap).subscribe(
        result => {
          this.dialog.close(DIALOG_RESP.ACCEPT);
        },
        error => {
          this.blockSubmit = false;
        },
      );
    }
    else{
      this.backend.patchConfigMap(this.currNamespace, configMap).subscribe(
        result => {
          this.dialog.close(DIALOG_RESP.ACCEPT);
        },
        error => {
          this.blockSubmit = false;
        },
      );
    }
  }

  public onCancel() {
    this.dialog.close(DIALOG_RESP.CANCEL);
  }
}
