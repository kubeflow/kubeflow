# Istio integration for TF serving

[Istio](https://istio.io/) provides a lot of functionalities that we want to have, such as metrics, auth and
quota, rollout and A/B testing. We have an [issue](https://github.com/kubeflow/kubeflow/issues/464) to track
the progress.

## Install Istio
Following the istio [doc](https://istio.io/docs/setup/kubernetes/quick-start.html#installation-steps).
After the installation, you should see services istio-pilot and istio-mixer in namespace istio-system.

## Kubeflow TF Serving with Istio

This document is working in progress.

Istio by default [denies egress traffic](https://istio.io/docs/tasks/traffic-management/egress.html).
Since TF serving component might need to read model files from outside (GCS, S3 etc), we need some
cloud-specific [setting](https://istio.io/docs/tasks/traffic-management/egress.html#calling-external-services-directly). 
Currently it's for GCP only.

After installing Istio, we can deploy the TF Serving component as in [README](README.md) with
additional params:
```
ks param set --env=cloud ${MODEL_COMPONENT} cloud gcp
ks param set --env=cloud ${MODEL_COMPONENT} deployIstio true
```

This will inject an istio sidecar in the TF serving deployment.

### Metrics
The istio sidecar reports data to [Mixer](https://istio.io/docs/concepts/policy-and-control/mixer.html).
We can view the istio dashboard by [installing Grafana](https://istio.io/docs/tasks/telemetry/using-istio-dashboard.html#viewing-the-istio-dashboard).
Execute the command:
```
kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &
```
Visit http://localhost:3000/dashboard/db/istio-dashboard in your web browser.
Send some requests to the TF serving service, then there should be some data (QPS, success rate, latency) like
![istio dashboard](istio-dashboard.png)


#### Define and view metrics
See istio [doc](https://istio.io/docs/tasks/telemetry/metrics-logs.html).
