// @apiVersion 0.1
// @name io.ksonnet.pkg.basic-auth
// @description Provides http basic auth for all ambassador traffic.
// @shortDescription Http basic auth.
// @param name string Name for the component
// @param username string Preload username for auth.
// @param pwhash string Preload password hash for auth.
// @optionalParam image string gcr.io/kubeflow-images-public/gatekeeper:v20190123-v0.4.0-rc.1-50-gc95381a4-dirty-36a8c2 Auth service image to use.
// @optionalParam imageui string gcr.io/kubeflow-images-public/kflogin-ui:v20190123-v0.4.0-rc.1-73-g38ad5f77 UI image to use.

local basicauth = import "kubeflow/common/basic-auth.libsonnet";
local instance = basicauth.new(env, params);
instance.list(instance.all)
