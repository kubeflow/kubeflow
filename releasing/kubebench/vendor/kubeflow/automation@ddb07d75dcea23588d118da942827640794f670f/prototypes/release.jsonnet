// @apiVersion 0.1
// @name release
// @description image auto release workflow.
// @shortDescription setup auto release of any image in 30 min.
// @param name string Name to give to each of the components
// @param image string Image name to give to released image
// @param dockerfileDir string Path to dockerfile used for releasing image
// @optionalParam cluster string kubeflow-releasing Self explanatory.
// @optionalParam gcpCredentialsSecretName string gcp-credentials Name of GCP credential stored in cluster as a secret.
// @optionalParam namespace string kubeflow-releasing Self explanatory.
// @optionalParam nfsVolumeClaim string nfs-external Volumn name.
// @optionalParam project string kubeflow-releasing Self explanatory.
// @optionalParam registry string gcr.io/kubeflow-images-public Registry where the image will be pushed to.
// @optionalParam testing_image string gcr.io/kubeflow-releasing/worker:latest The image where we run the workflow.
// @optionalParam zone string us-central1-a GKE zone.
// @optionalParam bucket string kubeflow-releasing-artifacts GCS bucket storing artifacts.
// @optionalParam prow_env string REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master Self explanatory.
// @optionalParam versionTag string latest Tag for released image.
// @optionalParam dockerfile string Dockerfile Name of your dockerfile.
// @optionalParam extra_repos string kubeflow/testing@HEAD Append your repo here (; separated) if your image is not in kubeflow.
// @optionalParam extra_args string null args for your build_image.sh

local k = import "k.libsonnet";
local release = import "kubeflow/automation/release.libsonnet";
local updatedParams = params {
  extra_args: if params.extra_args == "null" then "" else " " + params.extra_args,
};

std.prune(k.core.v1.list.new(release.parts(updatedParams.namespace, updatedParams.name, overrides=updatedParams).release))
