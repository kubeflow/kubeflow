# Istio manifest for Kubeflow

The manifest is taken from OSS Istio 1.1.6. Download it by:
```
curl -L https://git.io/getLatestIstio | ISTIO_VERSION=1.1.6 sh -
```

In the directory `istio-1.1.6`:

- `crds.yaml` is the combination of `install/kubernetes/helm/istio-init/files/*.yaml`.
- `istio-noauth.yaml` is `install/kubernetes/istio-demo.yaml`.

We need custom configuration as discussed in the
[issue](https://github.com/kubeflow/kubeflow/issues/1909#issuecomment-438409215).

Specifically, the things we changed are:

1. The service type of `istio-ingressgateway` is changed from `LoadBalancer` to `NodePort`.
1. Add annotation to service `istio-ingressgateway`: `beta.cloud.google.com/backend-config: XXX`.
   This is to [enable IAP](https://cloud.google.com/iap/docs/enabling-kubernetes-howto#kubernetes-configure).
1. We break down the items of "kind: list" k8s resouces into seperate resources because our code can't handle list yet.

*Notice*: 
* The policy of configmap `istio-sidecar-injector` is `enabled`. To turn on injection for certain namespace, add namespace 
label `istio-injection: enabled`. More details see [table](https://github.com/istio/istio/issues/6476#issuecomment-399219937).

*TODO*: To allow egress, we need to know cluster specific IP ranges. Also, Istio's recommended way is to use
serviceEntry. We will figure out this part later.
