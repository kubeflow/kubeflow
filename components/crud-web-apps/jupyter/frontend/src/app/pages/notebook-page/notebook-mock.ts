import {
  V1ContainerState,
  V1ObjectMeta,
  V1PodSpec,
} from '@kubernetes/client-node';
import { STATUS_TYPE } from 'kubeflow';
import { Condition } from 'src/app/types/condition';
import { NotebookRawObject } from 'src/app/types/notebook';

const metadataObject: V1ObjectMeta = {
  annotations: {
    'notebooks.kubeflow.org/http-headers-request-set':
      '{"X-RStudio-Root-Path":"/notebook/kubeflow-user/asa232rstudio/"}',
    'notebooks.kubeflow.org/http-rewrite-uri': '/',
    'notebooks.kubeflow.org/last-activity': '2022-08-09T15:55:44Z',
    'notebooks.kubeflow.org/server-type': 'group-two',
  },
  creationTimestamp: new Date('2022-07-08T09:53:26Z'),
  generation: 2,
  labels: {
    app: 'asa232rstudio',
  },
  name: 'asa232rstudio',
  namespace: 'kubeflow-user',
  resourceVersion: '38098090',
  selfLink:
    '/apis/kubeflow.org/v1beta1/namespaces/kubeflow-user/notebooks/asa232rstudio',
  uid: '84039fed-3a47-482b-9b04-817456d1d751',
};

const innerSpecObject: V1PodSpec = {
  containers: [
    {
      image:
        'public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse:master-e9324d39',
      imagePullPolicy: 'IfNotPresent',
      name: 'asa232rstudio',
      resources: {
        requests: {
          cpu: '500m',
          memory: '1Gi',
        },
      },
      volumeMounts: [
        { mountPath: '/dev/shm', name: 'dshm' },
        { mountPath: '/home/jovyan', name: 'asa232rstudio-workspace' },
      ],
    },
  ],
  serviceAccountName: 'default-editor',
  volumes: [
    {
      emptyDir: {
        medium: 'Memory',
      },
      name: 'dshm',
    },
    {
      name: 'asa232rstudio-workspace',
      persistentVolumeClaim: {
        claimName: 'asa232rstudio-workspace',
      },
    },
  ],
};

const specObject = {
  template: {
    spec: innerSpecObject,
  },
};

const conditionsObject: Condition[] = [
  { lastProbeTime: '2022-08-10T07:19:14Z', type: 'Running' },
  {
    lastProbeTime: '2022-08-10T07:17:42Z',
    message: 'Completed',
    reason: 'Completed',
    type: 'Terminated',
  },
  { lastProbeTime: '2022-08-09T15:55:50Z', type: 'Running' },
];

const containerStateObject: V1ContainerState = {
  running: {
    startedAt: new Date('2022-08-10T07:19:10Z'),
  },
};

const statusObject = {
  conditions: conditionsObject,
  containerState: containerStateObject,
  readyReplicas: 1,
};

const statusProcessedObject = {
  phase: STATUS_TYPE.READY,
  state: '',
  message: 'Running',
};

export const mockNotebook: NotebookRawObject = {
  apiVersion: 'kubeflow.org/v1beta1',
  kind: 'Notebook',
  metadata: metadataObject,
  spec: specObject,
  status: statusObject,
  processed_status: statusProcessedObject,
};
