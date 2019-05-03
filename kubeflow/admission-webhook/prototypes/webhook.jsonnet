// @apiVersion 0.1
// @name io.ksonnet.pkg.admission-webhook
// @description This prototype creates a admission controller which injects credentials into pods
// @shortDescription This prototype creates a admission controller which injects credentials into pods
// @param name string Name to give to each of the components
// @optionalParam image string gcr.io/kubeflow-images-public/admission-webhook:v20190502-v0-88-gb5732ba0-dirty-2759ff The image for the webhook.
// @optionalParam webhookSetupImage string gcr.io/kubeflow-images-public/ingress-setup:latest The image for setting up ingress.

local webhook = import "kubeflow/admission-webhook/webhook.libsonnet";
local instance = webhook.new(env, params);
instance.list(instance.all)
