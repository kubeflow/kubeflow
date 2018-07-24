# Request logging for TF Serving

It currently supports streaming to BigQuery.

## Motivation
Logging the requests and responses enables log analysis, continuous training, and skew detection.

## Usage:
Create a GCP service account that has access to insert to your bigquery dataset.
Create a secret in the cluster with the service account json key.
```
ks pkg install kubeflow/examples
ks generate tf-serving-request-log mnist
```

Modify bigquery dataset and schema in `fluent.conf`.
Modify `tf-serving-with-request-log.jsonnet` as needed:
  - change the gcpSecretName
  - change the param of http proxy for logging, e.g. `--request_log_prob=0.1` (Default is 0.01).

```
ks apply YOUR_ENV -c mnist
```

Start sending requests, and the fluentd worker will stream them to Bigquery.

## Next steps:
1. Support different backends other than Bigquery
1. Support request id (so that the logs can be joined). [Issue]()
1. Optionally logs response and other metadata. We probably need a log config other than just sampling probability.
