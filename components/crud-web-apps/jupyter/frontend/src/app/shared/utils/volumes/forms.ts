import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { V1PersistentVolumeClaim, V1Volume } from '@kubernetes/client-node';
import { EXISTING_SOURCE, Volume } from 'src/app/types';

/*
 * Form Group helpers
 */
export function setGenerateNameCtrl(meta: FormGroup, name = '') {
  if (meta.get('generateName')) {
    if (name) {
      meta.get('generateName').setValue(name);
    }

    return;
  }

  // remove the name control, if it exists, but carry over its value
  if (meta.get('name')) {
    if (!name) {
      name = meta.get('name').value;
    }

    meta.removeControl('name');
  }

  meta.addControl('generateName', new FormControl(name, [Validators.required]));
}

// For volume.existingSource
export function createSourceFormGroup(
  source: EXISTING_SOURCE,
): AbstractControl {
  switch (source) {
    case EXISTING_SOURCE.PERSISTENT_VOLUME_CLAIM: {
      return createPvcFormGroup();
    }
    default: {
      return createGenericSourceFormGroup(source);
    }
  }
}

// For volume.existingSource
// In this case the user will type a yaml to fill the spec
export function createGenericSourceFormGroup(
  source: EXISTING_SOURCE,
): AbstractControl {
  return new FormControl('', []);
}

// for volume.existingSource.persistentVolumeClaim
export function createPvcFormGroup(): FormGroup {
  return new FormGroup({
    readOnly: new FormControl(false, []),
    claimName: new FormControl('', [Validators.required]),
  });
}

// for volume.existingSource
export function createExistingSourceFormGroup(): FormGroup {
  return new FormGroup({
    persistentVolumeClaim: createPvcFormGroup(),
  });
}

// for volume.newPvc
export function createNewPvcFormGroup(
  name = '{notebook-name}-volume',
): FormGroup {
  return new FormGroup({
    metadata: new FormGroup({
      name: new FormControl(name, Validators.required),
    }),
    spec: new FormGroup({
      accessModes: new FormControl(['ReadWriteOnce']),
      resources: new FormGroup({
        requests: new FormGroup({
          storage: new FormControl('5Gi', []),
        }),
      }),
      storageClassName: new FormControl({
        value: '',
        disabled: true,
      }),
    }),
  });
}

// For volume
export function createNewPvcVolumeFormGroup(
  name = '{notebook-name}-volume',
): FormGroup {
  return new FormGroup({
    name: new FormControl('', []),
    mount: new FormControl('', Validators.required),
    newPvc: createNewPvcFormGroup(name),
  });
}

// For volume
export function createExistingVolumeFormGroup(): FormGroup {
  return new FormGroup({
    name: new FormControl('', []),
    mount: new FormControl('', Validators.required),
    existingSource: createExistingSourceFormGroup(),
  });
}

/*
 * Create Form Groups from JS ojects
 */
export function createMetadataFormGroupFromPvc(
  pvc: V1PersistentVolumeClaim,
): FormGroup {
  const metadata = pvc.metadata;

  const group = new FormGroup({});

  if (metadata.name) {
    group.addControl(
      'name',
      new FormControl(metadata.name, Validators.required),
    );
  }

  if (metadata.generateName) {
    group.addControl(
      'generateName',
      new FormControl(metadata.generateName, Validators.required),
    );
  }

  if (metadata.annotations) {
    group.addControl('annotations', new FormGroup({}));

    const annotationsGroup = group.get('annotations') as FormGroup;
    for (const [key, val] of Object.entries(metadata.annotations)) {
      annotationsGroup.addControl(key, new FormControl(val, []));
    }
  }

  if (metadata.labels) {
    group.addControl('labels', new FormGroup({}));

    const labelsGroup = group.get('labels') as FormGroup;
    for (const [key, val] of Object.entries(metadata.labels)) {
      labelsGroup.addControl(key, new FormControl(val, []));
    }
  }

  return group;
}

export function createPvcSpecFormGroupFromPvc(
  pvc: V1PersistentVolumeClaim,
): FormGroup {
  const spec = pvc.spec;

  const group = new FormGroup({
    accessModes: new FormControl(spec.accessModes),
    resources: new FormGroup({
      requests: new FormGroup({
        storage: new FormControl(spec.resources.requests.storage),
      }),
    }),
    storageClassName: new FormControl({
      value: spec.storageClassName,
      disabled: !spec.storageClassName,
    }),
  });

  return group;
}

export function createExistingSourceFormGroupFromVolume(
  volume: V1Volume,
): FormGroup {
  // only PVC is currently implemented in the UI
  if (volume.persistentVolumeClaim) {
    return new FormGroup({
      persistentVolumeClaim: new FormGroup({
        claimName: new FormControl(volume.persistentVolumeClaim.claimName, [
          Validators.required,
        ]),
        readOnly: new FormControl(volume.persistentVolumeClaim.readOnly),
      }),
    });
  }

  // create generic form control for all other options
  // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#volume-v1-core
  const group = new FormGroup({});
  for (const [key, val] of Object.entries(volume)) {
    group.addControl(key, new FormControl(val));
  }

  return group;
}

export function createNewPvcFormGroupFromVolume(
  pvc: V1PersistentVolumeClaim,
): FormGroup {
  return new FormGroup({
    metadata: createMetadataFormGroupFromPvc(pvc),
    spec: createPvcSpecFormGroupFromPvc(pvc),
  });
}

export function createFormGroupFromVolume(volume: Volume): FormGroup {
  const group = new FormGroup({
    mount: new FormControl(volume.mount, [Validators.required]),
  });

  if (volume.newPvc) {
    group.addControl('newPvc', createNewPvcFormGroupFromVolume(volume.newPvc));

    return group;
  }

  group.addControl(
    'existingSource',
    createExistingSourceFormGroupFromVolume(volume.existingSource),
  );

  return group;
}
