import { Volume } from 'src/app/types';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {
  RokService,
  updateNonDirtyControl,
  updateControlNonNullValue,
} from 'kubeflow';
import { JupyterLabMetadata, RokVolumeSnapshotMetadata } from './types';
import {
  createExistingSourceFormGroup,
  createExistingVolumeFormGroup,
  createNewPvcFormGroup,
  createNewPvcVolumeFormGroup,
  setGenerateNameCtrl,
} from 'src/app/shared/utils/volumes';

// Functions to create Autofilled Rok Objects
export function getJupyterLabMetaFromRokURL(
  url: string,
  rok: RokService,
): Observable<JupyterLabMetadata> {
  return rok.getObjectMetadata(url).pipe(
    map((headers: HttpHeaders) => {
      const notebook: JupyterLabMetadata = {};

      // Fill the notebook with the info from the response
      notebook.namespace = headers.get('X-Object-Meta-namespace');
      notebook.image = headers.get('X-Object-Meta-image');

      // Convert CPU to number
      notebook.cpu = headers.get('X-Object-Meta-cpu');
      if (typeof notebook.cpu === 'number') {
      } else if (notebook.cpu.includes('m')) {
        const cpu = parseInt(notebook.cpu.replace('m', ''), 10);
        notebook.cpu = cpu / 1000;
      }

      // Convert memory to Gi
      const memory = headers.get('X-Object-Meta-memory');
      if (memory.includes('G')) {
        notebook.memory = parseInt(memory.replace('G', ''), 10);
      } else if (memory.includes('M')) {
        notebook.memory = parseInt(memory.replace('M', ''), 10) / 1000;
      } else {
        notebook.memory = parseInt(memory, 10);
      }

      notebook.environment = headers.get('X-Object-Meta-environment');

      // Workspace Volume
      const workspaceRokUrl = headers.get('X-Object-Group-Member-0-URL');
      if (workspaceRokUrl) {
        notebook.workspaceUrl = workspaceRokUrl;
      }

      // Data Volumes
      const volsNum = headers.get('X-Object-Group-Member-Count');
      if (!volsNum) {
        return notebook;
      }

      notebook.datavolsUrls = [];
      for (let i = 1; i < parseInt(volsNum, 10); i++) {
        const volRokUrl = headers.get('X-Object-Group-Member-' + i + '-URL');

        notebook.datavolsUrls.push(volRokUrl);
      }

      return notebook;
    }),
  );
}

export function getVolumeMetadataFromRokURL(
  url: string,
  rok: RokService,
): Observable<RokVolumeSnapshotMetadata> {
  return rok.getObjectMetadata(url).pipe(
    map((headers: HttpHeaders) => {
      console.log(`Creating volume object from fetched metadata`);

      const volume: RokVolumeSnapshotMetadata = {};

      // Fill the notebook with the info from the response
      volume.name =
        headers.get('X-Object-Meta-workspace') ||
        headers.get('X-Object-Meta-dataset') ||
        headers.get('x-object-meta-pvc');
      volume.name = `${volume.name}-`;

      const size = parseInt(headers.get('Content-Length'), 10);
      volume.size = `${size / Math.pow(1024, 3)}Gi`;

      volume.path = headers.get('X-Object-Meta-mountpoint');

      return volume;
    }),
  );
}

// Functions for autofilling control values
export function setLabValues(lab: JupyterLabMetadata, formCtrl: FormGroup) {
  console.log(
    `Setting Jupyter Lab form values based on object: ${JSON.stringify(lab)}`,
  );

  formCtrl.get('customImage').setValue(lab.image);
  formCtrl.get('customImageCheck').setValue(true);
  formCtrl.get('customImage').markAsDirty();

  formCtrl.get('cpu').setValue(lab.cpu, { emitEvent: false });
  formCtrl.get('cpuLimit').setValue(null);
  formCtrl.get('cpu').markAsDirty();

  formCtrl.get('memory').setValue(lab.memory, { emitEvent: false });
  formCtrl.get('memoryLimit').setValue(null);
  formCtrl.get('memory').markAsDirty();

  // Change env only if it exists
  if (lab.environment !== null) {
    formCtrl.get('environment').setValue(lab.environment);
    formCtrl.get('environment').markAsDirty();
  }

  // Clear the existing Data Volumes array
  const dataVols = formCtrl.get('datavols') as FormArray;
  dataVols.clear();

  for (const url of lab.datavolsUrls) {
    const volGroup = createNewPvcVolumeFormGroup();
    updateVolumeFormGroupWithRokUrl(lab.workspaceUrl, volGroup);
  }

  // update the workspace volume
  const workspace = createNewPvcVolumeFormGroup();
  formCtrl.removeControl('workspace');
  formCtrl.addControl('workspace', workspace);
  updateVolumeFormGroupWithRokUrl(lab.workspaceUrl, workspace);

  // update data volumes
  const dataVolsArray = formCtrl.get('datavols') as FormArray;
  dataVolsArray.clear();
  for (const url of lab.datavolsUrls) {
    const volGroup = createNewPvcVolumeFormGroup();
    updateVolumeFormGroupWithRokUrl(url, volGroup);
    dataVolsArray.push(volGroup);
  }
}

export function updateVolumeFormGroupWithRokUrl(
  url: string,
  volume: FormGroup,
) {
  // If Volume was existing source then it will need to change to New PVC
  if (volume.get('existingSource')) {
    volume.removeControl('existingSource');
    volume.addControl('newPvc', createNewPvcFormGroup());
  }

  // ensure the PVC's metadata has annotations
  const metadataGroup = volume.get('newPvc.metadata') as FormGroup;
  if (!metadataGroup.get('annotations')) {
    metadataGroup.addControl('annotations', new FormGroup({}));
  }

  // add rok/origin with Snapshot URL
  const annotationsGroup = metadataGroup.get('annotations') as FormGroup;
  annotationsGroup.addControl(
    'rok/origin',
    new FormControl(url, [Validators.required]),
  );
}

export function updateVolumeFormGroupWithRokMetadata(
  metadata: RokVolumeSnapshotMetadata,
  volume: FormGroup,
) {
  volume.get('mount').setValue(metadata.path);

  // set the size
  volume.get('newPvc.spec.resources.requests.storage').setValue(metadata.size);

  // ensure the new PVC has generateName set, and not name
  const meta = volume.get('newPvc.metadata') as FormGroup;
  setGenerateNameCtrl(meta, metadata.name);
  meta.get('generateName').markAsDirty();

  volume.get('newPvc.spec.storageClassName').enable();
  volume.get('newPvc.spec.storageClassName').setValue('rok');
}
