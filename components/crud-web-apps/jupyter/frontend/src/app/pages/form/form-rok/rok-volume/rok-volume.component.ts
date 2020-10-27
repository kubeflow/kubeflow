import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, debounceTime, map } from 'rxjs/operators';
import { Volume, emptyVolume } from 'src/app/types';
import { RokService, rokUrlValidator, updateNonDirtyControl } from 'kubeflow';
import { environment } from '@app/environment';
import { HttpHeaders } from '@angular/common/http';
import { getVolumeFromRokURL, setVolumeValues } from '../utils';

@Component({
  selector: 'app-rok-volume',
  templateUrl: './rok-volume.component.html',
  styleUrls: ['./rok-volume.component.scss'],
})
export class RokVolumeComponent implements OnInit, OnDestroy {
  private nbName = '';
  private origin = window.location.origin;
  private chooserId;
  private popupChooser;

  env = environment;
  newPVC: Volume;
  existingPVCs: Volume[] = [];
  readOnly = false;
  subscriptions = new Subscription();

  // ----- @Input Parameters -----
  @Input() volume: FormGroup;

  @Input()
  get notebookName() {
    return this.nbName;
  }
  set notebookName(nm: string) {
    if (!this.volume.disabled) {
      this.notebookNameChanged(nm);
    }
  }

  @Input()
  set ephemeral(b: boolean) {
    if (!this.volume.disabled) {
      this.storageOptionChanged(b);
    }
  }

  @Input() pvcs: Volume[];
  @Input() namespace: string;
  @Input() storageClasses: string[] = [];
  @Input() token: string;

  // ----- Get macros -----
  get selectedVolIsExistingType(): boolean {
    return this.volume.value.type === 'Existing';
  }

  get currentVolName(): string {
    // Change volume name on notebook-name change, if user hasn't changed it already
    if (!this.volume.get('name').dirty) {
      return this.volume
        .get('templatedName')
        .value.replace('{notebook-name}', this.notebookName || '');
    } else {
      return this.volume.get('name').value;
    }
  }

  // ----- utility functions -----
  updateVolPath(): void {
    // Change volume path on volume-name change, if user hasn't changed it already
    updateNonDirtyControl(
      this.volume.get('path'),
      this.volume
        .get('templatedPath')
        .value.replace('{volume-name}', this.currentVolName),
    );
  }

  updateVolType(type): void {
    const rokUrl = this.volume.get('extraFields.rokUrl');
    if (type === 'Existing') {
      // Enable rokUrl
      rokUrl.setValidators(Validators.required);
      rokUrl.setAsyncValidators(rokUrlValidator(this.rok));
      rokUrl.enable();
    } else {
      rokUrl.setValidators([]);
      rokUrl.setAsyncValidators([]);
      rokUrl.disable();
    }
  }

  autofillVolume(url: string) {
    getVolumeFromRokURL(url, this.rok).subscribe(vol => {
      setVolumeValues(vol, this.volume);
    });
  }

  // ----- Component Functions -----
  constructor(private rok: RokService) {}

  ngOnInit() {
    // type
    this.subscriptions.add(
      this.volume.get('type').valueChanges.subscribe((type: string) => {
        this.updateVolType(type);
      }),
    );
    // name
    this.subscriptions.add(
      this.volume.get('name').valueChanges.subscribe((name: string) => {
        this.volume.get('name').setValue(name, { emitEvent: false });
        // Fix mount point if user hasn't changed it and it's not workspace volume
        this.updateVolPath();
      }),
    );

    this.updateVolPath();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // ----- @Input change handling functions -----
  notebookNameChanged(nm: string): void {
    if (this.volume.disabled) {
      return;
    }

    this.nbName = nm;
    setTimeout(() => {
      updateNonDirtyControl(this.volume.get('name'), this.currentVolName);
    });
  }

  storageOptionChanged(ephemeral: boolean): void {
    if (ephemeral) {
      // Disable all fields
      this.volume.controls.type.disable();
      this.volume.controls.extraFields.get('rokUrl').disable();
      this.volume.controls.name.disable();
      this.volume.controls.size.disable();
      this.volume.controls.mode.disable();
    } else if (!ephemeral && !this.selectedVolIsExistingType) {
      // New
      this.volume.controls.type.enable();
      this.volume.controls.name.enable();
      this.volume.controls.size.enable();
      this.volume.controls.mode.enable();
      this.volume.controls.extraFields.get('rokUrl').disable();
    } else {
      // Existing
      this.volume.controls.extraFields.get('rokUrl').enable();
    }
  }
}
