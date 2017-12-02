# Training Inception

TODO(jlewi): Publish docker images containing the code to an appropriate (public) GCR repo.

TODO(jlewi): Put the data in an appropriate public GCS bucket.

Artifacts in this directory for training inception models.

The source is split across a variety of repos.
  
  *  The PR [jlewi/k8s/pull/1](https://github.com/jlewi/k8s/pull/2) contains a Datalab notebook for building all the artifacts
 	* Docker images with source code for the TfJob
 	* TfJob specs

The code for training the model is unmodified from
https://github.com/tensorflow/benchmarks/tree/master/scripts/tf_cnn_benchmarks

The jobs can be run on a cluster just by running kubectl

e.g.

```
kubectl create -f tf_job_cpu.yaml
```
