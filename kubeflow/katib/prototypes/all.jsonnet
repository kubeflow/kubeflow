// @apiVersion 0.1
// @name katib
// @description Kubeflow hyperparameter tuning component
// @shortDescription hp-tuning
// @param name string Name to give to each of the components
// @optionalParam modeldbImage string mitdbg/modeldb-backend:latest The image for modeldb
// @optionalParam modeldbDatabaseImage string mongo:3.4 The image for modeldb database.
// @optionalParam modeldbFrontendImage string katib/katib-frontend The image for modeldb frontend.
// @optionalParam suggestionRandomImage string katib/suggestion-random The image for random suggestion.
// @optionalParam suggestionGridImage string katib/suggestion-grid The image for grid suggestion.
// @optionalParam vizierCoreImage string katib/vizier-core The image for vizier core.
// @optionalParam vizierDbImage string mysql:8.0.3 The image for vizier db.

local k = import "k.libsonnet";

local vizier = import "kubeflow/katib/vizier.libsonnet";
local modeldb = import "kubeflow/katib/modeldb.libsonnet";
local suggestion = import "kubeflow/katib/suggestion.libsonnet";

local namespace = env.namespace;

std.prune(
  k.core.v1.list.new(vizier.all(params, namespace))
  + k.core.v1.list.new(suggestion.all(params, namespace))
  + k.core.v1.list.new(modeldb.all(params, namespace))
)
