import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackBarService, SnackType } from 'kubeflow';

import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  createExistingSourceFormGroup,
  createNewPvcFormGroup,
  createNewPvcVolumeFormGroup,
  getNewVolumeSize,
  getNewVolumeType,
  getVolumeDesc,
  getVolumeName,
  getVolumeTitle,
} from 'src/app/shared/utils/volumes';
import { EXISTING_SOURCE, Volume } from 'src/app/types';

@Component({
  selector: 'app-form-workspace-volume',
  templateUrl: './form-workspace-volume.component.html',
  styleUrls: ['./form-workspace-volume.component.scss'],
})
export class FormWorkspaceVolumeComponent implements OnInit, OnDestroy {
  panelOpen = false;
  subscriptions = new Subscription();
  getVolumeTitle = getVolumeTitle;

  getVolumeName = getVolumeName;
  getNewVolumeSize = getNewVolumeSize;
  getNewVolumeType = getNewVolumeType;

  @Input() readonly: boolean;
  @Input() volGroup: FormGroup;
  @Input() externalName: string;

  constructor(private snackBar: SnackBarService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.snackBar.close();
  }

  onDelete(event: PointerEvent) {
    event.stopPropagation();
    this.removeVolumeFields(this.volGroup);
    this.volGroup.disable();
    this.panelOpen = false;
  }

  addNewVolume() {
    this.volGroup.addControl('newPvc', createNewPvcFormGroup());
    this.volGroup.get('mount').setValue('/home/jovyan');
    this.volGroup.enable();
    this.volGroup.get('newPvc.spec.storageClassName').disable();
  }

  attachExistingVolume() {
    this.volGroup.addControl('existingSource', createExistingSourceFormGroup());
    this.volGroup.get('mount').setValue('/home/jovyan');
    this.volGroup.enable();
  }

  private removeVolumeFields(vol: FormGroup) {
    if (vol.get('newPvc')) {
      vol.removeControl('newPvc');
    }

    if (vol.get('existingSource')) {
      vol.removeControl('existingSource');
    }
  }
}
