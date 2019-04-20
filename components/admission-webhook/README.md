# Admission Webhook for adding GCP credentials to pods

## Goal
We need a way to inject common data (env vars, volumes) to pods (e.g. notebooks).
See [issue](https://github.com/kubeflow/kubeflow/issues/2641).

## How this works
An [admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
intercepts requests to the Kubernetes API server, and can modify and/or validate the requests.
We are implementing a custom MutatingAdmissionWebhook.

### Configure
Define a [MutatingWebhookConfiguration](https://godoc.org/k8s.io/api/admissionregistration/v1beta1#MutatingWebhookConfiguration),
for example:

```
apiVersion: admissionregistration.k8s.io/v1beta1
kind: MutatingWebhookConfiguration
metadata:
  name: gcp-cred-webhook
  labels:
    app: gcp-cred-webhook
webhooks:
  - name: gcp-cred-webhook.kubeflow.org
    clientConfig:
      service:
        name: gcp-cred-webhook
        namespace: default
        path: "/add-cred"
      caBundle: "..."
    rules:
      - operations: [ "CREATE" ]
        apiGroups: [""]
        apiVersions: ["v1"]
        resources: ["pods"]
    namespaceSelector:
      matchLabels:
        add-gcp-cred: "true"
```

This specifies
1. When there is a pod being created (see `rules`) in the namespace that has labels `add-gcp-cred="true"` (see `namespaceSelector`),
1. call the webhook service `gcp-cred-webhook.default` at path `/add-cred` (see `clientConfig`)

### Webhook implementation
The webhook should be a server that can handled request coming from the configured path (`/add-cred` in the above).
The request and response types are both [AdmissionReview](https://godoc.org/k8s.io/api/admission/v1beta1#AdmissionReview)

The webhook check if the pod has labels:
1. `gcp-cred-secret: SOME_SECRET`
1. `gcp-cred-secret-filename: SOME_KEY.json`

If yes, it will add volume, volumeMount, and environment variable to the pod.

## Reference
1. https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
1. https://github.com/kubernetes/kubernetes/tree/v1.13.0/test/images/webhook
1. https://github.com/morvencao/kube-mutating-webhook-tutorial
1. How to self sign: [link](https://github.com/kubernetes/kubectl/issues/86)
1. What to put for caBundle: [issue](https://github.com/kubernetes/kubernetes/issues/61171)
