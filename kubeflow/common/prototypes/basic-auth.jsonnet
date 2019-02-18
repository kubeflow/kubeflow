// @apiVersion 0.1
// @name io.ksonnet.pkg.basic-auth
// @description Provides http basic auth for all ambassador traffic.
// @shortDescription Http basic auth.
// @param name string Name for the component
// @optionalParam authSecretName string kubeflow-login Contains username and passwordhash for UI/API auth.
// @optionalParam image string gcr.io/kubeflow-images-public/gatekeeper:v20190211-v0.4.0-rc.1-119-g5098995b-e3b0c4 Auth service image to use.
// @optionalParam imageui string gcr.io/kubeflow-images-public/kflogin-ui:v20190123-v0.4.0-rc.1-73-g38ad5f77 UI image to use.

local basicauth = import "kubeflow/common/basic-auth.libsonnet";
local instance = basicauth.new(env, params);
instance.list(instance.all)
