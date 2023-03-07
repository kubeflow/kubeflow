import { V1Pod } from '@kubernetes/client-node';
import { BackendResponse } from 'kubeflow';
import { Config } from './config';
import { EventObject } from './event';
import { NotebookRawObject, NotebookResponseObject } from './notebook';
import { PodDefault } from './poddefault';
import { PvcResponseObject } from './volume';

export interface JWABackendResponse extends BackendResponse {
  notebook?: NotebookRawObject;
  notebooks?: NotebookResponseObject[];
  logs: string[];
  pvcs?: PvcResponseObject[];
  config?: Config;
  poddefaults?: PodDefault[];
  vendors?: string[];
  pod?: V1Pod;
  events?: EventObject[];
}
