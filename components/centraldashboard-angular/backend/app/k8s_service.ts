import * as k8s from '@kubernetes/client-node';

/** Retrieve Dashboard configmap Name */
const {
  DASHBOARD_CONFIGMAP = "centraldashboard-config",
  KF_DASHBOARD_BUILD_LABEL = "Build",
  KF_DASHBOARD_VERSION = null,
  KF_DASHBOARD_BUILD_ID = null,
} = process.env;

/** Information about the Kubernetes hosting platform. */
export interface PlatformInfo {
  provider: string;
  providerName: string;
  buildLabel: string;
  buildVersion: string;
  buildId: string;
}

/** Wrap Kubernetes API calls in a simpler interface for use in routes. */
export class KubernetesService {
  private namespace = 'kubeflow';
  private coreAPI: k8s.Core_v1Api;
  private dashboardConfigMap = DASHBOARD_CONFIGMAP;

  constructor(private kubeConfig: k8s.KubeConfig) {
    console.info('Initializing Kubernetes configuration');
    this.kubeConfig.loadFromDefault();
    const context =
        this.kubeConfig.getContextObject(this.kubeConfig.getCurrentContext());
    if (context && context.namespace) {
      this.namespace = context.namespace;
    }
    this.coreAPI = this.kubeConfig.makeApiClient(k8s.Core_v1Api);
  }

  /** Retrieves the list of namespaces from the Cluster. */
  async getNamespaces(): Promise<k8s.V1Namespace[]> {
    try {
      const {body} = await this.coreAPI.listNamespace();
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Namespaces:', err.body || err);
      return [];
    }
  }

  /** Retrieves the configmap data for the central dashboard. */
  async getConfigMap(): Promise<k8s.V1ConfigMap> {
    try {
      const { body } = await this.coreAPI.readNamespacedConfigMap(this.dashboardConfigMap,this.namespace);
      return body;
    } catch (err) {
      console.error('Unable to fetch ConfigMap:', err.body || err);
      return null;
    }
  }

  /** Retrieves the list of events for the given Namespace from the Cluster. */
  async getEventsForNamespace(namespace: string): Promise<k8s.V1Event[]> {
    try {
      const {body} = await this.coreAPI.listNamespacedEvent(namespace);
      return body.items;
    } catch (err) {
      console.error(
          `Unable to fetch Events for ${namespace}:`, err.body || err);
      return [];
    }
  }

  /**
   * Obtains cloud platform information from cluster Nodes,
   * as well as the Kubeflow version from the Application custom resource.
   */
  async getPlatformInfo(): Promise<PlatformInfo> {
    try {
      const [provider] = await Promise.all([this.getProvider()]);
      return {
        provider,
        providerName: provider.split(':')[0],
        buildLabel: KF_DASHBOARD_BUILD_LABEL,
        buildVersion: KF_DASHBOARD_VERSION,
        buildId: KF_DASHBOARD_BUILD_ID,
      };
    } catch (err) {
      console.error('Unexpected error', err);
      throw err;
    }
  }

  /**
   * Retrieves Kubernetes Node information.
   */
  async getNodes(): Promise<k8s.V1Node[]> {
    try {
      const {body} = await this.coreAPI.listNode();
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Nodes', err.body || err);
      return [];
    }
  }

  /**
   * Returns the provider identifier or 'other://' from the K8s cluster.
   */
  private async getProvider(): Promise<string> {
    let provider = 'other://';
    try {
      const nodes = await this.getNodes();
      const foundProvider = nodes.map((n) => n.spec.providerID).find(Boolean);
      if (foundProvider) {
        provider = foundProvider;
      }
    } catch (err) {
      console.error('Unable to fetch Node information:', err.body || err);
    }
    return provider;
  }
}
