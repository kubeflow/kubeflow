// @apiVersion 0.1
// @name io.ksonnet.pkg.gcp-credentials-admission-webhook
// @description This prototype creates a admission controller which injects credentials into pods
// @shortDescription This prototype creates a admission controller which injects credentials into pods
// @param name string Name to give to each of the components
// @optionalParam image string gcr.io/kubeflow-images-public/gcp-admission-webhook:v20190316-v0.4.0-rc.1-227-gac45af55-dirty-3f9236 The image for the webhook.
// @optionalParam webhookSetupImage string gcr.io/kubeflow-images-public/ingress-setup:latest The image for setting up ingress.

local webhook = import "kubeflow/credentials-admission-webhook/webhook.libsonnet";
local instance = webhook.new(env, params);
instance.list(instance.all)
