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
            "image": "gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0",
            "name": "notebook",
            args: [
              "start.sh",
              "jupyter",
              "lab",
              "--LabApp.token=''",
              "--LabApp.allow_remote_access='True'",
              "--LabApp.allow_root='True'",
              "--LabApp.ip='*'",
              "--LabApp.base_url=/" + env.namespace + "/" + params.name + "/",
              "--port=8888",
              "--no-browser",
            ],
            env: [
              {
                name: "JUPYTER_ENABLE_LAB",
                value: "true",
              },
            ],
            "resources": {
              "requests": {
                "cpu": "500m",
                "memory": "1Gi"
              }
            },
            "workingDir": "/home/jovyan"
          }
        ],
      }
    }
  }
};

k.core.v1.list.new([
  jupyter,
])
