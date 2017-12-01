# Training Inception

TODO(jlewi): Publish docker images containing the code to an appropriate (public) GCR repo.

TODO(jlewi): Put the data in an appropriate public GCS bucket.

Artifacts in this directory for training inception models.

The source is split across a variety of repos.
  
  * The PR [jlewi/models/pull/1](https://github.com/jlewi/models/pull/1) contains the changes to the code to train an inception model to support usage with TfJo
  	* The main change is using the TF_CONFIG environment variable to configure the job because the slim framework doesn't do this automatically.
  	* See https://github.com/tensorflow/k8s/issues/192

  *  The PR [jlewi/k8s/pull/1](https://github.com/jlewi/k8s/pull/1) contains a Datalab notebook for building all the artifacts
 	* Docker images with source code for the TfJob
 	* TfJob specs


The jobs can be run on a cluster just by running kubectl

e.g.

```
kubectl create -f tf_job_cpu.yaml
```
