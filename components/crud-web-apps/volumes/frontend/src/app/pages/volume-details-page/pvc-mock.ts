import { V1PersistentVolumeClaim } from '@kubernetes/client-node';

export const mockPvc: V1PersistentVolumeClaim = {
  metadata: {
    annotations: {
      'pv.kubernetes.io/bind-completed': 'yes',
      'pv.kubernetes.io/bound-by-controller': 'yes',
      'volume.kubernetes.io/selected-node': 'orfeas-minikf-dev',
    },
    creationTimestamp: new Date('2022-04-14T12:06:32+00:00'),
    finalizers: ['kubernetes.io/pvc-protection'],
    name: 'serving-openvaccine-0-486kc-pvc-prwfw',
    namespace: 'kubeflow-user',
    ownerReferences: [
      {
        apiVersion: 'serving.kubeflow.org/v1alpha2',
        kind: 'InferenceService',
        name: 'serving-openvaccine-0-486kc',
        uid: 'cdd690e7-dd3d-4b4c-aef0-62c7288153e6',
      },
    ],
    resourceVersion: '1313985',
    selfLink:
      '/api/v1/namespaces/kubeflow-user/persistentvolumeclaims/serving-openvaccine-0-486kc-pvc-prwfw',
    uid: '5e04e9c4-8f59-4afa-bf9a-eb13b1b247af',
  },
  spec: {
    accessModes: ['ReadWriteOnce'],
    resources: {
      requests: {
        storage: '5Gi',
      },
    },
    storageClassName: '',
    volumeMode: 'Filesystem',
    volumeName: 'pvc-5e04e9c4-8f59-4afa-bf9a-eb13b1b247af',
  },
  status: {
    accessModes: ['ReadWriteOnce'],
    capacity: {
      storage: '5Gi',
    },
    phase: 'Bound',
  },
};
