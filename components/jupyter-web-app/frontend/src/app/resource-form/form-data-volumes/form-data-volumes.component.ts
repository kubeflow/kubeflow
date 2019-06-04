import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormArray, Validators, FormBuilder } from "@angular/forms";
import { Volume } from "src/app/utils/types";
import { addDataVolume } from "src/app/utils/common";

@Component({
  selector: "app-form-data-volumes",
  templateUrl: "./form-data-volumes.component.html",
  styleUrls: [
    "../resource-form.component.scss",
    "./form-data-volumes.component.scss"
  ]
})
export class FormDataVolumesComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() readonly: boolean;
  @Input() pvcs: Volume[];
  @Input() storageClasses: string[];

  get datavols() {
    const vols = this.parentForm.get("datavols") as FormArray;
    return vols.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  createVolumeControl(vol: Volume) {
    const ctrl = this.fb.group({
      type: [vol.type, [Validators.required]],
      name: [vol.name, [Validators.required]],
      size: [vol.size, [Validators.required]],
      path: [vol.path, [Validators.required]],
      mode: [vol.mode, [Validators.required]],
      class: [vol.class, []],
      extraFields: this.fb.group({})
    });

    return ctrl;
  }

  addVol() {
    addDataVolume(this.parentForm);
  }

  deleteVol(idx: number) {
    const vols = this.parentForm.get("datavols") as FormArray;
    vols.removeAt(idx);
    this.parentForm.updateValueAndValidity();
  }
}
