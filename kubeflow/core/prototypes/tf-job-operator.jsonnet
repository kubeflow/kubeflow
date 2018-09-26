// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-job-operator
// @description A TensorFlow job operator CRD
// @shortDescription A TensorFlow job operator.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam tfJobImage string gcr.io/kubeflow-images-public/tf_operator:v0.3.0 The image for the TfJob controller.
// @optionalParam tfDefaultImage string null The default image to use for TensorFlow.
// @optionalParam tfJobUiServiceType string ClusterIP The service type for the UI.
// @optionalParam tfJobVersion string v1alpha2 which version of the TFJob operator to use
// @optionalParam deploymentScope string cluster The scope at which tf-job-operator should be deployed - valid values are cluster, namespace.
// @optionalParam deploymentNamespace string null The namespace to which tf-job-operator should be scoped. If deploymentScope is set to cluster, this is ignored.

local tfJobOperator = import "kubeflow/core/tf-job-operator.libsonnet";
local instance = tfJobOperator.new(env, params);
instance.list(instance.all)
