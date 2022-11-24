import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { dump } from 'js-yaml';
import { parseYAML } from 'src/app/shared/utils/yaml';
import { NEW_VOLUME_TYPE } from 'src/app/types';
import {
  createNewPvcFormGroup,
  setGenerateNameCtrl,
} from 'src/app/shared/utils/volumes';
import { RokService, rokUrlValidator } from 'kubeflow';
import { environment } from '@app/environment';

@Component({
  selector: 'app-new-volume',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewVolumeComponent implements OnInit {
  env = environment;

  get volumeType(): NEW_VOLUME_TYPE {
    if (!this.volGroup) {
      return NEW_VOLUME_TYPE.EMPTY;
    }

    const pvcGroup = this.volGroup.get('newPvc');

    // if we have a form-control then we expect the user to be typing yaml text
    if (pvcGroup instanceof FormControl) {
      return NEW_VOLUME_TYPE.CUSTOM;
    }

    const pvc = pvcGroup.value as V1PersistentVolumeClaim;
    const annotations = pvc?.metadata?.annotations;
    if (annotations && 'rok/origin' in annotations) {
      return NEW_VOLUME_TYPE.ROK_SNAPSHOT;
    }

    return NEW_VOLUME_TYPE.EMPTY;
  }

  @Input() volGroup: FormGroup;
  @Input() externalName: string;

  yamlPrv = '';
  errorParsingYaml = '';

  NEW_VOLUME_TYPE = NEW_VOLUME_TYPE;

  get yaml(): string {
    return this.yamlPrv;
  }
  set yaml(text) {
    // Try to parse the YAML contents into a JS dict and store it in the
    // FormControl for the newPvc
    this.yamlPrv = text;

    const [parsed, error] = parseYAML(text);
    this.errorParsingYaml = error;

    if (error) {
      return;
    }

    this.volGroup.get('newPvc').setValue(parsed);
  }

  constructor(private rok: RokService) {}

  ngOnInit(): void {}

  typeChanged(type: NEW_VOLUME_TYPE) {
    if (type === NEW_VOLUME_TYPE.CUSTOM) {
      // Remove the FormGroup and make newPvc a FormControl, since it's value
      // will be updated from the parsed YAML that the user will write
      const currPvc = this.volGroup.get('newPvc').value;
      this.volGroup.setControl('newPvc', new FormControl({}));
      this.yaml = dump(currPvc);
      return;
    }

    // In both empty and Rok we will have an initial empty PVC definition
    this.volGroup.setControl('newPvc', createNewPvcFormGroup());

    if (type === NEW_VOLUME_TYPE.EMPTY) {
      return;
    }

    // Add annotations for Rok snapshot
    const meta = this.volGroup.get('newPvc.metadata') as FormGroup;
    setGenerateNameCtrl(meta);
    const annotations = new FormGroup({
      'rok/origin': new FormControl(
        '',
        [Validators.required],
        [rokUrlValidator(this.rok)],
      ),
    });

    meta.addControl('annotations', annotations);

    // set storage class to be rok
    this.volGroup.get('newPvc.spec.storageClassName').enable();
    this.volGroup.get('newPvc.spec.storageClassName').setValue('rok');
  }
}
