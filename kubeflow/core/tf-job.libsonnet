
{  
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.
  parts(namespace):: {
    // TODO(jlewi): We should add options to configure it based on there being a config file or not.
    tfJobDeploy(image): {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Deployment", 
      "metadata": {
        "name": "tf-job-operator",
        "namespace": namespace,
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
                "image": image, 
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
    },  // tfJobDeploy
  
    configMap: {
      "apiVersion": "v1", 
      "data": {
        # TODO(jlewi): Use a verbatim  string.
        "controller_config_file.yaml": "grpcServerFilePath: /opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py\naccelerators:\n  alpha.kubernetes.io/nvidia-gpu:\n    volumes:\n      - name: nvidia-libraries\n        mountPath: /usr/local/nvidia/lib64 # This path is special; it is expected to be present in `/etc/ld.so.conf` inside the container image.\n        hostPath: /home/kubernetes/bin/nvidia/lib\n      - name: nvidia-debug-tools # optional\n        mountPath: /usr/local/bin/nvidia\n        hostPath: /home/kubernetes/bin/nvidia/bin"
      }, 
      "kind": "ConfigMap", 
      "metadata": {
        "name": "tf-job-operator-config",
        "namespace": namespace,
      }
    },

    serviceAccount: {
      "apiVersion": "v1", 
      "kind": "ServiceAccount", 
      "metadata": {
        "labels": {
          "app": "tf-job-operator"
        }, 
        "name": "tf-job-operator",
        "namespace": namespace,
      }
    },

  },
}