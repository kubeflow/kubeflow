import {
  V1EnvFromSource,
  V1EnvVar,
  V1LabelSelector,
  V1ObjectMeta,
  V1Toleration,
  V1Volume,
  V1VolumeMount,
} from '@kubernetes/client-node';

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
