## Goal
We need a way to inject common data (env vars, volumes) to pods (e.g. notebooks).
See [issue](https://github.com/kubeflow/kubeflow/issues/2641).
K8s has [PodPreset](https://kubernetes.io/docs/concepts/workloads/pods/podpreset/) resource with similar use-case, however it is in alpha. 
K8s [admission-controller](https://godoc.org/k8s.io/api/admissionregistration/v1beta1#MutatingWebhookConfiguration) and CRD can be used to implement PodPreset as done in [here](https://github.com/jpeeler/podpreset-crd).
We borrowed this PodPreset implementation, customize it for Kubeflow and rename it to PodDefault to avoid confusion.  
The code is not directly used as Kubeflow's use case for PodDefault controller is slightly different. 
In fact, PodDefault in Kubeflow is defined as CRD without the  custom controller (as opposed to [here](https://github.com/jpeeler/podpreset-crd)).

## How this works
Here is the workflow on how this is used in Kubeflow:

1. Users create  PodDefault manifests which describe additional runtime requirements (i.e., volume, volumeMounts, environment variables) to be injected  into a Pod at creation time.
PodDefaults use label selectors to specify the Pods to which a given PodDefault applies.
PodDefaults are namespace scope, i.e., they can be applied/viewed in the namespace.  
As an example, the following manifest declares a PodPrest in `kubeflow` namespace to add the secret ```gcp-secret``` in to pods in the given namespace. 

```
apiVersion: "kubeflow.org/v1alpha1"
kind: PodDefault
metadata:
  name: add-gcp-secret
  namespace: kubeflow
spec:
 selector:
  matchLabels:
    add-gcp-secret: "true"
 desc: "add gcp credential"
 volumeMounts:
 - name: secret-volume
   mountPath: /secret/gcp
 volumes:
 - name: secret-volume
   secret:
    secretName: gcp-secret
``` 
1.  Kubeflow components, which are in charge of creating pods (e.g., notebook controller) add some of available PodDefault labels to the pods when required.
For Jupyter notebooks, for instance, Notebook UI asks users which PodDefault needs to be applied to the notebook pods (see [this issue](https://github.com/kubeflow/kubeflow/issues/2992)). 
Notebook-controller, then, adds the corresponding PodDefault labels to Notebook pods.  


1. [Admission webhook controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
in general, intercepts requests to the Kubernetes API server, and can modify and/or validate the requests.
Here the  admission webhook is implemented to  modify pods based on the available PodDefaults.
When a pod creation request is received, the admission webhook looks up the available PodDefaults which match the pod's label.
It then, mutates the Pod spec according to PodDefault's spec.
For the above PodDefault, when a pod creation request comes which has the label `add-gcp-secret:"true"', it appends the volume and volumeMounts 
to the pod as described in the PodDefault spec.

## Webhook Configuration
Define a [MutatingWebhookConfiguration](https://godoc.org/k8s.io/api/admissionregistration/v1beta1#MutatingWebhookConfiguration),
for example:

```
apiVersion: admissionregistration.k8s.io/v1beta1
kind: MutatingWebhookConfiguration
metadata:
  name: gcp-cred-webhook
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
```

This specifies
1. When there is a pod being created (see `rules`),
1. call the webhook service `gcp-cred-webhook.default` at path `/add-cred` (see `clientConfig`)


### Webhook implementation
The webhook should be a server that can handle request coming from the configured path (`/add-cred` in the above).
The request and response types are both [AdmissionReview](https://godoc.org/k8s.io/api/admission/v1beta1#AdmissionReview)

## Reference
1. [K8S PodPreset](https://kubernetes.io/docs/concepts/workloads/pods/podpreset)
1. https://github.com/jpeeler/podpreset-crd
1. https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
1. https://github.com/kubernetes/kubernetes/tree/v1.13.0/test/images/webhook
1. https://github.com/morvencao/kube-mutating-webhook-tutorial
1. How to self sign: [link](https://github.com/kubernetes/kubectl/issues/86)
1. What to put for caBundle: [issue](https://github.com/kubernetes/kubernetes/issues/61171)

