import * as k8s from '@kubernetes/client-node';

/** Wrap Kubernetes API calls in a simpler interface for use in routes. */
export class KubernetesService {
  private k8sApi: k8s.Core_v1Api;

  constructor(private kubeConfig: k8s.KubeConfig) {
    console.info('Initializing Kubernetes configuration');
    this.kubeConfig.loadFromDefault();
    this.k8sApi = this.kubeConfig.makeApiClient(k8s.Core_v1Api);
  }

  /** Retrieves the list of namespaces from the Cluster. */
  async getNamespaces(): Promise<k8s.V1Namespace[]> {
    try {
      const {body} = await this.k8sApi.listNamespace();
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Namespaces', err.body ? err.body : err);
      return [];
    }
  }

  /** Retrieves the list of events for the given Namespace from the Cluster. */
  async getEventsForNamespace(namespace: string): Promise<k8s.V1Event[]> {
    try {
      const {body} = await this.k8sApi.listNamespacedEvent(namespace);
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Namespaces', err.body ? err.body : err);
      return [];
    }
  }
}
