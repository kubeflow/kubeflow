import {MetricServiceClient} from '@google-cloud/monitoring';

import {KubernetesService} from './k8s_service';
import {MetricsService} from './metrics_service';
import {StackdriverMetricsService} from './stackdriver_metrics_service';

/**
 * Factory function to return an instance of the MetricsService based on
 * platform information.
 * @returns MetricServiceClient or null if the platform is not currently
 *  supported.
 */
export async function getMetricsService(k8sService: KubernetesService):
    Promise<MetricsService>|null {
  try {
    const [platformInfo, nodes] = await Promise.all([
      k8sService.getPlatformInfo(),
      k8sService.getNodes(),
    ]);
    const nodeNames = nodes.map((n) => n.metadata.name);
    switch (platformInfo.providerName) {
      case 'gce':
        const projectId = platformInfo.provider.split('/')[2];
        return new StackdriverMetricsService(
            new MetricServiceClient(), projectId, nodeNames);
      default:
        console.warn(`"${
            platformInfo
                .providerName}" is not a supported platform for Metrics`);
    }
  } catch (err) {
    console.error('Unable to retrieve information from cluster', err);
  }
  return null;
}
