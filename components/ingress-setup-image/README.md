# Ingress Setup

Ingress Setup is a docker image which is used to run scripts for setting up ingress. We build this and push it to gcr so that it can be used in private GKE clusters

To build and push this, on x86_64 machines, run

```
docker build . -t gcr.io/kubeflow-images-public/ingress-setup:latest
docker push gcr.io/kubeflow-images-public/ingress-setup:latest
```

on AArch64 machines, run

```
docker build . -t google-cloud-sdk:debian10 -f Dockerfile.base.arm64
docker build . -t gcr.io/kubeflow-images-public/ingress-setup:latest --build-arg BASE_IMAGE=google-cloud-sdk:debian10
docker push gcr.io/kubeflow-images-public/ingress-setup:latest
```

