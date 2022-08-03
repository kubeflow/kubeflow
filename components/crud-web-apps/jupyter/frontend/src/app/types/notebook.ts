import { Status } from 'kubeflow';
import { PodDefault } from './poddefault';
import { GPU } from './gpu';
import {
  V1ContainerState,
  V1ObjectMeta,
  V1PodSpec,
} from '@kubernetes/client-node';
import { Condition } from './condition';

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
  gpus?: GPU;
  environment?: string;
  noWorkspace: boolean;
  workspace: any;
  datavols: any[];
  shm: boolean;
  configurations: PodDefault[];
}

export interface NotebookRawObject {
  apiVersion: string;
  kind: string;
  metadata: V1ObjectMeta;
  spec: {
    template: {
      spec: V1PodSpec;
    };
  };
  status: {
    conditions: Condition[];
    containerState: V1ContainerState;
    readyReplicas: number;
  };
}
