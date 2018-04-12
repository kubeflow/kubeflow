// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-openmpi
// @description Prototypes for running openmpi jobs.
// @shortDescription Prototypes for running openmpi jobs.
// @param name string Name to give to each of the components.
// @param image string Docker image with openmpi.
// @param secret string Name of secret containing ssh keys.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam workers number 4 Number of workers.

local k = import "k.libsonnet";
local openmpi = import "kubeflow/openmpi/all.libsonnet";

std.prune(k.core.v1.list.new(openmpi.parts(params, env).all))
