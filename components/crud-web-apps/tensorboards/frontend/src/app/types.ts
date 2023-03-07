import { Status, BackendResponse } from 'kubeflow';

import {
  V1EnvFromSource,
  V1EnvVar,
  V1LabelSelector,
  V1ObjectMeta,
  V1Toleration,
  V1Volume,
  V1VolumeMount,
} from '@kubernetes/client-node';

export interface TWABackendResponse extends BackendResponse {
  tensorboards?: TensorboardResponseObject[];
  pvcs?: string[];
  poddefaults?: PodDefault[];
}

export interface TensorboardResponseObject {
  age: {
    uptime: string;
    timestamp: string;
  };
  logspath: string;
  name: string;
  namespace: string;
  status?: Status;
}

export interface TensorboardProcessedObject extends TensorboardResponseObject {
  deleteAction?: string;
  connectAction?: string;
  editAction?: string;
  ageValue?: string;
  ageTooltip?: string;
}

export interface TensorboardPostObject {
  name: string;
  logspath: string;
  configurations: PodDefault[];
}

export interface PodDefault {
  label?: string;
  desc?: string;
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: PodDefaultSpec;
}

export interface PodDefaultSpec {
  annotations?: { [key: string]: string };
  labels?: Record<string, string>;

  automountServiceAccountToken?: boolean;
  desc?: string;
  env?: Array<V1EnvVar>;
  envFrom?: Array<V1EnvFromSource>;
  selector: V1LabelSelector;
  serviceAccountName?: string;
  volumeMounts?: Array<V1VolumeMount>;
  volumes?: Array<V1Volume>;
  tolerations?: Array<V1Toleration>;
}
