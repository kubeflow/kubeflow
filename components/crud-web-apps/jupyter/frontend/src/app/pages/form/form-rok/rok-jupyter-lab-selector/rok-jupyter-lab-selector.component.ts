import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@app/environment';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  rokUrlValidator,
  RokService,
  SnackBarService,
  SnackType,
} from 'kubeflow';
import { JupyterLab, emptyJupyterLab } from '../types';
import { emptyVolume, Volume } from 'src/app/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {
  addRokDataVolume,
  getJupyterLabFromRokURL,
  setLabValues,
  setVolumeValues,
  getVolumeFromRokURL,
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
    getJupyterLabFromRokURL(url, this.rok).subscribe(lab => {
      setLabValues(lab, this.parentForm);

      // Autofill the workspace volume
      const wsUrl = this.parentForm.get('workspace.extraFields.rokUrl').value;
      getVolumeFromRokURL(wsUrl, this.rok).subscribe(vol => {
        setVolumeValues(vol, this.parentForm.get('workspace'));
      });

      // Autofill the data volumes
      const dataVols = this.parentForm.get('datavols') as FormArray;
      for (const volCtrl of dataVols.controls) {
        const volUrl = volCtrl.get('extraFields.rokUrl').value;
        getVolumeFromRokURL(volUrl, this.rok).subscribe(vol => {
          setVolumeValues(vol, volCtrl);
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
