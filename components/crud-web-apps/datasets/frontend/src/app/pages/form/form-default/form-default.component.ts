import { Component, OnInit } from '@angular/core';
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
import { AccelerateDatasetPostObject, AccelerateDatasetProcessedObject } from 'src/app/types';
import { MatDialogRef } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}


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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

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
