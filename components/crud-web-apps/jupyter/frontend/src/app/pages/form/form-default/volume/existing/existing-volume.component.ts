import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EXISTING_SOURCE, EXISTING_VOLUME_TYPE } from 'src/app/types';
import {
  createExistingSourceFormGroup,
  createSourceFormGroup,
} from 'src/app/shared/utils/volumes';
import { dump } from 'js-yaml';
import { V1Volume } from '@kubernetes/client-node';
import { parseYAML } from 'src/app/shared/utils/yaml';

@Component({
  selector: 'app-existing-volume',
  templateUrl: './existing-volume.component.html',
  styleUrls: ['./existing-volume.component.scss'],
})
export class ExistingVolumeComponent implements OnInit {
  @Input() volGroup: FormGroup;

  EXISTING_VOLUME_TYPE = EXISTING_VOLUME_TYPE;

  errorParsingYaml = '';
  private yamlInternal = '';
  get yaml(): string {
    return this.yamlInternal;
  }
  set yaml(text: string) {
    // Try to parse the YAML contents into a JS dict and store it in the
    // FormControl for the existingSource
    this.yamlInternal = text;

    const [parsed, error] = parseYAML(text);
    this.errorParsingYaml = error;

    if (error) {
      return;
    }

    this.volGroup.get('existingSource').setValue(parsed);
  }

  get type(): EXISTING_VOLUME_TYPE {
    if (!this.volGroup) {
      return EXISTING_VOLUME_TYPE.CUSTOM;
    }

    if (this.volGroup.get('existingSource') instanceof FormControl) {
      return EXISTING_VOLUME_TYPE.CUSTOM;
    }

    if (this.volGroup.get('existingSource') instanceof FormGroup) {
      return EXISTING_VOLUME_TYPE.PVC;
    }
  }

  constructor() {}

  ngOnInit(): void {
    const existingSource: V1Volume = this.volGroup.get('existingSource').value;
    this.yaml = dump(existingSource);
  }

  typeChanged(type: EXISTING_VOLUME_TYPE) {
    // In case of custom we change from a form group to a simple form control
    // The user will be inputing a YAML, which we will be converting to JS dict
    if (type === EXISTING_VOLUME_TYPE.CUSTOM) {
      const currSrc = this.volGroup.get('existingSource').value;
      this.yamlInternal = dump(currSrc);
      this.volGroup.setControl('existingSource', new FormControl(currSrc));
      return;
    }

    // Use a FormGroup for PVC, since there will be a form with subfields
    this.volGroup.setControl('existingSource', createExistingSourceFormGroup());

    const sourceGroup = this.volGroup.get('existingSource') as FormGroup;
    const source = EXISTING_SOURCE.PERSISTENT_VOLUME_CLAIM;

    sourceGroup.addControl(source, createSourceFormGroup(source));
  }

  getPvcFormGroup(): AbstractControl {
    return this.volGroup.get('existingSource.persistentVolumeClaim');
  }
}
