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
import { AccelerateDatasetPostObject, AccelerateDatasetProcessedObject, SecretResponseObject } from 'src/app/types';
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
  public datasetNames = new Set<string>();

  public secrets: String[] = [];
  public accessKeys: String[] = [];
  public selectedAccessKeyFrom: string;
  public selectedAccessKeyName: string;

  public secretKeys: String[] = [];
  public selectedSecretKeyFrom: string;
  public selectedSecretKeyName: string;

  public metaurlKeys: String[] = [];
  public selectedMetaurlFrom: string;
  public selectedMetaurlName: string;

  public secretLists: SecretResponseObject[];

  constructor(
    public ns: NamespaceService,
    public fb: FormBuilder,
    public backend: VWABackendService,
    public dialog: MatDialogRef<FormDefaultComponent>,
  ) {
    this.formCtrl = this.fb.group({
      name: ['', [Validators.required]],
      namespace: ['', [Validators.required]],
      endpoint: ['', [Validators.required]],
      objectstorageType: ['', [Validators.required]],
      accessID: ['', [Validators.required]],
      accessSecret: ['', [Validators.required]],
      quotaSize: ['', [Validators.required]],
      mediumType: ['', [Validators.required]],
      path: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.formCtrl.controls.namespace.disable();

    this.subs.add(
      this.ns.getSelectedNamespace().subscribe(ns => {
        this.currNamespace = ns;
        this.formCtrl.controls.namespace.setValue(ns);
        this.backend.getSecrets(ns).subscribe(secrets => {
          this.secretLists = secrets;
          for(const secret of secrets){
            this.secrets.push(secret.name)
          }})
      }),
    );

    const dataset: AccelerateDatasetProcessedObject = this.dialog._containerInstance._config.data;
    if (dataset != null){
      this.isPatch = true;
      this.formCtrl.controls.name.setValue(dataset.name);
      this.formCtrl.controls.name.disable();

  
      this.formCtrl.controls.objectstorageType.setValue(dataset.storage);
      this.formCtrl.controls.objectstorageType.disable();
      
      this.formCtrl.controls.endpoint.setValue(dataset.bucket);
      
      this.formCtrl.controls.accessID.setValue(dataset.path);

      this.formCtrl.controls.accessSecret.setValue(dataset.path);

      this.formCtrl.controls.quotaSize.setValue(dataset.quotaSize);
      this.formCtrl.controls.path.setValue(dataset.path);
      this.formCtrl.controls.mediumType.setValue(dataset.mediumType);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onAccessKeyFromChange(){
    this.accessKeys = [];
    for (const secret of this.secretLists){
      if (secret.name == this.selectedAccessKeyFrom){
        for (var key in secret.data){
          this.accessKeys.push(key);
        }
      }
    }
  }

  public onSecretKeyFromChange(){
    this.secretKeys = [];
    for (const secret of this.secretLists){
      if (secret.name == this.selectedSecretKeyFrom){
        for (var key in secret.data){
          this.secretKeys.push(key);
        }
      }
    }
  }

  public onMetaurlFromChange(){
    this.metaurlKeys = [];
    for (const secret of this.secretLists){
      if (secret.name == this.selectedMetaurlFrom){
        for (var key in secret.data){
          this.metaurlKeys.push(key);
        }
      }
    }
  }

  public onSubmit() {
    
    const tmp: Object = JSON.parse(JSON.stringify(this.formCtrl.getRawValue()));
    this.blockSubmit = true;

    let acceleratedataset: AccelerateDatasetPostObject ={
      name: tmp["name"],
      mountPoint: "juicefs:///", 
      mediumType: tmp["mediumType"], 
      path: tmp["path"], 
      quotaSize: tmp["quotaSize"],
      bucket: tmp["bucket"],
      storage: tmp["objectstorageType"],
      metaurl_key: this.selectedMetaurlName,
      metaurl_name: this.selectedMetaurlFrom, 
      access_key_name: this.selectedAccessKeyFrom,
      access_key: this.selectedAccessKeyName,
      secret_key: this.selectedSecretKeyName,
      secret_key_name: this.selectedSecretKeyFrom,
    };
    if (!this.isPatch)
    {
      this.backend.createAccelerateDataset(this.currNamespace, acceleratedataset).subscribe(
        result => {
          this.dialog.close(DIALOG_RESP.ACCEPT);
        },
        error => { 
          this.blockSubmit = false;
        },
      );
    } else{
      this.backend.patchAccelerateDataset(this.currNamespace, acceleratedataset).subscribe(
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
