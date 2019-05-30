import * as k8s from '@kubernetes/client-node';

import {KubernetesService} from './k8s_service';
import {getMetricsService} from './metrics_service_factory';
import {StackdriverMetricsService} from './stackdriver_metrics_service';

describe('Metrics Service Factory getMetricsService', () => {
  let mockK8sService: jasmine.SpyObj<KubernetesService>;

  beforeEach(() => {
    mockK8sService = jasmine.createSpyObj<KubernetesService>(
        'mockK8sService', ['getPlatformInfo', 'getNodes']);
  });

  it('Returns Kubernetes service when running on GCE', async () => {
    const nodes = [
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
    ] as k8s.V1Node[];
    mockK8sService.getNodes.and.returnValue(Promise.resolve(nodes));
    mockK8sService.getPlatformInfo.and.returnValue(Promise.resolve({
      provider:
          'gce://kubeflow-dev/us-east1-d/gke-kubeflow-default-pool-59885f2c-08tm',
      providerName: 'gce',
      kubeflowVersion: '1.0.0'
    }));

    const metricsService = await getMetricsService(mockK8sService);
    expect(metricsService instanceof StackdriverMetricsService).toBe(true);
  });

  it('Returns null on an unsupported platform', async () => {
    const nodes =
        [{
          apiVersion: 'v1',
          kind: 'Node',
          metadata: {
            name: 'node1',
          },
          spec: {podCIDR: '10.44.1.0/24', providerID: 'local://local-vm-1'},
        }] as k8s.V1Node[];
    mockK8sService.getNodes.and.returnValue(Promise.resolve(nodes));
    mockK8sService.getPlatformInfo.and.returnValue(Promise.resolve({
      provider: 'local://local-vm-provider',
      providerName: 'local',
      kubeflowVersion: '1.0.0'
    }));

    expect(await getMetricsService(mockK8sService)).toBe(null);
  });

  it('Returns null if nodes cannot be fetched', async () => {
    mockK8sService.getNodes.and.throwError('Kubernetes service error');

    expect(await getMetricsService(mockK8sService)).toBe(null);
  });
});
