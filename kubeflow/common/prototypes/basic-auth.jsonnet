// @apiVersion 0.1
// @name io.ksonnet.pkg.basic-auth
// @description Provides http basic auth for all ambassador traffic.
// @shortDescription Http basic auth.
// @param name string Name for the component
// @optionalParam authSecretName string kubeflow-login Contains username and passwordhash for UI/API auth.
// @optionalParam image string gcr.io/kubeflow-images-public/gatekeeper:v0.5.0 Auth service image to use.
// @optionalParam imageui string gcr.io/kubeflow-images-public/kflogin-ui:v0.5.0 UI image to use.
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam clusterDomain string cluster.local DNS config to cluster domain.

local basicauth = import "kubeflow/common/basic-auth.libsonnet";
local instance = basicauth.new(env, params);
instance.list(instance.all)
