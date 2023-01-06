import { V1PersistentVolumeClaim, V1Pod } from '@kubernetes/client-node';
import { Status, BackendResponse, STATUS_TYPE } from 'kubeflow';
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
  viewer: {
    status: STATUS_TYPE;
    url: string;
  };
}

export interface PVCProcessedObject extends PVCResponseObject {
  deleteAction?: string;
  closeViewerAction?: string;
  openViewerAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface PVCPostObject {
  name: string;
  type: string;
  size: string | number;
  class: string;
  mode: string;
  snapshot: string;
}
