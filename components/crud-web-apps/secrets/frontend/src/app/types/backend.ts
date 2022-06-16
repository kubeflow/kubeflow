import { Status, BackendResponse } from 'kubeflow';

export interface VWABackendResponse extends BackendResponse {
  secrets?: SecretResponseObject[];
}

export interface SecretResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  name: string;
  namespace: string;
  labels: string;
  annotations: string;
  status: Status;
  type?: string;
  data?: Map<String, Object>;
}

export interface SecretProcessedObject extends SecretResponseObject {
  deleteAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface SecretPostObject {
  name: string;
  type: string;
  labels: Map<String, Object>;
  annotations: Map<String, Object>;
  data: Map<String, Object>;
}
