import * as k8s from '@kubernetes/client-node';
import {IncomingMessage} from 'http';

import {KubernetesService} from './k8s_service';

describe('KubernetesService', () => {
  let mockResponse: jasmine.SpyObj<IncomingMessage>;
  let mockKubeConfig: jasmine.SpyObj<k8s.KubeConfig>;
  let mockApiClient: jasmine.SpyObj<k8s.Core_v1Api>;
  let mockCustomApiClient: jasmine.SpyObj<k8s.Custom_objectsApi>;
  let k8sService: KubernetesService;

  beforeEach(() => {
    mockResponse =
        jasmine.createSpyObj<IncomingMessage>('mockResponse', ['rawHeaders']);
    mockKubeConfig = jasmine.createSpyObj<k8s.KubeConfig>('mockKubeConfig', [
      'loadFromDefault', 'getContextObject', 'getCurrentContext',
      'makeApiClient'
    ]);
    mockApiClient = jasmine.createSpyObj<k8s.Core_v1Api>(
        'mockApiClient', ['listNamespace', 'listNamespacedEvent', 'listNode']);
    mockCustomApiClient = jasmine.createSpyObj<k8s.Custom_objectsApi>(
        'mockCustomApiClient', ['listNamespacedCustomObject']);
    mockKubeConfig.makeApiClient.withArgs(k8s.Core_v1Api)
        .and.returnValue(mockApiClient);
    mockKubeConfig.makeApiClient.withArgs(k8s.Custom_objectsApi)
        .and.returnValue(mockCustomApiClient);

    k8sService = new KubernetesService(mockKubeConfig);
  });

  describe('Get Namespaces', () => {
    it('Returns all namespaces', async () => {
      const response = {
        kind: 'NamespaceList',
        apiVersion: 'v1',
        metadata: {
          selfLink: '/api/v1/namespaces',
        },
        items: [
          {
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: {
              name: 'default',
              selfLink: '/api/v1/namespaces/default',
              uid: '19634286-3f78-11e9-8ab0-42010af000ce',
              resourceVersion: '18',
            },
            spec: {'finalizers': ['kubernetes']},
            status: {'phase': 'Active'}
          },
          {
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: {
              name: 'kubeflow',
              selfLink: '/api/v1/namespaces/kubeflow',
              uid: '401df783-3f78-11e9-8ab0-42010af000ce',
              resourceVersion: '710',
            },
            spec: {'finalizers': ['kubernetes']},
            status: {'phase': 'Active'}
          },
        ]
      };
      mockApiClient.listNamespace.and.returnValue(Promise.resolve(
          {response: mockResponse, body: response as k8s.V1NamespaceList}));

      const namespaces = await k8sService.getNamespaces();
      const namespaceNames = namespaces.map((n) => n.metadata.name);
      expect(namespaceNames).toEqual(['default', 'kubeflow']);
    });

    it('Returns empty list on error', async () => {
      mockApiClient.listNamespace.and.returnValue(
          Promise.reject({body: 'testing-error'}));

      const namespaces = await k8sService.getNamespaces();
      expect(namespaces.length).toBe(0);
    });
  });

  describe('Get Events for Namespace', () => {
    it('Returns events', async () => {
      const response = {
        kind: 'EventList',
        apiVersion: 'v1',
        metadata: {
          selfLink: '/api/v1/namespaces/kubeflow/events',
        },
        items: [
          {
            action: '',
            apiVersion: 'v1',
            kind: 'Event',
            eventTime: '',
            metadata: {
              name: 'event-1',
              namespace: 'kubeflow',
              selfLink: '/api/v1/namespaces/kubeflow/events/event-1',
              uid: 'acb9d581-4a1f-11e9-9606-42010af00114',
              resourceVersion: '31778',
              creationTimestamp: '2019-03-19T08:19:11Z'
            },
            involvedObject: {
              kind: 'Pod',
              namespace: 'kubeflow',
              name: 'backend-updater-0',
              uid: '70392695-3f7b-11e9-8ab0-42010af000ce',
              apiVersion: 'v1',
              resourceVersion: '5500',
              fieldPath: 'spec.containers{backend-updater}'
            },
            reason: 'Pulling',
            message:
                'pulling image "gcr.io/kubeflow-images-public/ingress-setup:latest"',
            source: {
              component: 'kubelet',
              host: 'gke-kubeflow-default-pool-59885f2c-08tm'
            },
            firstTimestamp: '2019-03-05T19:18:24Z',
            lastTimestamp: '2019-03-19T13:20:06Z',
            count: 330,
            type: 'Normal',
            reportingComponent: '',
            reportingInstance: ''
          },
          {
            action: '',
            apiVersion: 'v1',
            kind: 'Event',
            eventTime: '',
            metadata: {
              name: 'event-2',
              namespace: 'kubeflow',
              selfLink: '/api/v1/namespaces/kubeflow/events/event-2',
              uid: 'acce0a19-4a1f-11e9-9606-42010af00114',
              resourceVersion: '31779',
              creationTimestamp: '2019-03-19T08:19:11Z'
            },
            involvedObject: {
              kind: 'Pod',
              namespace: 'kubeflow',
              name: 'backend-updater-0',
              uid: '70392695-3f7b-11e9-8ab0-42010af000ce',
              apiVersion: 'v1',
              resourceVersion: '5500',
              fieldPath: 'spec.containers{backend-updater}'
            },
            reason: 'Pulled',
            message:
                'Successfully pulled image "gcr.io/kubeflow-images-public/ingress-setup:latest"',
            source: {
              component: 'kubelet',
              host: 'gke-kubeflow-default-pool-59885f2c-08tm'
            },
            firstTimestamp: '2019-03-05T19:20:01Z',
            lastTimestamp: '2019-03-19T13:20:06Z',
            count: 330,
            type: 'Normal',
            reportingComponent: '',
            reportingInstance: ''
          },
        ]
      } as unknown;  // needed to work around TS compiler
      mockApiClient.listNamespacedEvent.and.returnValue(Promise.resolve(
          {response: mockResponse, body: response as k8s.V1EventList}));

      const events = await k8sService.getEventsForNamespace('kubeflow');
      const eventNames = events.map((n) => n.metadata.name);
      expect(eventNames).toEqual(['event-1', 'event-2']);
    });

    it('Returns empty list on error', async () => {
      mockApiClient.listNamespacedEvent.withArgs('bad-namespace')
          .and.returnValue(Promise.reject({body: 'testing-error'}));

      const events = await k8sService.getEventsForNamespace('bad-namespace');
      expect(events.length).toBe(0);
    });
  });

  describe('Get Platform Info', () => {
    it('Returns a known provider and version', async () => {
      const listNodeResponse = {
        kind: 'List',
        apiVersion: 'v1',
        metadata: {
          selfLink: '',
        },
        items: [
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {
              podCIDR: '10.44.1.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm'
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {
              podCIDR: '10.44.0.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-r72s'
            },
          }
        ]
      };
      const listApplicationsResponse = {
        items: [{
          apiVersion: 'app.k8s.io/v1beta1',
          kind: 'Application',
          spec: {descriptor: {type: 'kubeflow', version: '1.0.0'}}
        }]
      };
      mockApiClient.listNode.and.returnValue(Promise.resolve(
          {response: mockResponse, body: listNodeResponse as k8s.V1NodeList}));
      mockCustomApiClient.listNamespacedCustomObject.and.returnValue(
          Promise.resolve(
              {response: mockResponse, body: listApplicationsResponse}));

      const platformInfo = await k8sService.getPlatformInfo();
      expect(platformInfo).toEqual({
        provider:
            'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm',
        providerName: 'gce',
        kubeflowVersion: '1.0.0'
      });
    });

    it('Returns other when no providerID is listed', async () => {
      const response = {
        kind: 'List',
        apiVersion: 'v1',
        metadata: {
          selfLink: '',
        },
        items: [
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {podCIDR: '10.44.1.0/24'},
          },
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {podCIDR: '10.44.0.0/24'},
          }
        ]
      };
      const listApplicationsResponse = {
        items: [{
          apiVersion: 'app.k8s.io/v1beta1',
          kind: 'Application',
          spec: {descriptor: {type: 'kubeflow', version: '1.0.0'}}
        }]
      };
      mockApiClient.listNode.and.returnValue(Promise.resolve(
          {response: mockResponse, body: response as k8s.V1NodeList}));
      mockCustomApiClient.listNamespacedCustomObject.and.returnValue(
          Promise.resolve(
              {response: mockResponse, body: listApplicationsResponse}));

      const platformInfo = await k8sService.getPlatformInfo();
      expect(platformInfo).toEqual({
        provider: 'other://',
        providerName: 'other',
        kubeflowVersion: '1.0.0'
      });
    });

    it('Returns unknown when no Application resource is found', async () => {
      const listNodeResponse = {
        kind: 'List',
        apiVersion: 'v1',
        metadata: {
          selfLink: '',
        },
        items: [
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {
              podCIDR: '10.44.1.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm'
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Node',
            spec: {
              podCIDR: '10.44.0.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-r72s'
            },
          }
        ]
      };
      mockApiClient.listNode.and.returnValue(Promise.resolve(
          {response: mockResponse, body: listNodeResponse as k8s.V1NodeList}));
      mockCustomApiClient.listNamespacedCustomObject.and.returnValue(
          Promise.resolve({
            response: mockResponse,
            body: {
              items: [],
            }
          }));

      const platformInfo = await k8sService.getPlatformInfo();
      expect(platformInfo).toEqual({
        provider:
            'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm',
        providerName: 'gce',
        kubeflowVersion: 'unknown'
      });
    });

    it('Returns defaults on error', async () => {
      mockApiClient.listNode.and.returnValue(
          Promise.reject({response: mockResponse, body: 'testing-error'}));
      mockCustomApiClient.listNamespacedCustomObject.and.returnValue(
          Promise.reject({response: mockResponse, body: 'testing-error'}));

      const platformInfo = await k8sService.getPlatformInfo();
      expect(platformInfo).toEqual({
        provider: 'other://',
        providerName: 'other',
        kubeflowVersion: 'unknown'
      });
    });
  });

  describe('Get Nodes', () => {
    it('Returns all Nodes', async () => {
      const listNodeResponse = {
        kind: 'List',
        apiVersion: 'v1',
        metadata: {
          selfLink: '',
        },
        items: [
          {
            apiVersion: 'v1',
            kind: 'Node',
            metadata: {
              name: 'node1',
            },
            spec: {
              podCIDR: '10.44.1.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm'
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Node',
            metadata: {
              name: 'node2',
            },
            spec: {
              podCIDR: '10.44.0.0/24',
              providerID:
                  'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-r72s'
            },
          }
        ]
      };
      mockApiClient.listNode.and.returnValue(Promise.resolve(
          {response: mockResponse, body: listNodeResponse as k8s.V1NodeList}));

      const nodes = await k8sService.getNodes();
      expect(nodes).toEqual(listNodeResponse.items as k8s.V1Node[]);
    });
  });
});
