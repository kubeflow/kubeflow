// @apiVersion 0.1
// @name io.ksonnet.pkg.pytorch-operator
// @description PyTorch Operator
// @shortDescription PyTorch Operator for distributed pytorch on Kubernetes
// @param name string Name to give to each of the components
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to jupyter environments.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam pytorchJobImage string gcr.io/kubeflow-images-public/pytorch-operator@sha256:67cf6445c85537882c2b9f0fbe42e170b9f7988942184f147184a6870cfe49ba The image for the PyTorchJob controller
// @optionalParam pytorchDefaultImage string null The default image to use for pytorch
// @optionalParam deploymentScope string cluster The scope at which pytorch-operator should be deployed - valid values are cluster, namespace.
// @optionalParam deploymentNamespace string null The namespace to which pytorch-operator should be scoped. If deploymentScope is set to cluster, this is ignored.
// @optionalParam enableGangScheduling string false If set true, enable gang scheduling by kube-batch.
// @optionalParam monitoringPort string 8443 Port for monitoring agent to scrape metrics from.

local k = import "k.libsonnet";
local operator = import "kubeflow/pytorch-job/pytorch-operator.libsonnet";

k.core.v1.list.new(operator.all(params, env))
