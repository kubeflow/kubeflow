// @apiVersion 0.1
// @name katib
// @description Kubeflow hyperparameter tuning component
// @shortDescription hp-tuning
// @param name string Name to give to each of the components
// @optionalParam modeldbImage string gcr.io/kubeflow-images-public/modeldb-backend:v0.2.0 The image for modeldb
// @optionalParam modeldbDatabaseImage string mongo:3.4 The image for modeldb database.
// @optionalParam modeldbFrontendImage string gcr.io/kubeflow-images-public/katib/katib-frontend:v0.1.2-alpha-34-gb46378c The image for modeldb frontend.
// @optionalParam suggestionRandomImage string gcr.io/kubeflow-images-public/katib/suggestion-random:v0.1.2-alpha-34-gb46378c The image for random suggestion.
// @optionalParam suggestionGridImage string gcr.io/kubeflow-images-public/katib/suggestion-grid:v0.1.2-alpha-34-gb46378c The image for grid suggestion.
// @optionalParam vizierCoreImage string gcr.io/kubeflow-images-public/katib/vizier-core:v0.1.2-alpha-34-gb46378c The image for vizier core.
// @optionalParam vizierDbImage string mysql:8.0.3 The image for vizier db.
// @optionalParam studyJobControllerImage string katib/studyjob-controller The image for studyjob-controller.

local k = import "k.libsonnet";

local modeldb = import "kubeflow/katib/modeldb.libsonnet";
local studyjobcontroller = import "kubeflow/katib/studyjobcontroller.libsonnet";
local suggestion = import "kubeflow/katib/suggestion.libsonnet";
local vizier = import "kubeflow/katib/vizier.libsonnet";

local namespace = env.namespace;

std.prune(
  k.core.v1.list.new(vizier.all(params, namespace))
  + k.core.v1.list.new(suggestion.all(params, namespace))
  + k.core.v1.list.new(modeldb.all(params, namespace))
  + k.core.v1.list.new(studyjobcontroller.all(params, namespace))
)
