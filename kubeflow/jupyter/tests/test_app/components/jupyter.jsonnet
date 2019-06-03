// Component to launch a jupyter notebook
//
local k = import "k.libsonnet";
local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components.jupyter;


local jupyter = {
  "apiVersion": "kubeflow.org/v1alpha1",
  "kind": "Notebook",
  "metadata": {
    "name": params.name,
    "namespace":  env.namespace,
  },
  "spec": {
    "template": {
      "spec": {
        "containers": [
          {
            "image": "gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-cpu:v0.5.0",
            "name": "notebook",
            "resources": {
              "requests": {
                "cpu": "500m",
                "memory": "1Gi"
              }
            },
          }
        ],
      }
    }
  }
};

k.core.v1.list.new([
  jupyter,
])
