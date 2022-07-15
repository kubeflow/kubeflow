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
  labels:  Map<String, Object>;
  annotations:  Map<String, Object>;
  status: Status;
  desc: string;
  envs: [];
  volumeMounts: [];
  volumes: [];
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
}

export interface SecretResponseObject {
  name: string;
  namespace: string;
  data: Map<string,string>;
}

export interface SWABackendResponse extends BackendResponse {
  secrets?: SecretResponseObject[];
}
