// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-envoy
// @description Envoy proxies to handle ingress for IAP.
// @shortDescription Envoy proxies to handle ingress and IAP.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam envoyImage string gcr.io/kubeflow/envoy:v20180124-0.4.0-50-g0d29aac-dirty-4d9e20 The image for envoy.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @param audiences string Comma separated list of JWT audiences to accept


// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local iap = import "kubeflow/core/iap.libsonnet";
local util = import "kubeflow/core/util.libsonnet";

local name = import 'param://name';
local namespace = import 'param://namespace';

local envoyImage = import 'param://envoyImage';
local audiencesParam = import 'param://audiences';
local audiences = std.split(audiencesParam, ',');
local disableJwtCheckingParam = import 'param://disableJwtChecking';
local disableJwtChecking = util.toBool(disableJwtCheckingParam);

iap.parts(namespace).envoy(envoyImage, audiences, disableJwtChecking)
