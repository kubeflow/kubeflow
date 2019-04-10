// @apiVersion 0.1
// @name io.ksonnet.pkg.paddle-operator
// @description Paddle Operator
// @shortDescription Paddle Operator for distributed paddle on Kubernetes
// @param name string Name to give to each of the components
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to jupyter environments.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam paddleJobImage string ppl521/paddle-operator:6.0 The image for the Paddle controller
// @optionalParam paddleDefaultImage string null The default image to use for paddle
// @optionalParam paddleJobVersion string Fluid which version of the PaddleJob operator to use
// @optionalParam deploymentScope string cluster The scope at which paddle-operator should be deployed - valid values are cluster, namespace.
// @optionalParam deploymentNamespace string null The namespace to which paddle-operator should be scoped. If deploymentScope is set to cluster, this is ignored.

local k = import "k.libsonnet";
local operator = import "kubeflow/paddle-job/paddle-operator.libsonnet";

std.prune(k.core.v1.list.new(operator.all(params, env)))
