# IAP Enabler

IAP Enabler is a docker image which is used to enable iap. We build this and push it to gcr so that it can be used in private GKE clusters

To build and push this, run

```
docker build . -t gcr.io/kubeflow-images-public/iap-enabler:latest
docker push gcr.io/kubeflow-images-public/iap-enabler:latest
```
