import { Params } from '@angular/router';
import { V1PersistentVolumeClaim, V1Pod } from '@kubernetes/client-node';
import { Status, BackendResponse } from 'kubeflow';
import { EventObject } from './event';

export interface VWABackendResponse extends BackendResponse {
  pvcs?: PVCResponseObject[];
  pvc?: V1PersistentVolumeClaim;
  events?: EventObject[];
  pods?: V1Pod[];
}

export interface PVCResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  capacity: string;
  class: string;
  modes: string[];
  name: string;
  namespace: string;
  status: Status;
  notebooks: string[];
}

export interface PVCProcessedObject extends PVCResponseObject {
  deleteAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
  link: {
    text: string;
    url: string;
    queryParams?: Params | null;
  };
}

export interface PVCPostObject {
  name: string;
  type: string;
  size: string | number;
  class: string;
  mode: string;
  snapshot: string;
}
