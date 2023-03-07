import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dump } from 'js-yaml';
import { parseYAML } from 'src/app/shared/utils/yaml';
import { NEW_VOLUME_TYPE } from 'src/app/types';
import { createNewPvcFormGroup } from 'src/app/shared/utils/volumes';
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

  constructor() {}

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

    // Have an initial empty PVC definition in case of empty type
    this.volGroup.setControl('newPvc', createNewPvcFormGroup());

    if (type === NEW_VOLUME_TYPE.EMPTY) {
      return;
    }
  }
}
