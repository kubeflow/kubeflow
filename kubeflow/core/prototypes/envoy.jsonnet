// @apiVersion 0.1
// @name io.ksonnet.pkg.envoy
// @description Run envoy to do JWT validation.
// @shortDescription Envoy for JWT validation.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam envoyImage string gcr.io/kubeflow-rl/envoy:v20180122-0.4.0-45-g971c754-dirty-d8231 The image for envoy.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local envoy = import "kubeflow/core/envoy.libsonnet";

local name = import 'param://name';
local namespace = import 'param://namespace';

local envoyImage = 'param://envoyImage';

std.prune(k.core.v1.list.new([	
    envoy.parts(namespace).service,
    envoy.parts(namespace).deploy(envoyImage),
    envoy.parts(namespace).configMap,
]))
