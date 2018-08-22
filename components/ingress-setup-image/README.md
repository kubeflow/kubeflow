# Ingress Setup

Ingress Setup is a docker image which is used to run scripts for setting up ingress. We build this and push it to gcr so that it can be used in private GKE clusters

To build and push this, run

```
docker build . -t gcr.io/kubeflow-images-public/ingress-setup:latest
docker push gcr.io/kubeflow-images-public/ingress-setup:latest
```
