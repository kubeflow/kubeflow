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

      this.formCtrl.controls.labels.setValue(secret.labels);
      this.formCtrl.controls.annotations.setValue(secret.annotations);
      this.formCtrl.controls.data.setValue(secret.data);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.formCtrl.controls.data.setValue(this.yamleditor.data);
    this.formCtrl.controls.labels.setValue(this.labeleditor.data);
    this.formCtrl.controls.annotations.setValue(this.annotationeditor.data);
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
