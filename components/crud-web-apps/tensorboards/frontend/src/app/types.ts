import { Status, BackendResponse } from 'kubeflow';

export interface TWABackendResponse extends BackendResponse {
  tensorboards?: TensorboardResponseObject[];
  pvcs?: string[];
}

export interface TensorboardResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  logspath: string;
  name: string;
  namespace: string;
  status?: Status;
}

export interface TensorboardProcessedObject extends TensorboardResponseObject {
  deleteAction?: string;
  connectAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface TensorboardPostObject {
  name: string;
  logspath: string;
}
