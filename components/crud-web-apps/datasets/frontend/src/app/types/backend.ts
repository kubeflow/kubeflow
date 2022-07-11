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
  metaurl_key: string; 
  metaurl_name: string; 
  access_key_name: string; 
  access_key: string; 
  secret_key: string; 
  secret_key_name: string;
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
  metaurl_key: string; 
  metaurl_name: string; 
  access_key_name: string; 
  access_key: string; 
  secret_key: string; 
  secret_key_name: string;
}

export interface SecretResponseObject {
  name: string;
  namespace: string;
  data: Map<string,string>;
}

export interface SWABackendResponse extends BackendResponse {
  secrets?: SecretResponseObject[];
}
