import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  createExistingVolumeFormGroup,
  createNewPvcVolumeFormGroup,
  getNewVolumeSize,
  getNewVolumeType,
  getVolumeName,
  getVolumeTitle,
} from 'src/app/shared/utils/volumes';

@Component({
  selector: 'app-form-data-volumes',
  templateUrl: './form-data-volumes.component.html',
  styleUrls: ['./form-data-volumes.component.scss'],
})
export class FormDataVolumesComponent implements OnInit {
  openPanel = new Set();

  @Input() volsArray: FormArray;
  @Input() readonly: boolean;
  @Input() externalName: string;

  getVolumeTitle = getVolumeTitle;
  getVolumeName = getVolumeName;
  getNewVolumeSize = getNewVolumeSize;
  getNewVolumeType = getNewVolumeType;

  constructor() {}

  ngOnInit() {}

  onDelete(id: number, event: PointerEvent) {
    event.stopPropagation();
    this.volsArray.removeAt(id);
    this.openPanel.clear();
  }

  addNewVolume() {
    const volId = this.volsArray.length + 1;
    const volGroup = createNewPvcVolumeFormGroup(
      `{notebook-name}-datavol-${volId}`,
    );

    this.volsArray.push(volGroup);
  }

  attachExistingVolume() {
    const volGroup = createExistingVolumeFormGroup();

    this.volsArray.push(volGroup);
  }
}
