local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components.centraldashboard;

local k = import "k.libsonnet";
local release = import "kubeflow/automation/release.libsonnet";
local updatedParams = params {
  extra_args: if params.extra_args == "null" then "" else " " + params.extra_args,
  testing_image: if params.testing_image == "gcr.io/kubeflow-releasing/worker:latest" then "gcr.io/kubeflow-ci/test-worker:latest",
};

std.prune(k.core.v1.list.new(release.parts(updatedParams.namespace, updatedParams.name, updatedParams.testing_image, overrides=updatedParams).release))
