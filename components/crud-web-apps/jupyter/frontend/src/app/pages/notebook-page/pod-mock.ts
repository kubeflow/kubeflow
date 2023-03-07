import { V1Pod } from '@kubernetes/client-node';

export const mockPod: V1Pod = {
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/default-logs-container': 'asa232rstudio',
      'prometheus.io/path': '/stats/prometheus',
      'prometheus.io/port': '15020',
      'prometheus.io/scrape': 'true',
      'sidecar.istio.io/status':
        '{"initContainers":["istio-init"],"containers":["istio-proxy"],"volumes":["istio-envoy","istio-data","istio-podinfo","istio-token","istiod-ca-cert"],"imagePullSecrets":null}',
    },
    creationTimestamp: new Date('2022-08-10T15:52:00+00:00'),
    generateName: 'asa232rstudio-',
    labels: {
      app: 'asa232rstudio',
      'controller-revision-hash': 'asa232rstudio-55b67656fc',
      'istio.io/rev': 'default',
      'notebook-name': 'asa232rstudio',
      'security.istio.io/tlsMode': 'istio',
      'service.istio.io/canonical-name': 'asa232rstudio',
      'service.istio.io/canonical-revision': 'latest',
      statefulset: 'asa232rstudio',
      'statefulset.kubernetes.io/pod-name': 'asa232rstudio-0',
    },
    name: 'asa232rstudio-0',
    namespace: 'kubeflow-user',
    ownerReferences: [
      {
        apiVersion: 'apps/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'StatefulSet',
        name: 'asa232rstudio',
        uid: '595a1069-c476-4969-bb11-8271664cbd56',
      },
    ],
    resourceVersion: '38627585',
    selfLink: '/api/v1/namespaces/kubeflow-user/pods/asa232rstudio-0',
    uid: '0dac34c4-faa3-4416-b4f8-4ad9f9de8578',
  },
  spec: {
    containers: [
      {
        env: [
          {
            name: 'NB_PREFIX',
            value: '/notebook/kubeflow-user/asa232rstudio',
          },
        ],
        image:
          'public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse:master-e9324d39',
        imagePullPolicy: 'IfNotPresent',
        name: 'asa232rstudio',
        ports: [
          {
            containerPort: 8888,
            name: 'notebook-port',
            protocol: 'TCP',
          },
        ],
        resources: {
          requests: {
            cpu: '1m',
            memory: '1M',
          },
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        volumeMounts: [
          {
            mountPath: '/dev/shm',
            name: 'dshm',
          },
          {
            mountPath: '/home/jovyan',
            name: 'asa232rstudio-workspace',
          },
          {
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
            name: 'default-editor-token-b77kp',
            readOnly: true,
          },
        ],
        workingDir: '/home/jovyan',
      },
      {
        args: [
          'proxy',
          'sidecar',
          '--domain',
          '$(POD_NAMESPACE).svc.cluster.local',
          '--serviceCluster',
          'asa232rstudio.$(POD_NAMESPACE)',
          '--proxyLogLevel=warning',
          '--proxyComponentLogLevel=misc:error',
          '--log_output_level=default:info',
          '--concurrency',
          '2',
        ],
        env: [
          {
            name: 'JWT_POLICY',
            value: 'third-party-jwt',
          },
          {
            name: 'PILOT_CERT_PROVIDER',
            value: 'istiod',
          },
          {
            name: 'CA_ADDR',
            value: 'istiod.istio-system.svc:15012',
          },
          {
            name: 'POD_NAME',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'metadata.name',
              },
            },
          },
          {
            name: 'POD_NAMESPACE',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'metadata.namespace',
              },
            },
          },
          {
            name: 'INSTANCE_IP',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'status.podIP',
              },
            },
          },
          {
            name: 'SERVICE_ACCOUNT',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'spec.serviceAccountName',
              },
            },
          },
          {
            name: 'HOST_IP',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'status.hostIP',
              },
            },
          },
          {
            name: 'CANONICAL_SERVICE',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: "metadata.labels['service.istio.io/canonical-name']",
              },
            },
          },
          {
            name: 'CANONICAL_REVISION',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath:
                  "metadata.labels['service.istio.io/canonical-revision']",
              },
            },
          },
          {
            name: 'PROXY_CONFIG',
            value: '{"tracing":{}}\n',
          },
          {
            name: 'ISTIO_META_POD_PORTS',
            value:
              '[\n    {"name":"notebook-port","containerPort":8888,"protocol":"TCP"}\n]',
          },
          {
            name: 'ISTIO_META_APP_CONTAINERS',
            value: 'asa232rstudio',
          },
          {
            name: 'ISTIO_META_CLUSTER_ID',
            value: 'Kubernetes',
          },
          {
            name: 'ISTIO_META_INTERCEPTION_MODE',
            value: 'REDIRECT',
          },
          {
            name: 'ISTIO_META_WORKLOAD_NAME',
            value: 'asa232rstudio',
          },
          {
            name: 'ISTIO_META_OWNER',
            value:
              'kubernetes://apis/apps/v1/namespaces/kubeflow-user/statefulsets/asa232rstudio',
          },
          {
            name: 'ISTIO_META_MESH_ID',
            value: 'cluster.local',
          },
          {
            name: 'TRUST_DOMAIN',
            value: 'cluster.local',
          },
        ],
        image: 'docker.io/istio/proxyv2:1.9.6',
        imagePullPolicy: 'Never',
        name: 'istio-proxy',
        ports: [
          {
            containerPort: 15090,
            name: 'http-envoy-prom',
            protocol: 'TCP',
          },
        ],
        readinessProbe: {
          failureThreshold: 30,
          httpGet: {
            path: '/healthz/ready',
            port: 15021,
            scheme: 'HTTP',
          },
          initialDelaySeconds: 1,
          periodSeconds: 2,
          successThreshold: 1,
          timeoutSeconds: 3,
        },
        resources: {
          limits: {
            cpu: '2',
            memory: '1Gi',
          },
          requests: {
            cpu: '1m',
            memory: '1M',
          },
        },
        securityContext: {
          allowPrivilegeEscalation: false,
          capabilities: {
            drop: ['ALL'],
          },
          privileged: false,
          readOnlyRootFilesystem: true,
          runAsGroup: 1337,
          runAsNonRoot: true,
          runAsUser: 1337,
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        volumeMounts: [
          {
            mountPath: '/var/run/secrets/istio',
            name: 'istiod-ca-cert',
          },
          {
            mountPath: '/var/lib/istio/data',
            name: 'istio-data',
          },
          {
            mountPath: '/etc/istio/proxy',
            name: 'istio-envoy',
          },
          {
            mountPath: '/var/run/secrets/tokens',
            name: 'istio-token',
          },
          {
            mountPath: '/etc/istio/pod',
            name: 'istio-podinfo',
          },
          {
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
            name: 'default-editor-token-b77kp',
            readOnly: true,
          },
        ],
      },
    ],
    dnsPolicy: 'ClusterFirst',
    enableServiceLinks: true,
    hostname: 'asa232rstudio-0',
    initContainers: [
      {
        args: ['--host', '$(HOST_IP)', '--port', '10101'],
        env: [
          {
            name: 'HOST_IP',
            valueFrom: {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'status.hostIP',
              },
            },
          },
        ],
        image:
          'gcr.io/arrikto-public/startup-lock-init@sha256:0fbe996a2f6b380d7c566ba16255ec034faec983c2661da778fe09b3e744ad21',
        imagePullPolicy: 'Never',
        name: 'startup-lock-init-container',
        resources: {
          requests: {
            cpu: '1m',
            memory: '1M',
          },
        },
        securityContext: {
          runAsUser: 1002,
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        volumeMounts: [
          {
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
            name: 'default-editor-token-b77kp',
            readOnly: true,
          },
        ],
      },
      {
        args: [
          'istio-iptables',
          '-p',
          '15001',
          '-z',
          '15006',
          '-u',
          '1337',
          '-m',
          'REDIRECT',
          '-i',
          '*',
          '-x',
          '',
          '-b',
          '*',
          '-d',
          '15090,15021,15020',
        ],
        image: 'docker.io/istio/proxyv2:1.9.6',
        imagePullPolicy: 'Never',
        name: 'istio-init',
        resources: {
          limits: {
            cpu: '2',
            memory: '1Gi',
          },
          requests: {
            cpu: '1m',
            memory: '1M',
          },
        },
        securityContext: {
          allowPrivilegeEscalation: false,
          capabilities: {
            add: ['NET_ADMIN', 'NET_RAW'],
            drop: ['ALL'],
          },
          privileged: false,
          readOnlyRootFilesystem: false,
          runAsGroup: 0,
          runAsNonRoot: false,
          runAsUser: 0,
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        volumeMounts: [
          {
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
            name: 'default-editor-token-b77kp',
            readOnly: true,
          },
        ],
      },
    ],
    nodeName: 'orfeas-minikf-dev',
    preemptionPolicy: 'PreemptLowerPriority',
    priority: 0,
    restartPolicy: 'Always',
    schedulerName: 'default-scheduler',
    securityContext: {
      fsGroup: 1337,
    },
    serviceAccount: 'default-editor',
    serviceAccountName: 'default-editor',
    terminationGracePeriodSeconds: 30,
    tolerations: [
      {
        effect: 'NoExecute',
        key: 'node.kubernetes.io/not-ready',
        operator: 'Exists',
        tolerationSeconds: 300,
      },
      {
        effect: 'NoExecute',
        key: 'node.kubernetes.io/unreachable',
        operator: 'Exists',
        tolerationSeconds: 300,
      },
    ],
    volumes: [
      {
        emptyDir: {
          medium: 'Memory',
        },
        name: 'istio-envoy',
      },
      {
        emptyDir: {},
        name: 'istio-data',
      },
      {
        downwardAPI: {
          defaultMode: 420,
          items: [
            {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'metadata.labels',
              },
              path: 'labels',
            },
            {
              fieldRef: {
                apiVersion: 'v1',
                fieldPath: 'metadata.annotations',
              },
              path: 'annotations',
            },
            {
              path: 'cpu-limit',
              resourceFieldRef: {
                containerName: 'istio-proxy',
                divisor: '1m',
                resource: 'limits.cpu',
              },
            },
            {
              path: 'cpu-request',
              resourceFieldRef: {
                containerName: 'istio-proxy',
                divisor: '1m',
                resource: 'requests.cpu',
              },
            },
          ],
        },
        name: 'istio-podinfo',
      },
      {
        name: 'istio-token',
        projected: {
          defaultMode: 420,
          sources: [
            {
              serviceAccountToken: {
                audience: 'istio-ca',
                expirationSeconds: 43200,
                path: 'istio-token',
              },
            },
          ],
        },
      },
      {
        configMap: {
          defaultMode: 420,
          name: 'istio-ca-root-cert',
        },
        name: 'istiod-ca-cert',
      },
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
      {
        name: 'default-editor-token-b77kp',
        secret: {
          defaultMode: 420,
          secretName: 'default-editor-token-b77kp',
        },
      },
    ],
  },
  status: {
    conditions: [
      {
        lastTransitionTime: new Date('2022-08-11T07:06:51+00:00'),
        status: 'True',
        type: 'Initialized',
      },
      {
        lastTransitionTime: new Date('2022-08-11T07:07:00+00:00'),
        status: 'True',
        type: 'Ready',
      },
      {
        lastTransitionTime: new Date('2022-08-11T07:07:00+00:00'),
        status: 'True',
        type: 'ContainersReady',
      },
      {
        lastTransitionTime: new Date('2022-08-10T15:52:00+00:00'),
        status: 'True',
        type: 'PodScheduled',
      },
    ],
    containerStatuses: [
      {
        containerID:
          'docker://e7267343bd9721289db5c8ef0c522387b2918ed5dbfcf8258c8e8838d27a11e7',
        image:
          'public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse:master-e9324d39',
        imageID:
          'docker-pullable://public.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse@sha256:b4d760b865fab0a44181c757b1db21851f2e99a6a77b27847866559015f286eb',
        lastState: {
          terminated: {
            containerID:
              'docker://b0cedeceae355658389aca0a98616be2d8df5d0005c807893a9c90b824ef40fa',
            exitCode: 0,
            finishedAt: new Date('2022-08-10T19:01:02+00:00'),
            reason: 'Completed',
            startedAt: new Date('2022-08-10T15:52:12+00:00'),
          },
        },
        name: 'asa232rstudio',
        ready: true,
        restartCount: 1,
        started: true,
        state: {
          running: {
            startedAt: new Date('2022-08-11T07:06:57+00:00'),
          },
        },
      },
      {
        containerID:
          'docker://9fdc6868d46a14d607f18919d12f58aa5b9dacb8da96938eb0d5514437687ee0',
        image: 'istio/proxyv2:1.9.6',
        imageID:
          'docker-pullable://istio/proxyv2@sha256:87a9db561d2ef628deea7a4cbd0adf008a2f64355a2796e3b840d445b7e9cd3e',
        lastState: {
          terminated: {
            containerID:
              'docker://a366a3746f852be605a9ce475531a2a29d6f7429ef3159b138784dfbde5d4fbb',
            exitCode: 0,
            finishedAt: new Date('2022-08-10T19:01:06+00:00'),
            reason: 'Completed',
            startedAt: new Date('2022-08-10T15:52:12+00:00'),
          },
        },
        name: 'istio-proxy',
        ready: true,
        restartCount: 1,
        started: true,
        state: {
          running: {
            startedAt: new Date('2022-08-11T07:06:58+00:00'),
          },
        },
      },
    ],
    hostIP: '10.10.10.10',
    initContainerStatuses: [
      {
        containerID:
          'docker://6f3ea551bdeee6c2ad697205346fae64257203fd64333f207f38b231fb43e5aa',
        image:
          'sha256:5d794711f8601a29ee4095c2cff8f14e69aced79a400008fa9c252fc43d22d24',
        imageID:
          'docker-pullable://gcr.io/arrikto-public/startup-lock-init@sha256:0fbe996a2f6b380d7c566ba16255ec034faec983c2661da778fe09b3e744ad21',
        lastState: {},
        name: 'startup-lock-init-container',
        ready: true,
        restartCount: 1,
        state: {
          terminated: {
            containerID:
              'docker://6f3ea551bdeee6c2ad697205346fae64257203fd64333f207f38b231fb43e5aa',
            exitCode: 0,
            finishedAt: new Date('2022-08-11T07:06:50+00:00'),
            reason: 'Completed',
            startedAt: new Date('2022-08-11T07:06:45+00:00'),
          },
        },
      },
      {
        containerID:
          'docker://0e4883449f3a0a61e7a19ca917c72e2112eacfa4a3551ce40f26701b2fc6ca85',
        image: 'istio/proxyv2:1.9.6',
        imageID:
          'docker-pullable://istio/proxyv2@sha256:87a9db561d2ef628deea7a4cbd0adf008a2f64355a2796e3b840d445b7e9cd3e',
        lastState: {},
        name: 'istio-init',
        ready: true,
        restartCount: 0,
        state: {
          terminated: {
            containerID:
              'docker://0e4883449f3a0a61e7a19ca917c72e2112eacfa4a3551ce40f26701b2fc6ca85',
            exitCode: 0,
            finishedAt: new Date('2022-08-11T07:06:52+00:00'),
            reason: 'Completed',
            startedAt: new Date('2022-08-11T07:06:52+00:00'),
          },
        },
      },
    ],
    phase: 'Running',
    podIP: '172.17.0.80',
    podIPs: [
      {
        ip: '172.17.0.80',
      },
    ],
    qosClass: 'Burstable',
    startTime: new Date('2022-08-10T15:52:00+00:00'),
  },
};
