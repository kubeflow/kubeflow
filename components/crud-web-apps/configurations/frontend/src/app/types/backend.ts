import { Status, BackendResponse } from 'kubeflow';

export interface VWABackendResponse extends BackendResponse {
  configurations?: ConfigResponseObject[];
}

export interface ConfigResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  name: string;
  namespace: string;
  labels: string;
  annotations: string;
  status: Status;
  desc: string;
  env: [];
  volumes: [];
  volumeMounts: [];
}

export interface ConfigProcessedObject extends ConfigResponseObject {
  deleteAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface ConfigPostObject {
  name: string;
  labels: Map<String, Object>;
  annotations: Map<String, Object>;
  desc: string;
  env: [];
  volumes: [];
  volumeMounts: [];
}
