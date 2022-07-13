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
import { ConfigPostObject, ConfigProcessedObject, SecretResponseObject } from 'src/app/types';
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

  public secrets: String[] = [];
  public secretLists: SecretResponseObject[];

  public configmaps: String[] = [];
  public configmapLists: SecretResponseObject[];

  @ViewChild('envs') envs;
  @ViewChild('volumes') volumes;

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
      volumes: this.fb.array([]),
      envs: this.fb.array([]),
      isSync: [false, [Validators.required]]
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
        
        this.backend.getConfigMaps(ns).subscribe(configmaps => {
          this.configmapLists = configmaps;
          for(const configmap of configmaps){
            this.configmaps.push(configmap.name)
          }})
      }),
    );
    
    const config: ConfigProcessedObject = this.dialog._containerInstance._config.data;
    if (config != null)
    {
      this.isPatch = true;
      this.formCtrl.controls.name.setValue(config.name);
      this.formCtrl.controls.name.disable();

      this.formCtrl.controls.desc.setValue(config.desc);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onSelectionChange(i){
    let valueKeys = [];
    for (const secret of this.secretLists){
      if (secret.name == this.envs.formArray.at(i).get("from").value){
        for (var key in secret.data){
          valueKeys.push(key);
        }
      }
    }
    this.envs.formArray.at(i).get("valueList").setValue(valueKeys);
  }

  public onNBSelectionChange(i){
    let valueKeys = [];
    for (const configmap of this.configmapLists){
      if (configmap.name == this.volumes.formArray.at(i).get("from").value){
        for (var key in configmap.data){
          valueKeys.push(key);
        }
      }
    }
    this.volumes.formArray.at(i).get("valueList").setValue(valueKeys);
  }

  public onSubmit() {
    const config: ConfigPostObject = JSON.parse(JSON.stringify(this.formCtrl.getRawValue()));
    this.blockSubmit = true;
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
