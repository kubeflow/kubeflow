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
import { SecretPostObject, SecretProcessedObject } from 'src/app/types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-default',
  templateUrl: './form-default.component.html',
  styleUrls: ['./form-default.component.scss'],
})
export class FormDefaultComponent implements OnInit {
  public TYPE_EMPTY = 'empty';

  public Opaque = 'Opaque';
  public ServiceAccountToken = 'kubernetes.io/service-account-token';
  public TLS = "kubernetes.io/tls";

  public subs = new Subscription();
  public formCtrl: FormGroup;
  public blockSubmit = false;
  public isPatch = false;

  public currNamespace = '';
  public secretNames = new Set<string>();

  @ViewChild('yamleditor') yamleditor;
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
      labels: [null],
      annotations: [null],
      secretType: ['', [Validators.required]],
      data: [null],
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
    
    const secret: SecretProcessedObject = this.dialog._containerInstance._config.data;
    if (secret != null)
    {
      this.isPatch = true;
      this.formCtrl.controls.name.setValue(secret.name);
      this.formCtrl.controls.name.disable();

      this.formCtrl.controls.secretType.setValue(secret.type);
      this.formCtrl.controls.secretType.disable();

      this.formCtrl.controls.labels.setValue(JSON.stringify(secret.labels));
      this.formCtrl.controls.annotations.setValue(JSON.stringify(secret.annotations));
      var annotations = secret.annotations == null ? null : new Map(Object.entries(secret.annotations));
      if (annotations != null && 
          annotations.has("replicator.v1.mittwald.de/replicate-to-matching")){
            this.formCtrl.controls.isSync.setValue(true);
            this.formCtrl.controls.isSync.disable();
        }
      this.formCtrl.controls.data.setValue(JSON.stringify(secret.data));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.formCtrl.controls.data.setValue(this.yamleditor.data);
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
    const secret: SecretPostObject = JSON.parse(JSON.stringify(this.formCtrl.getRawValue()));
    this.blockSubmit = true;

    if (!this.isPatch)
    {
      this.backend.createSecret(this.currNamespace, secret).subscribe(
        result => {
          this.dialog.close(DIALOG_RESP.ACCEPT);
        },
        error => {
          this.blockSubmit = false;
        },
      );
    } else{
      this.backend.patchSecret(this.currNamespace, secret).subscribe(
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
