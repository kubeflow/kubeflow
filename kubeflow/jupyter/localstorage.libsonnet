{
  local pv = {
    kind: 'PersistentVolume',
    apiVersion: 'v1',
    metadata: {
      name: 'local-volume',
      labels: {
        type: 'local',
      },
    },
    spec: {
      persistentVolumeReclaimPolicy: 'Delete',
      storageClassName: 'local-storage',
      capacity: {
        storage: '10Gi',
      },
      accessModes: [
        'ReadWriteOnce',
      ],
      'local': {
        path: '/mnt/local',
      },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            {
              matchExpressions: [
                {
                  key: 'kubernetes.io/hostname',
                  operator: 'In',
                  values: [
                    'minikube',
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
  pv:: pv,

  local pvclaim = {
    kind: 'PersistentVolumeClaim',
    apiVersion: 'v1',
    metadata: {
      name: 'local-notebooks',
    },
    spec: {
      storageClassName: 'local-storage',
      accessModes: [
        'ReadWriteOnce',
      ],
      resources: {
        requests: {
          storage: '10Gi',
        },
      },
      volumeName: 'local-volume',
    },
  },
  pvclaim:: pvclaim,
}
