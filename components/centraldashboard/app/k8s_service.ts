import * as k8s from "@kubernetes/client-node";

/** Wrap Kubernetes API calls in a simpler interface for use in routes. */
export class KubernetesService {

    private kubeConfig: k8s.KubeConfig;
    private k8sApi: k8s.Core_v1Api;

    constructor() {
        this.kubeConfig = new k8s.KubeConfig();
        this.kubeConfig.loadFromDefault();
        this.k8sApi = this.kubeConfig.makeApiClient(k8s.Core_v1Api);
    }

    async getNamespaces(): Promise<k8s.V1Namespace[]> {
        const { body } = await this.k8sApi.listNamespace();
        return body.items;
    }

    async getEventsForNamespace(namespace: string): Promise<k8s.V1Event[]> {
        const { body } = await this.k8sApi.listNamespacedEvent(namespace);
        return body.items;
    }

}