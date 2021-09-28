import { Status } from 'kubeflow';
import { PodDefault } from './poddefault';
import { GPU } from './gpu';

export type ServerType = 'jupyter' | 'group-one' | 'group-two';

export interface NotebookResponseObject {
  name: string;
  namespace: string;
  serverType: ServerType;
  status: Status;
  reason: string;
  age: string;
  image: string;
  volumes: string[];
  cpu: string;
  memory: string;
  gpus: {
    count: number;
    message: string;
  };
  environment: string;
  shortImage: string;
}

export interface NotebookProcessedObject extends NotebookResponseObject {
  deleteAction?: string;
  connectAction?: string;
  startStopAction?: string;
}

export interface NotebookFormObject {
  name: string;
  namespace: string;
  image: string;
  imageGroupOne: string;
  imageGroupTwo: string;
  allowCustomImage: boolean;
  imagePullPolicy: string;
  customImage?: string;
  customImageCheck: boolean;
  serverType: string;
  cpu: number | string;
  cpuLimit: number | string;
  memory: number | string;
  memoryLimit: number | string;
  gpus: GPU;
  environment?: string;
  noWorkspace: boolean;
  workspace: any;
  datavols: any[];
  shm: boolean;
  configurations: PodDefault[];
}
