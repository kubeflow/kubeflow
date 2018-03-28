// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldash
// @description Deploy centraldash
// @shortDescription Centraldash that contains landing page for UI services.
// @param name string Name to give to the component
// @optionalParam namespace string default Namespace to use for the components.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local centraldash = import "kubeflow/centraldash/centraldash.libsonnet";

std.prune(k.core.v1.list.new(centraldash.parts(params.namespace).all))
