// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @optionalParam namespace string default Namespace

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local argo = import "kubeflow/argo/argo.libsonnet";

std.prune(k.core.v1.list.new(argo.parts.(params.namespace).all))
