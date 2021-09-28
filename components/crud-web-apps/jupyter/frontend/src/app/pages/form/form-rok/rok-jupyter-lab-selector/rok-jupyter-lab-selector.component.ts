import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@app/environment';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  rokUrlValidator,
  RokService,
  SnackBarService,
  SnackType,
} from 'kubeflow';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {
  getJupyterLabMetaFromRokURL,
  setLabValues,
  getVolumeMetadataFromRokURL,
  updateVolumeFormGroupWithRokMetadata,
} from '../utils';

@Component({
  selector: 'app-rok-jupyter-lab-selector',
  templateUrl: './rok-jupyter-lab-selector.component.html',
  styleUrls: ['./rok-jupyter-lab-selector.component.scss'],
})
export class RokJupyterLabSelectorComponent implements OnInit {
  @Input() parentForm: FormGroup;

  env = environment;
  ctrl = new FormControl('', [], [rokUrlValidator(this.rok)]);

  constructor(public rok: RokService, public popup: SnackBarService) {}

  ngOnInit() {}

  labAutofillClicked(url: string) {
    getJupyterLabMetaFromRokURL(url, this.rok).subscribe(lab => {
      setLabValues(lab, this.parentForm);
      const rokOrigin = 'newPvc.metadata.annotations.rok/origin';

      // Autofill the workspace volume
      const workspace = this.parentForm.get('workspace') as FormGroup;
      const wsUrl = workspace.get(rokOrigin).value;
      getVolumeMetadataFromRokURL(wsUrl, this.rok).subscribe(metadata => {
        updateVolumeFormGroupWithRokMetadata(metadata, workspace);
      });

      // Autofill the data volumes
      const dataVols = this.parentForm.get('datavols') as FormArray;
      const controls = dataVols.controls as FormGroup[];
      for (const volCtrl of controls) {
        const volUrl = volCtrl.get(rokOrigin).value;
        getVolumeMetadataFromRokURL(volUrl, this.rok).subscribe(metadata => {
          updateVolumeFormGroupWithRokMetadata(metadata, volCtrl);
        });
      }

      this.popup.open(
        'Successfully retrieved details from Rok Jupyter Lab URL',
        SnackType.Success,
        4000,
      );
    });
  }
}
