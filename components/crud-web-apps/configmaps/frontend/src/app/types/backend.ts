import { Status, BackendResponse } from 'kubeflow';

export interface CMWABackendResponse extends BackendResponse {
  configMaps?: ConfigMapResponseObject[];
}

export interface ConfigMapResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  name: string;
  namespace: string;
  labels: Map<String, Object>;
  annotations:  Map<String, Object>;
  status: Status;
  data:  Map<String, Object>;
}

export interface ConfigMapProcessedObject extends ConfigMapResponseObject {
  deleteAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface ConfigMapPostObject {
  name: string;
  labels: Map<String, Object>;
  annotations: Map<String, Object>;
  data: Map<String, Object>;
}
