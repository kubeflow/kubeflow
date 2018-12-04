# Istio manifest for Kubeflow

The manifest is taken from OSS Istio release 1.0.2.

We need custom configuration as discussed in the
[issue](https://github.com/kubeflow/kubeflow/issues/1909#issuecomment-438409215).

Specifically, the things we changed are:

1. The policy of configmap `istio-sidecar-injector` is changed from `enabled` to `disabled`.
   According to this [table](https://github.com/istio/istio/issues/6476#issuecomment-399219937),
   `policy=disabled` and `namespace label=enabled` is what we want.
1. The service type of `istio-ingressgateway` is changed from `LoadBalancer` to `NodePort`.

*TODO*: To allow egress, we need to know cluster specific IP ranges. Also, Istio's recommended way is to use
serviceEntry. We will figure out this part later.
