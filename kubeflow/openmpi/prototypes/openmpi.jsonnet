// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-openmpi
// @description Prototypes for running openmpi jobs.
// @shortDescription Prototypes for running openmpi jobs.
// @param name string Name to give to each of the components.
// @param image string Docker image with openmpi.
// @param secret string Name of secret containing ssh keys.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam workers number 4 Number of workers.
// @optionalParam init string null Command to bootstrap the containers. Defaults to init.sh.
// @optionalParam exec string null Command to execute in master after bootstrap is done. It sleeps indefinitely if not set.
// @optionalParam imagePullPolicy string IfNotPresent Image pull policy (either IfNotPresent or Always).
// @optionalParam gpu number 0 Number of GPUs per worker.
// @optionalParam cpu string null CPU limits per worker.
// @optionalParam memory string null Memory limits per worker.
// @optionalParam schedulerName string default-scheduler scheduler name to use for the components.
// @optionalParam controllerImage string jiez/openmpi-controller:latest Docker image of the openmpi-controller.
// @optionalParam initTimeout number 300 Timeout in seconds to abort the initialization.
// @optionalParam nodeSelector string null Comma-delimited list of "key=value" pairs to select the worker nodes. e.g. "cloud.google.com/gke-accelerator=nvidia-tesla-k80"

local k = import "k.libsonnet";
local openmpi = import "kubeflow/openmpi/all.libsonnet";

std.prune(k.core.v1.list.new(openmpi.all(params, env)))
