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
import { VWABackendService } from 'src/app/services/backend.service';
import { ConfigPostObject, ConfigProcessedObject } from 'src/app/types';
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
  public configurationNames = new Set<string>();

  @ViewChild('volummounteditor') volummounteditor;
  @ViewChild('volumeeditor') volumeeditor;
  @ViewChild('enveditor') enveditor;
  @ViewChild('labeleditor') labeleditor;
  @ViewChild('annotationeditor') annotationeditor;

  constructor(
    public ns: NamespaceService,
    public fb: FormBuilder,
    public backend: VWABackendService,
    public dialog: MatDialogRef<FormDefaultComponent>,
  ) {
    this.formCtrl = this.fb.group({
      name: ['', [Validators.required]],
      namespace: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      labels: [null],
      annotations: [null],
      volumeMounts: [null],
      volumes: [null],
      env: [null],
      isSync: [false, [Validators.required]]
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
    
    const config: ConfigProcessedObject = this.dialog._containerInstance._config.data;
    if (config != null)
    {
      this.isPatch = true;
      this.formCtrl.controls.name.setValue(config.name);
      this.formCtrl.controls.name.disable();
      this.formCtrl.controls.labels.setValue(JSON.stringify(config.labels));
      this.formCtrl.controls.annotations.setValue(JSON.stringify(config.annotations));
      var annotations = config.annotations == null ? null : new Map(Object.entries(config.annotations));
      if (annotations != null && 
          annotations.has("replicator.v1.mittwald.de/replicate-to-matching")){
            this.formCtrl.controls.isSync.setValue(true);
            this.formCtrl.controls.isSync.disable();
        }

      this.formCtrl.controls.desc.setValue(config.desc);
      this.formCtrl.controls.volumeMounts.setValue(JSON.stringify(config.volumeMounts));
      this.formCtrl.controls.volumes.setValue(JSON.stringify(config.volumes));
      this.formCtrl.controls.env.setValue(JSON.stringify(config.env));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.formCtrl.controls.volumeMounts.setValue(this.volummounteditor.data);
    this.formCtrl.controls.volumes.setValue(this.volumeeditor.data);
    this.formCtrl.controls.env.setValue(this.enveditor.data);
    this.formCtrl.controls.labels.setValue(this.labeleditor.data);
    var annotations = this.annotationeditor.data == null ? new Map() : new Map(Object.entries(this.annotationeditor.data));
    if (this.formCtrl.controls.isSync.value){
      if (!annotations.has("replicator.v1.mittwald.de/replicate-to-matching")){
            annotations.set("replicator.v1.mittwald.de/replicate-to-matching", "app.kubernetes.io/part-of=kubeflow-profile")
          }
    }
    this.formCtrl.controls.annotations.setValue(((function(map) {
      let obj = Object.create(null);
      for (let [k,v] of map){
        obj[k]=v;
      }
      return obj;
    })(annotations)));
    const config: ConfigPostObject = JSON.parse(JSON.stringify(this.formCtrl.getRawValue()));
    this.blockSubmit = true;
    console.log(config);
    if (!this.isPatch)
    {
      this.backend.createConfig(this.currNamespace, config).subscribe(
        result => {
          this.dialog.close(DIALOG_RESP.ACCEPT);
        },
        error => { 
          this.blockSubmit = false;
        },
      );
    } else{
      this.backend.patchConfig(this.currNamespace, config).subscribe(
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
