# Admission Webhook component

This is for inserting GCP credentials to pods.
See more detail [here](https://github.com/kubeflow/kubeflow/tree/master/components/gcp-admission-webhook).

We deploy a Job to provision a self signed cert.
See `create_ca.sh`.

## Reference:
1. How to self sign: [link](https://github.com/kubernetes/kubectl/issues/86)
1. What to put for caBundle: [issue](https://github.com/kubernetes/kubernetes/issues/61171)
