// @apiVersion 0.1
// @name io.ksonnet.pkg.envoy
// @description Run envoy to do JWT validation.
// @shortDescription Envoy for JWT validation.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam envoyImage string gcr.io/kubeflow-rl/envoy:latest The image for envoy.
// @param secretName string The name of the secret to use for TLS.
// @param ipName string The name of the global ip address to use.
// @param audiences string Comma separated list of JWT audiences to accept


// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local envoy = import "kubeflow/core/envoy.libsonnet";

local name = import 'param://name';
local namespace = import 'param://namespace';

local envoyImage = 'param://envoyImage';
local secretName = 'param://secretName';
local ipName = 'param://ipName';
local audiences = std.split('param://audiences', ',');

envoy.parts(namespace).all(envoyImage, secretName, ipName, audiences)
