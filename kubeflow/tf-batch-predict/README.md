# tf-batch-predict

> TensorFlow serving is a server for TensorFlow models.


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.tf-batch-predict](#io.ksonnet.pkg.tf-batch-predict)

## Quickstart

*The following commands use the `io.ksonnet.pkg.tf-batch-predict` prototype to generate Kubernetes YAML for tf-batch-predict, and then deploys it as a job to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-batch-predict tf-batch-predict \
  --name tf-batch-predict \
  --namespace default

# Apply to server.
$ ks apply -f tf-batch-predict.jsonnet
```

## Using the library

The library files for tf-batch-predict define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure tf-batch-predict for a wide variety of scenarios.

This library provides a set of pre-fabricated "flavors" (or "distributions") of tf-batch-predict, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.tf-batch-predict


#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-batch-predict tf-batch-predict \
  --name YOUR_NAME_HERE \
  --model_path YOUR_MODEL_PATH_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]

Run the following command to set up a batch-predict job

ks param set kf-tf-batch inputFileFormat tfrecord
ks param set kf-tf-batch modelPath  gs://your-bucket/kubeflow/object_detection/saved_model
ks param set kf-tf-batch inputFilePatterns gs://your-bucket/kubeflow/object_detection/input.tfrecord
ks param set kf-tf-batch outputResultPrefix gs://your-bucket/kubeflow/output/nw_object_result
ks param set kf-tf-batch outputErrorPrefix gs://your-bucket/kubeflow/output/nw_object_error
ks param set kf-tf-batch batchSize 1
ks param set kf-tf-batch numGpus 1


[rootReadme]: https://github.com/ksonnet/mixins
