# tf-batch-predict

Kubeflow TensorFlow batch-predict can be used to run batch predict job for TensorFlow models
in a Kubenetes cluster.


* [Quickstart](#quickstart)

## Quickstart

*The following commands use the `tf-batch-predict` prototype to generate Kubernetes YAML for tf-batch-predict, and then deploys it as a job to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a ksonnet application, do so using `ks init <app-name>`.

In the ksonnet application directory, run the following:

```shell
# Set the environment and add a registery to the ks app.
$ ks env set default --namespace <my_namespace>
$ ks registry add my-registry <my_repo>/kubeflow/kubeflow


# Install kubeflow core and tf-batch-prediction from the registry.
$ ks pkg install my-reigtstry/core
$ ks pkg install my-reigtstry/tf-batch-predict


# Create tf-batch-prediction component.
$ ks generate tf-batch-predict my-component


# Set parameters for the batch-predict job
$ ks param set my-component --env=default gcpCredentialSecretName my-secret
$ ks param set my-component inputFileFormat tfrecord
$ ks param set my-component numGpus 1
$ ks param set my-component cloud gcp


# Apply to server.
$ ks show default -c my-component
$ ks apply default -f my-component
```

### Parameters

The available options to pass prototype are:

* `--modelPath`: The path where TF model files in SavedModel format are saved.
* `--inputFileFormat`: One of json, tfrecord, tfrecord_gzip
* `--inputFilePatterns`: The list of input files or file patterns, separated by commas.
* `--outputResultPrefix`: The output path prefix to the prediction results.
* `--outputErrorPrefix`: The output path prefix to the prediction errors.
* `--batchSize`: Number of records in one batch in the input data.
* `--numGpus`: Number of GPUs to use. Default to not use any GPUs.

[rootReadme]: https://github.com/ksonnet
