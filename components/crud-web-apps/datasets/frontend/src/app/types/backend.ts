import { Status, BackendResponse } from 'kubeflow';

export interface VWABackendResponse extends BackendResponse {
  datasets?: AccelerateDatasetResponseObject[];
}

export interface AccelerateDatasetResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  name: string;
  namespace: string;
  status: Status;
  bucket: string;
  storage: string;
  mountPoint: string;
  mediumType: string;
  path: string;
  quotaSize: string;
}

export interface AccelerateDatasetProcessedObject extends AccelerateDatasetResponseObject {
  deleteAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface AccelerateDatasetPostObject {
  name: string;
  bucket: string;
  storage: string;
  mountPoint: string;
  mediumType: string;
  path: string;
  quotaSize: string;
}
