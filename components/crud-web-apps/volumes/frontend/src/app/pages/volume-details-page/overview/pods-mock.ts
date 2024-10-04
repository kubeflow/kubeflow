import { V1Pod } from '@kubernetes/client-node';

export const mockPods: V1Pod[] = [
  {
    metadata: {
      annotations: {
        'cluster-autoscaler.kubernetes.io/safe-to-evict': 'true',
        'kubectl.kubernetes.io/default-logs-container': 'pvcviewer',
        'prometheus.io/path': '/stats/prometheus',
        'prometheus.io/port': '15020',
        'prometheus.io/scrape': 'true',
        'sidecar.istio.io/status':
          '{"initContainers":["istio-init"],"containers":["istio-proxy"],"volumes":["istio-envoy","istio-data","istio-podinfo","istio-token","istiod-ca-cert"],"imagePullSecrets":null}',
      },
      creationTimestamp: new Date('2022-07-13T09:36:09+00:00'),
      labels: {
        'istio.io/rev': 'default',
        'pvcviewer.kubeflow.org/name':
          'pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
        'security.istio.io/tlsMode': 'istio',
        'service.istio.io/canonical-name':
          'pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
        'service.istio.io/canonical-revision': 'latest',
      },
      name: 'pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
      namespace: 'kubeflow-user',
      ownerReferences: [
        {
          apiVersion: 'kubeflow.org/v1alpha1',
          blockOwnerDeletion: true,
          controller: true,
          kind: 'PVCViewer',
          name: 'serving-openvaccine-0-486kc-pvc-prwfw',
          uid: '54973f49-6e59-4d88-a324-78bf39c25216',
        },
      ],
      resourceVersion: '41300208',
      selfLink:
        '/api/v1/namespaces/kubeflow-user/pods/pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
      uid: 'c6d80fb5-5ccc-4b87-ac85-3aa5bf4c84eb',
    },
    spec: {
      containers: [
        {
          args: [
            '--prefix=/volume/browser/kubeflow-user/serving-openvaccine-0-486kc-pvc-prwfw',
            '--prefix-socket=/volume/browser/kubeflow-user/serving-openvaccine-0-486kc-pvc-prwfw',
            '--one-file-panel',
            '--root=/serving-openvaccine-0-486kc-pvc-prwfw',
          ],
          image:
            'gcr.io/arrikto/filemgr:e65529691088b3cc7e02781d881def9c2b5f827e',
          imagePullPolicy: 'Never',
          name: 'pvcviewer',
          ports: [
            {
              containerPort: 8000,
              name: 'http-port',
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
              mountPath: '/serving-openvaccine-0-486kc-pvc-prwfw',
              name: 'edit-volume',
            },
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
              readOnly: true,
            },
          ],
        },
        {
          args: [
            'proxy',
            'sidecar',
            '--domain',
            '$(POD_NAMESPACE).svc.cluster.local',
            '--serviceCluster',
            'pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw.kubeflow-user',
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
                  fieldPath:
                    "metadata.labels['service.istio.io/canonical-name']",
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
                '[\n    {"name":"http-port","containerPort":8000,"protocol":"TCP"}\n]',
            },
            {
              name: 'ISTIO_META_APP_CONTAINERS',
              value: 'pvcviewer',
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
              name: 'ISTIO_METAJSON_ANNOTATIONS',
              value:
                '{"cluster-autoscaler.kubernetes.io/safe-to-evict":"true"}\n',
            },
            {
              name: 'ISTIO_META_WORKLOAD_NAME',
              value: 'pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
            },
            {
              name: 'ISTIO_META_OWNER',
              value:
                'kubernetes://apis/v1/namespaces/kubeflow-user/pods/pvc-viewer-serving-openvaccine-0-486kc-pvc-prwfw',
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
              name: 'default-token-drjcl',
              readOnly: true,
            },
          ],
        },
      ],
      dnsPolicy: 'ClusterFirst',
      enableServiceLinks: true,
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
              name: 'default-token-drjcl',
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
              name: 'default-token-drjcl',
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
      serviceAccount: 'default',
      serviceAccountName: 'default',
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
          name: 'edit-volume',
          persistentVolumeClaim: {
            claimName: 'serving-openvaccine-0-486kc-pvc-prwfw',
          },
        },
        {
          name: 'default-token-drjcl',
          secret: {
            defaultMode: 420,
            secretName: 'default-token-drjcl',
          },
        },
      ],
    },
    status: {
      conditions: [
        {
          lastTransitionTime: new Date('2022-08-10T07:18:17+00:00'),
          status: 'True',
          type: 'Initialized',
        },
      ],
      containerStatuses: [
        {
          containerID:
            'docker://87bd0acf8262efb6c65d65d0d2751414e16e670336176d3fd206ecce027f1a32',
          image: 'istio/proxyv2:1.9.6',
          imageID:
            'docker-pullable://istio/proxyv2@sha256:87a9db561d2ef628deea7a4cbd0adf008a2f64355a2796e3b840d445b7e9cd3e',
          lastState: {
            terminated: {
              containerID:
                'docker://c3fff805a422f2483975e53a1da6d443268d901e1cd251e01b98acc33c075c80',
              exitCode: 0,
              finishedAt: new Date('2022-08-18T19:01:01+00:00'),
              reason: 'Completed',
              startedAt: new Date('2022-08-18T06:51:19+00:00'),
            },
          },
          name: 'istio-proxy',
          ready: true,
          restartCount: 20,
          started: true,
          state: {
            running: {
              startedAt: new Date('2022-08-19T06:57:49+00:00'),
            },
          },
        },
        {
          containerID:
            'docker://892570d19b62433f38b96edd7a1db979cbd97ead6a60710d0c5eb42166fd5265',
          image:
            'gcr.io/arrikto/filemgr:e65529691088b3cc7e02781d881def9c2b5f827e',
          imageID:
            'docker-pullable://gcr.io/arrikto/filemgr@sha256:5812098bdd34bd16195b93970f99f1086d4d215027b1af7ee9e7a7a673495dd5',
          lastState: {
            terminated: {
              containerID:
                'docker://29db31c6d47d5d2625a8dbfa539eb927a0e385ba337b4e12934f9254de70ab24',
              exitCode: 137,
              reason: 'Error',
            },
          },
          name: 'pvcviewer',
          ready: true,
          restartCount: 20,
          started: true,
          state: {
            running: {},
          },
        },
      ],
      hostIP: '10.10.10.10',
      initContainerStatuses: [
        {
          containerID:
            'docker://167e89109e1b9f141eaec7fb50166c907d364f374952322443e9c85257efdb2c',
          image:
            'sha256:5d794711f8601a29ee4095c2cff8f14e69aced79a400008fa9c252fc43d22d24',
          imageID:
            'docker-pullable://gcr.io/arrikto-public/startup-lock-init@sha256:0fbe996a2f6b380d7c566ba16255ec034faec983c2661da778fe09b3e744ad21',
          lastState: {},
          name: 'startup-lock-init-container',
          ready: true,
          restartCount: 20,
          state: {
            terminated: {
              containerID:
                'docker://167e89109e1b9f141eaec7fb50166c907d364f374952322443e9c85257efdb2c',
              exitCode: 0,
              // finishedAt: '2022-08-19T06:57:46+00:00',
              reason: 'Completed',
              // startedAt: '2022-08-19T06:57:46+00:00',
            },
          },
        },
        {
          containerID:
            'docker://178d0538f16b6bea8ffaaf47d574a452eb1e1df0fcec7174832099f77c4a3872',
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
                'docker://178d0538f16b6bea8ffaaf47d574a452eb1e1df0fcec7174832099f77c4a3872',
              exitCode: 0,
              // finishedAt: '2022-08-19T06:57:48+00:00',
              reason: 'Completed',
              // startedAt: '2022-08-19T06:57:48+00:00',
            },
          },
        },
      ],
      phase: 'Running',
      podIP: '172.17.0.69',
      podIPs: [
        {
          ip: '172.17.0.69',
        },
      ],
      qosClass: 'Burstable',
      // startTime: '2022-07-13T09:36:09+00:00',
    },
  },
  {
    metadata: {
      annotations: {
        'autoscaling.knative.dev/class': 'kpa.autoscaling.knative.dev',
        'autoscaling.knative.dev/minScale': '1',
        'internal.serving.kubeflow.org/storage-initializer-sourceuri':
          'pvc://serving-openvaccine-0-486kc-pvc-prwfw/.kale.kfserving.model.dir/model.tfkeras',
        'serving.knative.dev/creator': 'system:serviceaccount:kubeflow:default',
        'sidecar.istio.io/inject': 'false',
      },
      // creationTimestamp: '2022-04-14T12:07:02+00:00',
      generateName:
        'serving-openvaccine-0-486kc-predictor-default-00001-deployment-7695bf497f-',
      labels: {
        app: 'serving-openvaccine-0-486kc-predictor-default-00001',
        component: 'predictor',
        'pod-template-hash': '7695bf497f',
        'service.istio.io/canonical-name':
          'serving-openvaccine-0-486kc-predictor-default',
        'service.istio.io/canonical-revision':
          'serving-openvaccine-0-486kc-predictor-default-00001',
        'serving.knative.dev/configuration':
          'serving-openvaccine-0-486kc-predictor-default',
        'serving.knative.dev/configurationGeneration': '1',
        'serving.knative.dev/configurationUID':
          'efb09ba4-ccae-463a-94ba-25b6be39a52f',
        'serving.knative.dev/revision':
          'serving-openvaccine-0-486kc-predictor-default-00001',
        'serving.knative.dev/revisionUID':
          '6a831916-8ba6-42ec-8b03-43cb96220cc0',
        'serving.knative.dev/service':
          'serving-openvaccine-0-486kc-predictor-default',
        'serving.knative.dev/serviceUID':
          '295b407f-8c0d-432c-8e0e-ed49a68d049d',
        'serving.kubeflow.org/inferenceservice': 'serving-openvaccine-0-486kc',
      },
      name: 'serving-openvaccine-0-486kc-predictor-default-00001-deploynhbqd',
      namespace: 'kubeflow-user',
      ownerReferences: [
        {
          apiVersion: 'apps/v1',
          blockOwnerDeletion: true,
          controller: true,
          kind: 'ReplicaSet',
          name: 'serving-openvaccine-0-486kc-predictor-default-00001-deployment-7695bf497f',
          uid: 'a2b15c20-2731-4640-862e-7c3ddfd2ca49',
        },
      ],
      resourceVersion: '41359012',
      selfLink:
        '/api/v1/namespaces/kubeflow-user/pods/serving-openvaccine-0-486kc-predictor-default-00001-deploynhbqd',
      uid: 'cc073323-4189-4bdf-899f-390d15ba389f',
    },
    spec: {
      containers: [
        {
          args: [
            '--port=9000',
            '--rest_api_port=8080',
            '--model_name=serving-openvaccine-0-486kc',
            '--model_base_path=/mnt/models',
            '--rest_api_timeout_in_ms=60000',
          ],
          command: ['/usr/bin/tensorflow_model_server'],
          env: [
            {
              name: 'PORT',
              value: '8080',
            },
            {
              name: 'K_REVISION',
              value: 'serving-openvaccine-0-486kc-predictor-default-00001',
            },
            {
              name: 'K_CONFIGURATION',
              value: 'serving-openvaccine-0-486kc-predictor-default',
            },
            {
              name: 'K_SERVICE',
              value: 'serving-openvaccine-0-486kc-predictor-default',
            },
          ],
          image:
            'index.docker.io/tensorflow/serving@sha256:a94b7e3b0e825350675e83b0c2f2fc28f34be358c34e4126a1d828de899ec44f',
          imagePullPolicy: 'Never',
          lifecycle: {
            preStop: {
              httpGet: {
                path: '/wait-for-drain',
                port: 8022,
                scheme: 'HTTP',
              },
            },
          },
          name: 'kfserving-container',
          ports: [
            {
              containerPort: 8080,
              name: 'user-port',
              protocol: 'TCP',
            },
          ],
          resources: {
            limits: {
              cpu: '1',
              memory: '2Gi',
            },
            requests: {
              cpu: '1m',
              memory: '1M',
            },
          },
          terminationMessagePath: '/dev/termination-log',
          terminationMessagePolicy: 'FallbackToLogsOnError',
          volumeMounts: [
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
              readOnly: true,
            },
            {
              mountPath: '/mnt/pvc',
              name: 'kfserving-pvc-source',
              readOnly: true,
            },
            {
              mountPath: '/mnt/models',
              name: 'kfserving-provision-location',
              readOnly: true,
            },
          ],
        },
        {
          env: [
            {
              name: 'SERVING_NAMESPACE',
              value: 'kubeflow-user',
            },
            {
              name: 'SERVING_SERVICE',
              value: 'serving-openvaccine-0-486kc-predictor-default',
            },
            {
              name: 'SERVING_CONFIGURATION',
              value: 'serving-openvaccine-0-486kc-predictor-default',
            },
            {
              name: 'SERVING_REVISION',
              value: 'serving-openvaccine-0-486kc-predictor-default-00001',
            },
            {
              name: 'QUEUE_SERVING_PORT',
              value: '8012',
            },
            {
              name: 'CONTAINER_CONCURRENCY',
              value: '0',
            },
            {
              name: 'REVISION_TIMEOUT_SECONDS',
              value: '300',
            },
            {
              name: 'SERVING_POD',
              valueFrom: {
                fieldRef: {
                  apiVersion: 'v1',
                  fieldPath: 'metadata.name',
                },
              },
            },
            {
              name: 'SERVING_POD_IP',
              valueFrom: {
                fieldRef: {
                  apiVersion: 'v1',
                  fieldPath: 'status.podIP',
                },
              },
            },
            {
              name: 'SERVING_LOGGING_CONFIG',
            },
            {
              name: 'SERVING_LOGGING_LEVEL',
            },
            {
              name: 'SERVING_REQUEST_LOG_TEMPLATE',
              value:
                '{"httpRequest": {"requestMethod": "{{.Request.Method}}", "requestUrl": "{{js .Request.RequestURI}}", "requestSize": "{{.Request.ContentLength}}", "status": {{.Response.Code}}, "responseSize": "{{.Response.Size}}", "userAgent": "{{js .Request.UserAgent}}", "remoteIp": "{{js .Request.RemoteAddr}}", "serverIp": "{{.Revision.PodIP}}", "referer": "{{js .Request.Referer}}", "latency": "{{.Response.Latency}}s", "protocol": "{{.Request.Proto}}"}, "traceId": "{{index .Request.Header "X-B3-Traceid"}}"}',
            },
            {
              name: 'SERVING_ENABLE_REQUEST_LOG',
              value: 'false',
            },
            {
              name: 'SERVING_REQUEST_METRICS_BACKEND',
              value: 'prometheus',
            },
            {
              name: 'TRACING_CONFIG_BACKEND',
              value: 'none',
            },
            {
              name: 'TRACING_CONFIG_ZIPKIN_ENDPOINT',
            },
            {
              name: 'TRACING_CONFIG_STACKDRIVER_PROJECT_ID',
            },
            {
              name: 'TRACING_CONFIG_DEBUG',
              value: 'false',
            },
            {
              name: 'TRACING_CONFIG_SAMPLE_RATE',
              value: '0.1',
            },
            {
              name: 'USER_PORT',
              value: '8080',
            },
            {
              name: 'SYSTEM_NAMESPACE',
              value: 'knative-serving',
            },
            {
              name: 'METRICS_DOMAIN',
              value: 'knative.dev/internal/serving',
            },
            {
              name: 'SERVING_READINESS_PROBE',
              value:
                '{"tcpSocket":{"port":8080,"host":"127.0.0.1"},"successThreshold":1}',
            },
            {
              name: 'ENABLE_PROFILING',
              value: 'false',
            },
            {
              name: 'SERVING_ENABLE_PROBE_REQUEST_LOG',
              value: 'false',
            },
            {
              name: 'METRICS_COLLECTOR_ADDRESS',
            },
          ],
          image:
            'gcr.io/knative-releases/knative.dev/serving/cmd/queue@sha256:0b8e031170354950f3395876961452af1c62f7ab5161c9e71867392c11881962',
          imagePullPolicy: 'Never',
          name: 'queue-proxy',
          ports: [
            {
              containerPort: 8022,
              name: 'http-queueadm',
              protocol: 'TCP',
            },
            {
              containerPort: 9090,
              name: 'http-autometric',
              protocol: 'TCP',
            },
            {
              containerPort: 9091,
              name: 'http-usermetric',
              protocol: 'TCP',
            },
            {
              containerPort: 8012,
              name: 'queue-port',
              protocol: 'TCP',
            },
          ],
          readinessProbe: {
            failureThreshold: 3,
            httpGet: {
              httpHeaders: [
                {
                  name: 'K-Network-Probe',
                  value: 'queue',
                },
              ],
              path: '/',
              port: 8012,
              scheme: 'HTTP',
            },
            periodSeconds: 1,
            successThreshold: 1,
            timeoutSeconds: 1,
          },
          resources: {
            requests: {
              cpu: '1m',
              memory: '1M',
            },
          },
          securityContext: {
            allowPrivilegeEscalation: false,
            capabilities: {
              drop: ['all'],
            },
            readOnlyRootFilesystem: true,
            runAsNonRoot: true,
          },
          startupProbe: {
            exec: {
              command: ['/ko-app/queue', '-probe-timeout', '10m0s'],
            },
            failureThreshold: 1,
            periodSeconds: 1,
            successThreshold: 1,
            timeoutSeconds: 600,
          },
          terminationMessagePath: '/dev/termination-log',
          terminationMessagePolicy: 'File',
          volumeMounts: [
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
              readOnly: true,
            },
          ],
        },
      ],
      dnsPolicy: 'ClusterFirst',
      enableServiceLinks: false,
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
              name: 'default-token-drjcl',
              readOnly: true,
            },
          ],
        },
        {
          args: [
            '/mnt/pvc/.kale.kfserving.model.dir/model.tfkeras',
            '/mnt/models',
          ],
          image: 'kfserving/storage-initializer:v0.6.1',
          imagePullPolicy: 'Never',
          name: 'storage-initializer',
          resources: {
            limits: {
              cpu: '1',
              memory: '1Gi',
            },
            requests: {
              cpu: '1m',
              memory: '1M',
            },
          },
          terminationMessagePath: '/dev/termination-log',
          terminationMessagePolicy: 'FallbackToLogsOnError',
          volumeMounts: [
            {
              mountPath: '/mnt/pvc',
              name: 'kfserving-pvc-source',
              readOnly: true,
            },
            {
              mountPath: '/mnt/models',
              name: 'kfserving-provision-location',
            },
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
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
      securityContext: {},
      serviceAccount: 'default',
      serviceAccountName: 'default',
      terminationGracePeriodSeconds: 300,
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
          name: 'default-token-drjcl',
          secret: {
            defaultMode: 420,
            secretName: 'default-token-drjcl',
          },
        },
        {
          name: 'kfserving-pvc-source',
          persistentVolumeClaim: {
            claimName: 'serving-openvaccine-0-486kc-pvc-prwfw',
          },
        },
        {
          emptyDir: {},
          name: 'kfserving-provision-location',
        },
      ],
    },
    status: {
      conditions: [
        {
          // lastTransitionTime: '2022-04-15T06:40:03+00:00',
          message: 'containers with incomplete status: [storage-initializer]',
          reason: 'ContainersNotInitialized',
          status: 'False',
          type: 'Initialized',
        },
        {
          // lastTransitionTime: '2022-04-15T06:34:38+00:00',
          message:
            'containers with unready status: [kfserving-container queue-proxy]',
          reason: 'ContainersNotReady',
          status: 'False',
          type: 'Ready',
        },
        {
          // lastTransitionTime: '2022-04-15T06:34:38+00:00',
          message:
            'containers with unready status: [kfserving-container queue-proxy]',
          reason: 'ContainersNotReady',
          status: 'False',
          type: 'ContainersReady',
        },
        {
          // lastTransitionTime: '2022-04-14T12:07:10+00:00',
          status: 'True',
          type: 'PodScheduled',
        },
      ],
      containerStatuses: [
        {
          containerID:
            'docker://0cb698de3ac787ae361d33b911f2d08a850bebff1d259732aae143779b14e6a1',
          image: 'tensorflow/serving:2.3.0',
          imageID:
            'docker-pullable://tensorflow/serving@sha256:a94b7e3b0e825350675e83b0c2f2fc28f34be358c34e4126a1d828de899ec44f',
          lastState: {},
          name: 'kfserving-container',
          ready: false,
          restartCount: 0,
          started: false,
          state: {
            terminated: {
              containerID:
                'docker://0cb698de3ac787ae361d33b911f2d08a850bebff1d259732aae143779b14e6a1',
              exitCode: 137,
              // finishedAt: '2022-04-14T19:01:07+00:00',
              message:
                'odel from: /mnt/models/1\n2022-04-14 12:07:26.695042: I external/org_tensorflow/tensorflow/cc/saved_model/reader.cc:54] Reading meta graph with tags { serve }\n2022-04-14 12:07:26.695097: I external/org_tensorflow/tensorflow/cc/saved_model/loader.cc:234] Reading SavedModel debug info (if present) from: /mnt/models/1\n2022-04-14 12:07:26.696352: I external/org_tensorflow/tensorflow/core/platform/cpu_feature_guard.cc:142] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN)to use the following CPU instructions in performance-critical operations:  AVX2 FMA\nTo enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.\n2022-04-14 12:07:27.385584: I external/org_tensorflow/tensorflow/cc/saved_model/loader.cc:199] Restoring SavedModel bundle.\n2022-04-14 12:07:28.424782: I external/org_tensorflow/tensorflow/cc/saved_model/loader.cc:183] Running initialization op on SavedModel bundle at path: /mnt/models/1\n2022-04-14 12:07:29.142901: I external/org_tensorflow/tensorflow/cc/saved_model/loader.cc:303] SavedModel load for tags { serve }; Status: success: OK. Took 2653687 microseconds.\n2022-04-14 12:07:29.191852: I tensorflow_serving/servables/tensorflow/saved_model_warmup_util.cc:59] No warmup data file found at /mnt/models/1/assets.extra/tf_serving_warmup_requests\n2022-04-14 12:07:29.252701: I tensorflow_serving/core/loader_harness.cc:87] Successfully loaded servable version {name: serving-openvaccine-0-486kc version: 1}\n2022-04-14 12:07:29.263481: I tensorflow_serving/model_servers/server.cc:367] Running gRPC ModelServer at 0.0.0.0:9000 ...\n[warn] getaddrinfo: address family for nodename not supported\n2022-04-14 12:07:29.268634: I tensorflow_serving/model_servers/server.cc:387] Exporting HTTP/REST API at:localhost:8080 ...\n[evhttp_server.cc : 238] NET_LOG: Entering the event loop ...\n2022-04-14 12:10:36.363181: E external/org_tensorflow/tensorflow/core/grappler/optimizers/meta_optimizer.cc:581] implementation_selector failed: Internal: Could not parse device name:\n',
              reason: 'Error',
              // startedAt: '2022-04-14T12:07:26+00:00',
            },
          },
        },
        {
          containerID:
            'docker://dde83107f2d19637e45ba3fc0d1a1f5ee78d927f23c8a6011004b973a049e0e3',
          image:
            'sha256:7b084b4174cb572be1e28313a17f5d65e3d776070e296a9f1b209da8e98d1bd8',
          imageID:
            'docker-pullable://gcr.io/knative-releases/knative.dev/serving/cmd/queue@sha256:0b8e031170354950f3395876961452af1c62f7ab5161c9e71867392c11881962',
          lastState: {},
          name: 'queue-proxy',
          ready: false,
          restartCount: 0,
          started: false,
          state: {
            terminated: {
              containerID:
                'docker://dde83107f2d19637e45ba3fc0d1a1f5ee78d927f23c8a6011004b973a049e0e3',
              exitCode: 137,
              // finishedAt: '2022-04-14T19:01:05+00:00',
              reason: 'Error',
              // startedAt: '2022-04-14T12:07:26+00:00',
            },
          },
        },
      ],
      hostIP: '10.10.10.10',
      initContainerStatuses: [
        {
          containerID:
            'docker://c3b4a8122c2f218115aba88b5ee0d244e464ebd8d6ba4b7a87042ba4eaa08c82',
          image:
            'sha256:5d794711f8601a29ee4095c2cff8f14e69aced79a400008fa9c252fc43d22d24',
          imageID:
            'docker-pullable://gcr.io/arrikto-public/startup-lock-init@sha256:0fbe996a2f6b380d7c566ba16255ec034faec983c2661da778fe09b3e744ad21',
          lastState: {},
          name: 'startup-lock-init-container',
          ready: true,
          restartCount: 79,
          state: {
            terminated: {
              containerID:
                'docker://c3b4a8122c2f218115aba88b5ee0d244e464ebd8d6ba4b7a87042ba4eaa08c82',
              exitCode: 0,
              // finishedAt: '2022-08-19T06:57:45+00:00',
              reason: 'Completed',
              // startedAt: '2022-08-19T06:57:45+00:00',
            },
          },
        },
        {
          containerID:
            'docker://6d3cf4856791cde1fd825aa702d204cdd0649301ccc997e417045fadb03ef2de',
          image: 'kfserving/storage-initializer:v0.6.1',
          imageID:
            'docker-pullable://kfserving/storage-initializer@sha256:81b654574aec1dbce37d6e5b8d5d58b5d820fdf17e35b04cd52b1c805595fc37',
          lastState: {
            terminated: {
              containerID:
                'docker://6d3cf4856791cde1fd825aa702d204cdd0649301ccc997e417045fadb03ef2de',
              exitCode: 1,
              // finishedAt: '2022-08-19T08:16:02+00:00',
              message:
                '[I 220819 08:16:02 initializer-entrypoint:13] Initializing, args: src_uri [/mnt/pvc/.kale.kfserving.model.dir/model.tfkeras] dest_path[ [/mnt/models]\n[I 220819 08:16:02 storage:50] Copying contents of /mnt/pvc/.kale.kfserving.model.dir/model.tfkeras to local\n[I 220819 08:16:02 storage:247] Linking: /mnt/pvc/.kale.kfserving.model.dir/model.tfkeras/1 to /mnt/models/1\nTraceback (most recent call last):\n  File "/storage-initializer/scripts/initializer-entrypoint", line 14, in <module>\n    kfserving.Storage.download(src_uri, dest_path)\n  File "/usr/local/lib/python3.7/site-packages/kfserving/storage.py", line 71, in download\n    return Storage._download_local(uri, out_dir)\n  File "/usr/local/lib/python3.7/site-packages/kfserving/storage.py", line 248, in _download_local\n    os.symlink(src, dest_path)\nFileExistsError: [Errno 17] File exists: \'/mnt/pvc/.kale.kfserving.model.dir/model.tfkeras/1\' -> \'/mnt/models/1\'\n',
              reason: 'Error',
              // startedAt: '2022-08-19T08:16:00+00:00',
            },
          },
          name: 'storage-initializer',
          ready: false,
          restartCount: 20,
          state: {
            waiting: {
              message:
                'back-off 5m0s restarting failed container=storage-initializer pod=serving-openvaccine-0-486kc-predictor-default-00001-deploynhbqd_kubeflow-user(cc073323-4189-4bdf-899f-390d15ba389f)',
              reason: 'CrashLoopBackOff',
            },
          },
        },
      ],
      phase: 'Running',
      podIP: '172.17.0.68',
      podIPs: [
        {
          ip: '172.17.0.68',
        },
      ],
      qosClass: 'Burstable',
      // startTime: '2022-04-14T12:07:11+00:00',
    },
  },
  {
    metadata: {
      annotations: {
        'autoscaling.knative.dev/class': 'kpa.autoscaling.knative.dev',
        'autoscaling.knative.dev/minScale': '1',
        'internal.serving.kubeflow.org/storage-initializer-sourceuri':
          'pvc://serving-openvaccine-0-486kc-pvc-prwfw/',
        'serving.knative.dev/creator': 'system:serviceaccount:kubeflow:default',
        'sidecar.istio.io/inject': 'false',
      },
      // creationTimestamp: '2022-04-14T12:07:03+00:00',
      generateName:
        'serving-openvaccine-2786a7fd31c47d404c0bd18da10bd203-deployment-84654847dc-',
      labels: {
        app: 'serving-openvaccine-0-486kc-transformer-default-00001',
        component: 'transformer',
        'pod-template-hash': '84654847dc',
        'service.istio.io/canonical-name':
          'serving-openvaccine-0-486kc-transformer-default',
        'service.istio.io/canonical-revision':
          'serving-openvaccine-0-486kc-transformer-default-00001',
        'serving.knative.dev/configuration':
          'serving-openvaccine-0-486kc-transformer-default',
        'serving.knative.dev/configurationGeneration': '1',
        'serving.knative.dev/configurationUID':
          '224f2d8d-5305-423e-a930-88e1a38c589f',
        'serving.knative.dev/revision':
          'serving-openvaccine-0-486kc-transformer-default-00001',
        'serving.knative.dev/revisionUID':
          'e7f95c0c-1369-4714-9e40-ee9678e7f9ae',
        'serving.knative.dev/service':
          'serving-openvaccine-0-486kc-transformer-default',
        'serving.knative.dev/serviceUID':
          '5278572e-ca9b-4a05-b81b-bed881f200f6',
        'serving.kubeflow.org/inferenceservice': 'serving-openvaccine-0-486kc',
      },
      name: 'serving-openvaccine-2786a7fd31c47d404c0bd18da10bd203-deplox2ccd',
      namespace: 'kubeflow-user',
      ownerReferences: [
        {
          apiVersion: 'apps/v1',
          blockOwnerDeletion: true,
          controller: true,
          kind: 'ReplicaSet',
          name: 'serving-openvaccine-2786a7fd31c47d404c0bd18da10bd203-deployment-84654847dc',
          uid: 'c98ae290-16b2-4822-9d8f-f5079fdb642e',
        },
      ],
      resourceVersion: '41300311',
      selfLink:
        '/api/v1/namespaces/kubeflow-user/pods/serving-openvaccine-2786a7fd31c47d404c0bd18da10bd203-deplox2ccd',
      uid: '40b535db-0f74-40c0-ba1b-4a78dcdb4ea0',
    },
    spec: {
      containers: [
        {
          args: [
            '--model_name',
            'serving-openvaccine-0-486kc',
            '--predictor_host',
            'serving-openvaccine-0-486kc-predictor-default.kubeflow-user',
            '--http_port',
            '8080',
          ],
          command: ['python3', '-m', 'kale.kfserving'],
          env: [
            {
              name: 'STORAGE_URI',
              value: 'pvc://serving-openvaccine-0-486kc-pvc-prwfw/',
            },
            {
              name: 'PVC_MOUNT_POINT',
              value: '/home/jovyan',
            },
            {
              name: 'KALE_KFSERVING_TRANSFORMER_CLASS',
              value: 'FunctionTransformer',
            },
            {
              name: 'KALE_KFSERVING_TRANSFORMER_PATH',
              value: 'None',
            },
            {
              name: 'PORT',
              value: '8080',
            },
            {
              name: 'K_REVISION',
              value: 'serving-openvaccine-0-486kc-transformer-default-00001',
            },
            {
              name: 'K_CONFIGURATION',
              value: 'serving-openvaccine-0-486kc-transformer-default',
            },
            {
              name: 'K_SERVICE',
              value: 'serving-openvaccine-0-486kc-transformer-default',
            },
          ],
          image:
            'gcr.io/arrikto/jupyter-kale-py36@sha256:dd3f92ca66b46d247e4b9b6a9d84ffbb368646263c2e3909473c3b851f3fe198',
          imagePullPolicy: 'IfNotPresent',
          lifecycle: {
            preStop: {
              httpGet: {
                path: '/wait-for-drain',
                port: 8022,
                scheme: 'HTTP',
              },
            },
          },
          name: 'kfserving-container',
          ports: [
            {
              containerPort: 8080,
              name: 'user-port',
              protocol: 'TCP',
            },
          ],
          resources: {
            limits: {
              cpu: '1',
              memory: '2Gi',
            },
            requests: {
              cpu: '1m',
              memory: '1M',
            },
          },
          securityContext: {
            runAsUser: 0,
          },
          terminationMessagePath: '/dev/termination-log',
          terminationMessagePolicy: 'FallbackToLogsOnError',
          volumeMounts: [
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
              readOnly: true,
            },
            {
              mountPath: '/home/jovyan',
              name: 'kfserving-pvc-source',
            },
          ],
        },
        {
          env: [
            {
              name: 'SERVING_NAMESPACE',
              value: 'kubeflow-user',
            },
            {
              name: 'SERVING_SERVICE',
              value: 'serving-openvaccine-0-486kc-transformer-default',
            },
            {
              name: 'SERVING_CONFIGURATION',
              value: 'serving-openvaccine-0-486kc-transformer-default',
            },
            {
              name: 'SERVING_REVISION',
              value: 'serving-openvaccine-0-486kc-transformer-default-00001',
            },
            {
              name: 'QUEUE_SERVING_PORT',
              value: '8012',
            },
            {
              name: 'CONTAINER_CONCURRENCY',
              value: '0',
            },
            {
              name: 'REVISION_TIMEOUT_SECONDS',
              value: '300',
            },
            {
              name: 'SERVING_POD',
              valueFrom: {
                fieldRef: {
                  apiVersion: 'v1',
                  fieldPath: 'metadata.name',
                },
              },
            },
            {
              name: 'SERVING_POD_IP',
              valueFrom: {
                fieldRef: {
                  apiVersion: 'v1',
                  fieldPath: 'status.podIP',
                },
              },
            },
            {
              name: 'SERVING_LOGGING_CONFIG',
            },
            {
              name: 'SERVING_LOGGING_LEVEL',
            },
            {
              name: 'SERVING_REQUEST_LOG_TEMPLATE',
              value:
                '{"httpRequest": {"requestMethod": "{{.Request.Method}}", "requestUrl": "{{js .Request.RequestURI}}", "requestSize": "{{.Request.ContentLength}}", "status": {{.Response.Code}}, "responseSize": "{{.Response.Size}}", "userAgent": "{{js .Request.UserAgent}}", "remoteIp": "{{js .Request.RemoteAddr}}", "serverIp": "{{.Revision.PodIP}}", "referer": "{{js .Request.Referer}}", "latency": "{{.Response.Latency}}s", "protocol": "{{.Request.Proto}}"}, "traceId": "{{index .Request.Header "X-B3-Traceid"}}"}',
            },
            {
              name: 'SERVING_ENABLE_REQUEST_LOG',
              value: 'false',
            },
            {
              name: 'SERVING_REQUEST_METRICS_BACKEND',
              value: 'prometheus',
            },
            {
              name: 'TRACING_CONFIG_BACKEND',
              value: 'none',
            },
            {
              name: 'TRACING_CONFIG_ZIPKIN_ENDPOINT',
            },
            {
              name: 'TRACING_CONFIG_STACKDRIVER_PROJECT_ID',
            },
            {
              name: 'TRACING_CONFIG_DEBUG',
              value: 'false',
            },
            {
              name: 'TRACING_CONFIG_SAMPLE_RATE',
              value: '0.1',
            },
            {
              name: 'USER_PORT',
              value: '8080',
            },
            {
              name: 'SYSTEM_NAMESPACE',
              value: 'knative-serving',
            },
            {
              name: 'METRICS_DOMAIN',
              value: 'knative.dev/internal/serving',
            },
            {
              name: 'SERVING_READINESS_PROBE',
              value:
                '{"tcpSocket":{"port":8080,"host":"127.0.0.1"},"successThreshold":1}',
            },
            {
              name: 'ENABLE_PROFILING',
              value: 'false',
            },
            {
              name: 'SERVING_ENABLE_PROBE_REQUEST_LOG',
              value: 'false',
            },
            {
              name: 'METRICS_COLLECTOR_ADDRESS',
            },
          ],
          image:
            'gcr.io/knative-releases/knative.dev/serving/cmd/queue@sha256:0b8e031170354950f3395876961452af1c62f7ab5161c9e71867392c11881962',
          imagePullPolicy: 'Never',
          name: 'queue-proxy',
          ports: [
            {
              containerPort: 8022,
              name: 'http-queueadm',
              protocol: 'TCP',
            },
            {
              containerPort: 9090,
              name: 'http-autometric',
              protocol: 'TCP',
            },
            {
              containerPort: 9091,
              name: 'http-usermetric',
              protocol: 'TCP',
            },
            {
              containerPort: 8012,
              name: 'queue-port',
              protocol: 'TCP',
            },
          ],
          readinessProbe: {
            failureThreshold: 3,
            httpGet: {
              httpHeaders: [
                {
                  name: 'K-Network-Probe',
                  value: 'queue',
                },
              ],
              path: '/',
              port: 8012,
              scheme: 'HTTP',
            },
            periodSeconds: 1,
            successThreshold: 1,
            timeoutSeconds: 1,
          },
          resources: {
            requests: {
              cpu: '1m',
              memory: '1M',
            },
          },
          securityContext: {
            allowPrivilegeEscalation: false,
            capabilities: {
              drop: ['all'],
            },
            readOnlyRootFilesystem: true,
            runAsNonRoot: true,
          },
          startupProbe: {
            exec: {
              command: ['/ko-app/queue', '-probe-timeout', '10m0s'],
            },
            failureThreshold: 1,
            periodSeconds: 1,
            successThreshold: 1,
            timeoutSeconds: 600,
          },
          terminationMessagePath: '/dev/termination-log',
          terminationMessagePolicy: 'File',
          volumeMounts: [
            {
              mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
              name: 'default-token-drjcl',
              readOnly: true,
            },
          ],
        },
      ],
      dnsPolicy: 'ClusterFirst',
      enableServiceLinks: false,
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
              name: 'default-token-drjcl',
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
      securityContext: {},
      serviceAccount: 'default',
      serviceAccountName: 'default',
      terminationGracePeriodSeconds: 300,
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
          name: 'default-token-drjcl',
          secret: {
            defaultMode: 420,
            secretName: 'default-token-drjcl',
          },
        },
        {
          name: 'kfserving-pvc-source',
          persistentVolumeClaim: {
            claimName: 'serving-openvaccine-0-486kc-pvc-prwfw',
          },
        },
      ],
    },
    status: {
      conditions: [
        {
          // lastTransitionTime: '2022-08-10T07:17:30+00:00',
          status: 'True',
          type: 'Initialized',
        },
        {
          // lastTransitionTime: '2022-08-19T06:58:00+00:00',
          status: 'True',
          type: 'Ready',
        },
        {
          // lastTransitionTime: '2022-08-19T06:58:00+00:00',
          status: 'True',
          type: 'ContainersReady',
        },
        {
          // lastTransitionTime: '2022-04-14T12:07:11+00:00',
          status: 'True',
          type: 'PodScheduled',
        },
      ],
      containerStatuses: [
        {
          containerID:
            'docker://1013527ae09a2f92bb1e4a5ec772889aa02a2e000b3aef7a9264e856ffde3143',
          image:
            'gcr.io/arrikto/jupyter-kale-py36:release-1.4-l0-release-1.4-rc8-7-g3d66e477d',
          imageID:
            'docker-pullable://gcr.io/arrikto/jupyter-kale-py36@sha256:dd3f92ca66b46d247e4b9b6a9d84ffbb368646263c2e3909473c3b851f3fe198',
          lastState: {
            terminated: {
              containerID:
                'docker://648e54f01118f90a6bd3c2c158080bcaaf3aa67fc9dd1448a23241d89e41d737',
              exitCode: 15,
              // finishedAt: '2022-08-18T19:00:57+00:00',
              message:
                '-packages/kale/kfserving/__main__.py", line 45, in <module>\n    predictor_host=args.predictor_host)\n  File "/usr/local/lib/python3.6/dist-packages/kale/kfserving/transformer.py", line 39, in __init__\n    self._load_transformer_assets()\n  File "/usr/local/lib/python3.6/dist-packages/kale/kfserving/transformer.py", line 73, in _load_transformer_assets\n    log.info("Assets successfully loaded: %s" % self.assets.keys())\nMessage: "Assets successfully loaded: dict_keys([\'transformer_function\', \'tokenizer\'])"\nArguments: ()\n--- Logging error ---\nTraceback (most recent call last):\n  File "/usr/lib/python3.6/logging/__init__.py", line 994, in emit\n    msg = self.format(record)\n  File "/usr/lib/python3.6/logging/__init__.py", line 840, in format\n    return fmt.format(record)\n  File "/usr/lib/python3.6/logging/__init__.py", line 580, in format\n    s = self.formatMessage(record)\n  File "/usr/lib/python3.6/logging/__init__.py", line 549, in formatMessage\n    return self._style.format(record)\n  File "/usr/lib/python3.6/logging/__init__.py", line 391, in format\n    return self._fmt % record.__dict__\nKeyError: \'origin\'\nCall stack:\n  File "/usr/lib/python3.6/runpy.py", line 193, in _run_module_as_main\n    "__main__", mod_spec)\n  File "/usr/lib/python3.6/runpy.py", line 85, in _run_code\n    exec(code, run_globals)\n  File "/usr/local/lib/python3.6/dist-packages/kale/kfserving/__main__.py", line 45, in <module>\n    predictor_host=args.predictor_host)\n  File "/usr/local/lib/python3.6/dist-packages/kale/kfserving/transformer.py", line 39, in __init__\n    self._load_transformer_assets()\n  File "/usr/local/lib/python3.6/dist-packages/kale/kfserving/transformer.py", line 74, in _load_transformer_assets\n    log.info("Initializing assets...")\nMessage: \'Initializing assets...\'\nArguments: ()\n[I 220818 06:51:33 kfserver:151] Registering model: serving-openvaccine-0-486kc\n[I 220818 06:51:33 kfserver:121] Setting asyncio max_workers as 5\n[I 220818 06:51:33 kfserver:128] Listening on port 8080\n[I 220818 06:51:33 kfserver:130] Will fork 1 workers\n',
              reason: 'Error',
              // startedAt: '2022-08-18T06:51:18+00:00',
            },
          },
          name: 'kfserving-container',
          ready: true,
          restartCount: 79,
          started: true,
          state: {
            running: {
              // startedAt: '2022-08-19T06:57:48+00:00',
            },
          },
        },
        {
          containerID:
            'docker://68168aee29daa873b51c6c543474ad6de5971cc55f4e2f980e9e679bf6a0b7b6',
          image:
            'sha256:7b084b4174cb572be1e28313a17f5d65e3d776070e296a9f1b209da8e98d1bd8',
          imageID:
            'docker-pullable://gcr.io/knative-releases/knative.dev/serving/cmd/queue@sha256:0b8e031170354950f3395876961452af1c62f7ab5161c9e71867392c11881962',
          lastState: {
            terminated: {
              containerID:
                'docker://421fd7a50011f1e93ee9a8fe2812f826df5c5320b779801ad7aa7c9e5142585e',
              exitCode: 137,
              // finishedAt: '2022-08-18T19:01:05+00:00',
              reason: 'Error',
              // startedAt: '2022-08-18T06:51:19+00:00',
            },
          },
          name: 'queue-proxy',
          ready: true,
          restartCount: 79,
          started: true,
          state: {
            running: {
              // startedAt: '2022-08-19T06:57:48+00:00',
            },
          },
        },
      ],
      hostIP: '10.10.10.10',
      initContainerStatuses: [
        {
          containerID:
            'docker://3fb58c12f7e0687b060fa3d29fdba89567c445fd891f7dcdf3eba2b704918938',
          image:
            'sha256:5d794711f8601a29ee4095c2cff8f14e69aced79a400008fa9c252fc43d22d24',
          imageID:
            'docker-pullable://gcr.io/arrikto-public/startup-lock-init@sha256:0fbe996a2f6b380d7c566ba16255ec034faec983c2661da778fe09b3e744ad21',
          lastState: {},
          name: 'startup-lock-init-container',
          ready: true,
          restartCount: 79,
          state: {
            terminated: {
              containerID:
                'docker://3fb58c12f7e0687b060fa3d29fdba89567c445fd891f7dcdf3eba2b704918938',
              exitCode: 0,
              // finishedAt: '2022-08-19T06:57:46+00:00',
              reason: 'Completed',
              // startedAt: '2022-08-19T06:57:46+00:00',
            },
          },
        },
      ],
      phase: 'Running',
      podIP: '172.17.0.70',
      podIPs: [
        {
          ip: '172.17.0.70',
        },
      ],
      qosClass: 'Burstable',
      // startTime: '2022-04-14T12:07:11+00:00',
    },
  },
];
