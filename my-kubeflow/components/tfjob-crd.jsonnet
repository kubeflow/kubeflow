local params = std.extVar("__ksonnet/params").components["tfjob-crd"];
local k = import "k.libsonnet";

// TODO(jlewi): We should add an option to configure with a config file since some deployments don't
// need it. I think we'd have a base deployment and then an option withConfigFile.
local tfJobDeploy = {
  "apiVersion": "extensions/v1beta1", 
  "kind": "Deployment", 
  "metadata": {
    "name": "tf-job-operator"
  }, 
  "spec": {
    "replicas": 1, 
    "template": {
      "metadata": {
        "labels": {
          "name": "tf-job-operator"
        }
      }, 
      "spec": {
        "containers": [
          {
            "command": [
              "/opt/mlkube/tf_operator", 
              "--controller_config_file=/etc/config/controller_config_file.yaml", 
              "-alsologtostderr", 
              "-v=1"
            ], 
            "env": [
              {
                "name": "MY_POD_NAMESPACE", 
                "valueFrom": {
                  "fieldRef": {
                    "fieldPath": "metadata.namespace"
                  }
                }
              }, 
              {
                "name": "MY_POD_NAME", 
                "valueFrom": {
                  "fieldRef": {
                    "fieldPath": "metadata.name"
                  }
                }
              }
            ], 
            "image": params.image, 
            "name": "tf-job-operator", 
            "volumeMounts": [
              {
                "mountPath": "/etc/config", 
                "name": "config-volume"
              }
            ]
          }
        ], 
        "serviceAccountName": "tf-job-operator", 
        "volumes": [
          {
            "configMap": {
              "name": "tf-job-operator-config"
            }, 
            "name": "config-volume"
          }
        ]
      }
    }
  }
};

local configMap = {
  "apiVersion": "v1", 
  "data": {
    "controller_config_file.yaml": "grpcServerFilePath: /opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py\naccelerators:\n  alpha.kubernetes.io/nvidia-gpu:\n    volumes:\n      - name: nvidia-libraries\n        mountPath: /usr/local/nvidia/lib64 # This path is special; it is expected to be present in `/etc/ld.so.conf` inside the container image.\n        hostPath: /home/kubernetes/bin/nvidia/lib\n      - name: nvidia-debug-tools # optional\n        mountPath: /usr/local/bin/nvidia\n        hostPath: /home/kubernetes/bin/nvidia/bin"
  }, 
  "kind": "ConfigMap", 
  "metadata": {
    "name": "tf-job-operator-config"
  }
};

local serviceAccount = {
  "apiVersion": "v1", 
  "kind": "ServiceAccount", 
  "metadata": {
    "labels": {
      "app": "tf-job-operator"
    }, 
    "name": "tf-job-operator"
  }
};

local clusterRole = {
  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
  "kind": "ClusterRole", 
  "metadata": {
    "labels": {
      "app": "tf-job-operator"
    }, 
    "name": "tf-job-operator"
  }, 
  "rules": [
    {
      "apiGroups": [
        "tensorflow.org"
      ], 
      "resources": [
        "tfjobs"
      ], 
      "verbs": [
        "*"
      ]
    }, 
    {
      "apiGroups": [
        "apiextensions.k8s.io"
      ], 
      "resources": [
        "customresourcedefinitions"
      ], 
      "verbs": [
        "*"
      ]
    }, 
    {
      "apiGroups": [
        "storage.k8s.io"
      ], 
      "resources": [
        "storageclasses"
      ], 
      "verbs": [
        "*"
      ]
    }, 
    {
      "apiGroups": [
        "batch"
      ], 
      "resources": [
        "jobs"
      ], 
      "verbs": [
        "*"
      ]
    }, 
    {
      "apiGroups": [
        ""
      ], 
      "resources": [
        "configmaps", 
        "pods", 
        "services", 
        "endpoints", 
        "persistentvolumeclaims", 
        "events"
      ], 
      "verbs": [
        "*"
      ]
    }, 
    {
      "apiGroups": [
        "apps", 
        "extensions"
      ], 
      "resources": [
        "deployments"
      ], 
      "verbs": [
        "*"
      ]
    }
  ]
};

local clusterRoleBinding = {
  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
  "kind": "ClusterRoleBinding", 
  "metadata": {
    "labels": {
      "app": "tf-job-operator"
    }, 
    "name": "tf-job-operator"
  }, 
  "roleRef": {
    "apiGroup": "rbac.authorization.k8s.io", 
    "kind": "ClusterRole", 
    "name": "tf-job-operator"
  }, 
  "subjects": [
    {
      "kind": "ServiceAccount", 
      "name": "tf-job-operator", 
      "namespace": "default"
    }
  ]
};

k.core.v1.list.new([tfJobDeploy, serviceAccount, configMap, clusterRole, clusterRoleBinding])