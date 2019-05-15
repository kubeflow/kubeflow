// This is a jsonnet file to generate a GCB workflow to copy Kubeflow docker images to a personal GCR registry.
//
// The primary purpose of this workflow is to copy Docker images hosted outside of GCR to a 
// a GCR registry so they can be used with private GKE clusters.
{

  // The newRegistry for the image
  local newRegistry = std.extVar("newRegistry"),
  
  // A template for defining the steps  to retag each image.
  local subGraphTemplate(image) = {
    local imagePieces = std.split(image, "/"),
    local imageName = if std.length(imagePieces) > 1 then
      imagePieces[1:]
      else
      [image],
    local nameAndTag = std.split(imageName[std.length(imageName) -1], ":"),

    local name = nameAndTag[0],

    local template = self,

    local newImage = std.join("/", [newRegistry] +  imageName),

    images+: [newImage],

    local pullName = "pull-" + name,
    steps+: [
      {
        id: pullName,
        name: "gcr.io/cloud-builders/docker",
        args: ["pull", image],
        waitFor: ["-"],
      },
      {
        id: "tag-" + name,
        name: "gcr.io/cloud-builders/docker",
        args: ["tag", image, newImage],
        waitFor: ["pull-" + name],
      },
    ],
  },

  local images = [
    "argoproj/argoui:v2.2.0",
    "argoproj/argoexec:v2.2.0",
    "argoproj/workflow-controller:v2.2.0",
    "gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.2.1",
    "gcr.io/cloud-solutions-group/esp-sample-app:1.0.0",
    "gcr.io/ml-pipeline/api-server:0.1.17",
    "gcr.io/ml-pipeline/persistenceagent:0.1.17",
    "gcr.io/ml-pipeline/scheduledworkflow:0.1.17",
    "gcr.io/ml-pipeline/frontend:0.1.17",
    "gcr.io/ml-pipeline/viewer-crd-controller:0.1.17",
    "metacontroller/metacontroller:v0.3.0",
    "minio/minio:RELEASE.2018-02-09T22-40-05Z",
    "mysql:8.0.3",
    "quay.io/datawire/ambassador:0.37.0",
  ],

  local steps = std.map(subGraphTemplate, images),

  local combine(l, r) = l+r,
  all: std.foldl(combine, steps, {}),
}.all