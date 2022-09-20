import { BackendResponse } from 'kubeflow';
import { Config } from './config';
import { NotebookResponseObject } from './notebook';
import { PodDefault } from './poddefault';
import { PvcResponseObject } from './volume';

export interface JWABackendResponse extends BackendResponse {
  notebooks?: NotebookResponseObject[];
  pvcs?: PvcResponseObject[];
  config?: Config;
  poddefaults?: PodDefault[];
  vendors?: string[];
}
