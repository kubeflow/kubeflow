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
            "resources": {
              "requests": {
                "cpu": "500m", 
                "memory": "1Gi"
              }
            }, 
            "workingDir": "/home/jovyan"
          }
        ], 
        "securityContext": [
          {
            "fsGroup": 100, 
            "runAsUser": 1000
          }
        ], 
        "ttlSecondsAfterFinished": 300
      }
    }
  }
};

k.core.v1.list.new([
  jupyter,
])