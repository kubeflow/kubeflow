// @apiVersion 0.1
// @name katib
// @description Kubeflow hyperparameter tuning component
// @shortDescription hp-tuning
// @param name string Name to give to each of the components
// @optionalParam suggestionRandomImage string gcr.io/kubeflow-images-public/katib/suggestion-random:v0.1.2-alpha-156-g4ab3dbd The image for random suggestion.
// @optionalParam suggestionGridImage string gcr.io/kubeflow-images-public/katib/suggestion-grid:v0.1.2-alpha-156-g4ab3dbd The image for grid suggestion.
// @optionalParam suggestionHyperbandImage string gcr.io/kubeflow-images-public/katib/suggestion-hyperband:v0.1.2-alpha-156-g4ab3dbd The image for grid suggestion.
// @optionalParam suggestionBayesianOptimizationImage string gcr.io/kubeflow-images-public/katib/suggestion-bayesianoptimization:v0.1.2-alpha-156-g4ab3dbd The image for grid suggestion.
// @optionalParam vizierCoreImage string gcr.io/kubeflow-images-public/katib/vizier-core:v0.1.2-alpha-156-g4ab3dbd The image for vizier core.
// @optionalParam vizierCoreRestImage string gcr.io/kubeflow-images-public/katib/vizier-core-rest:v0.1.2-alpha-156-g4ab3dbd The image for vizier core rest.
// @optionalParam katibUIImage string gcr.io/kubeflow-images-public/katib/katib-ui:v0.1.2-alpha-156-g4ab3dbd The image for katib ui.
// @optionalParam vizierDbImage string mysql:8.0.3 The image for vizier db.
// @optionalParam studyJobControllerImage string gcr.io/kubeflow-images-public/katib/studyjob-controller:v0.1.2-alpha-156-g4ab3dbd The image for studyjob-controller.
// @optionalParam metricsCollectorImage string gcr.io/kubeflow-images-public/katib/metrics-collector:v0.1.2-alpha-156-g4ab3dbd The image for metrics-collector.
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam clusterDomain string cluster.local DNS config to cluster domain.

local k = import "k.libsonnet";

local studyjobcontroller = import "kubeflow/katib/studyjobcontroller.libsonnet";
local suggestion = import "kubeflow/katib/suggestion.libsonnet";
local vizier = import "kubeflow/katib/vizier.libsonnet";

local namespace = env.namespace;

std.prune(
  k.core.v1.list.new(vizier.all(params, namespace))
  + k.core.v1.list.new(suggestion.all(params, namespace))
  + k.core.v1.list.new(studyjobcontroller.all(params, namespace))
)
