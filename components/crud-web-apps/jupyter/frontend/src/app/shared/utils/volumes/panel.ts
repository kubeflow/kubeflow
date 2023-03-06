import { V1PersistentVolumeClaim, V1Volume } from '@kubernetes/client-node';
import { EXISTING_SOURCE, NEW_VOLUME_TYPE, Volume } from 'src/app/types/volume';

/*
 * Panel helpers
 */
function getVolumeType(pvc: V1PersistentVolumeClaim): NEW_VOLUME_TYPE {
  // Custom is if we have specific fields in the PVC
  if (pvc.spec.dataSource) {
    return NEW_VOLUME_TYPE.CUSTOM;
  }

  if (pvc.spec.selector) {
    return NEW_VOLUME_TYPE.CUSTOM;
  }

  if (pvc.spec.volumeName) {
    return NEW_VOLUME_TYPE.CUSTOM;
  }

  return NEW_VOLUME_TYPE.EMPTY;
}

export function getVolumeTitle(vol: Volume) {
  return vol.existingSource ? 'Existing volume' : 'New volume';
}

export function getVolumeName(vol: Volume): string {
  if (!vol) {
    return '';
  }

  let name = '';

  // for existingSource we either show the selected PVC name, in case of PVC or
  // a `Custom (Advanced)` in any other case
  if (vol.existingSource) {
    const source = vol.existingSource;
    if (!source.persistentVolumeClaim) {
      return 'Custom (Advanced)';
    }

    name = source.persistentVolumeClaim.claimName;
    if (!name) {
      return '';
    }

    return name;
  }

  if (vol?.newPvc?.metadata) {
    const pvc = vol.newPvc;

    // calculate name to show, based also on generateName
    name = pvc.metadata.name;
    if (pvc.metadata.generateName) {
      name = `${pvc.metadata.generateName}<suffix>`;
    }

    return name;
  }

  return '';
}

export function getNewVolumeSize(vol: Volume): string {
  if (!vol?.newPvc?.spec?.resources?.requests?.storage) {
    return '';
  }

  return vol?.newPvc?.spec?.resources?.requests?.storage;
}

export function getNewVolumeType(vol: Volume): string {
  return getVolumeType(vol.newPvc);
}

export function getVolumeDesc(vol: Volume) {
  if (vol.existingSource) {
    return getExistingVolumeDesc(vol);
  }

  return getNewVolumeDesc(vol);
}

function getExistingVolumeDesc(vol: Volume): string {
  if (!vol.existingSource) {
    return '';
  }

  const source = vol.existingSource;
  if (!source.persistentVolumeClaim) {
    return 'Custom (Advanced)';
  }

  const name = source.persistentVolumeClaim.claimName;
  if (!name) {
    return '';
  }

  return name;
}

function getNewVolumeDesc(vol: Volume): string {
  const values: string[] = [];
  const pvc = vol.newPvc;

  // calculate name to show, based also on generateName
  let name = pvc.metadata.name;
  if (pvc.metadata.generateName) {
    name = `${pvc.metadata.generateName}<suffix>`;
  }
  values.push(name);

  // append the Data Source
  values.push(getVolumeType(pvc));

  // append the volume size
  values.push(pvc.spec.resources.requests.storage);

  return values.join(', ');
}
