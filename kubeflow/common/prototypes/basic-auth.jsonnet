// @apiVersion 0.1
// @name io.ksonnet.pkg.basic-auth
// @description Provides http basic auth for all ambassador traffic.
// @shortDescription Http basic auth.
// @param name string Name for the component
// @param username string Preload username for auth.
// @param pwhash string Preload password hash for auth.
// @optionalParam image string gcr.io/kubeflow-images-public/gatekeeper:test005 Auth service image to use.
// @optionalParam imageui string gcr.io/kubeflow-images-public/kflogin-ui:test012205 UI image to use.

local basicauth = import "kubeflow/common/basic-auth.libsonnet";
local instance = basicauth.new(env, params);
instance.list(instance.all)
