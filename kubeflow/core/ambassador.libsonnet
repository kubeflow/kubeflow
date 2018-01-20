{
  parts(namespace):: {
    service:: {
      "apiVersion": "v1", 
      "kind": "Service", 
      "metadata": {
        "labels": {
          "service": "ambassador"
        }, 
        "name": "ambassador",
        "namespace": namespace,
      }, 
      "spec": {
        "ports": [
          {
            "name": "ambassador", 
            "port": 80, 
            "targetPort": 80
          }
        ], 
        "selector": {
          "service": "ambassador"
        }, 
        "type": "ClusterIP"
      }
    }, // service 

    adminService:: {
      "apiVersion": "v1", 
      "kind": "Service", 
      "metadata": {
        "labels": {
          "service": "ambassador-admin"
        }, 
        "name": "ambassador-admin",
        "namespace": namespace,
      }, 
      "spec": {
        "ports": [
          {
            "name": "ambassador-admin", 
            "port": 8877, 
            "targetPort": 8877
          }
        ], 
        "selector": {
          "service": "ambassador"
        }, 
        "type": "NodePort"
      }
    }, // adminService

    clusterRole:: {
      "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
      "kind": "ClusterRole", 
      "metadata": {
        "name": "ambassador"
      }, 
      "rules": [
        {
          "apiGroups": [
            ""
          ], 
          "resources": [
            "services"
          ], 
          "verbs": [
            "get", 
            "list", 
            "watch"
          ]
        }, 
        {
          "apiGroups": [
            ""
          ], 
          "resources": [
            "configmaps"
          ], 
          "verbs": [
            "create", 
            "update", 
            "patch", 
            "get", 
            "list", 
            "watch"
          ]
        }, 
        {
          "apiGroups": [
            ""
          ], 
          "resources": [
            "secrets"
          ], 
          "verbs": [
            "get", 
            "list", 
            "watch"
          ]
        }
      ]
    }, // cluserRole 

    serviceAccount:: {
      "apiVersion": "v1", 
      "kind": "ServiceAccount", 
      "metadata": {
        "name": "ambassador",
        "namespace": namespace,
      }
    }, // serviceAccount

    clusterRoleBinding:: {
      "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
      "kind": "ClusterRoleBinding", 
      "metadata": {
        "name": "ambassador"
      }, 
      "roleRef": {
        "apiGroup": "rbac.authorization.k8s.io", 
        "kind": "ClusterRole", 
        "name": "ambassador"
      }, 
      "subjects": [
        {
          "kind": "ServiceAccount", 
          "name": "ambassador", 
          "namespace": namespace,
        }
      ]
    }, // clusterRoleBinding

    deploy:: {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Deployment", 
      "metadata": {
        "name": "ambassador",
        "namespace": namespace,
      }, 
      "spec": {
        "replicas": 3, 
        "template": {
          "metadata": {
            "labels": {
              "service": "ambassador"
            }
          }, 
          "spec": {
            "containers": [
              {
                "env": [
                  {
                    "name": "AMBASSADOR_NAMESPACE", 
                    "valueFrom": {
                      "fieldRef": {
                        "fieldPath": "metadata.namespace"
                      }
                    }
                  }
                ], 
                "image": "quay.io/datawire/ambassador:0.22.0", 
                "imagePullPolicy": "Always", 
                "livenessProbe": {
                  "httpGet": {
                    "path": "/ambassador/v0/check_alive", 
                    "port": 8877
                  }, 
                  "initialDelaySeconds": 30, 
                  "periodSeconds": 30
                }, 
                "name": "ambassador", 
                "readinessProbe": {
                  "httpGet": {
                    "path": "/ambassador/v0/check_ready", 
                    "port": 8877
                  }, 
                  "initialDelaySeconds": 30, 
                  "periodSeconds": 30
                }, 
                "resources": {
                  "limits": {
                    "cpu": 1, 
                    "memory": "400Mi"
                  }, 
                  "requests": {
                    "cpu": "200m", 
                    "memory": "100Mi"
                  }
                }
              }, 
              {
                "image": "quay.io/datawire/statsd:0.22.0", 
                "name": "statsd"
              }
            ], 
            "restartPolicy": "Always", 
            "serviceAccountName": "ambassador",
          }
        }
      }
    },  // deploy
  }, // parts
}