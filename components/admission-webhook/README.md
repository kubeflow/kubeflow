# Admission Webhook for adding GCP credentials to pods

## Goal
We need a way to inject common data (env vars, volumes) to pods (e.g. notebooks).
See [issue](https://github.com/kubeflow/kubeflow/issues/2641).
K8S natively has [PodPreset](https://kubernetes.io/docs/concepts/workloads/pods/podpreset/) with similar use-case, however it is in alpha. 
[admission-controller] and CRD can be used to implement PodPreset as done in [].
We borrowed this PodPreset implelentation and  custimeze it for Kubeflow.  
The code is not directly used as Kubeflow's use case for PodPreset controller is slightly differen. 
In fact, PodPreset in Kubeflow is defined as CRD awithout any custom controller (as oppsed to [here]).

## How this works
Here is the workflow on how this can be used in Kubeflow:

- Users create  PodPreset manifests whcih describe additional runtime requirements to be injected  into a Pod at creation time.
PodPresets use [label selectors]() to specify the Pods to which a given PodPreset applies.
As an example, the following manifest declares a PodPrest to add the secret ```gcp-secret``` in to pods. 

```
apiVersion: "kubeflow.org/v1alpha1"
kind: PodPreset
metadata:
  name: add-gcp-secret
spec:
 selector:
  matchLabels:
    gcpsecret: "true"
 desc: "add gcp credential"
 volumeMounts:
 - name: secret-volume
   mountPath: /secret/gcp
 volumes:
 - name: secret-volume
   secret:
    secretName: gcp-secret
``` 
- Kubeflow components, which are in the charge of creating pods (e.g., notebook controller) add available PodPreset lables to the pods when required.
For Jupyter notebooks, for instance, Notebook UI asks users which PodPreset needs to be applied to the notebook pods [](). 
Notebook-controller, then, adds the corresponding PodPreset labels to Notebook pods.  


- [Admission webhook controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
intercepts requests to the Kubernetes API server, and can modify and/or validate the requests.
Here we  implement admission webhooks which  modify pods based on avalaible PodPresets.
When a pod creattion request is received, the admission webhook looks up the available PodPresets whcih match the pod's label.
It, then, mutates the Pod spec according to PodPreset's spec.
For the above PodPreset example:




1. When there is a pod being created in the namespace that has labels `add-gcp-secret="true"`,
1. call the webhook service `gcp-cred-webhook.default` at path `/add-cred` (see `clientConfig`)

### Webhook implementation
The webhook should be a server that can handled request coming from the configured path (`/add-cred` in the above).
The request and response types are both [AdmissionReview](https://godoc.org/k8s.io/api/admission/v1beta1#AdmissionReview)

The webhook check if the pod has labels:

If yes, it will add volume, volumeMount, and environment variable to the pod.

## Reference
1. https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
1. https://github.com/kubernetes/kubernetes/tree/v1.13.0/test/images/webhook
1. https://github.com/morvencao/kube-mutating-webhook-tutorial
1. How to self sign: [link](https://github.com/kubernetes/kubectl/issues/86)
1. What to put for caBundle: [issue](https://github.com/kubernetes/kubernetes/issues/61171)
