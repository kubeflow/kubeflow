import { V1PersistentVolumeClaim, V1Volume } from '@kubernetes/client-node';

export interface PvcResponseObject {
  name: string;
  size: string;
  mode: string;
}

export interface Volume {
  name: string;
  mount: string;
  newPvc?: V1PersistentVolumeClaim;
  existingSource?: V1Volume;
}
