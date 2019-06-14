// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name
// @param admin string cluster admin user id
// @optionalParam image string gcr.io/kubeflow-images-public/profile-controller:v20190228-v0.4.0-rc.1-192-g1a802656-dirty-f95773 The image to use for controller
// @optionalParam prefix string kfam The prefix under which the app is accessed
// @optionalParam kfamimage string gcr.io/kubeflow-images-public/kfam:v20190612-v0-170-ga06cdb79-dirty-a33ee4 kfam image


local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)
