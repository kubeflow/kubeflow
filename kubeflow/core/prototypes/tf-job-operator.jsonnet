// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-job-operator
// @description A TensorFlow job operator CRD
// @shortDescription A TensorFlow job operator.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam tfAmbassadorServiceType string ClusterIP The service type for the API Gateway.
// @optionalParam tfJobImage string gcr.io/kubeflow-images-public/tf_operator:v20180522-77375baf The image for the TfJob controller.
// @optionalParam tfDefaultImage string null The default image to use for TensorFlow.
// @optionalParam tfJobUiServiceType string ClusterIP The service type for the UI.
// @optionalParam tfJobVersion string v1alpha1 which version of the TFJob operator to use

// TODO(https://github.com/ksonnet/ksonnet/issues/235): ks param set args won't work if the arg starts with "--".

local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components["tf-job-operator"];
local k = import "k.libsonnet";
local tfjob = import "kubeflow/core/tf-job-operator.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

std.prune(k.core.v1.list.new(tfjob.all(updatedParams)))
