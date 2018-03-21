local jupyterhub = import "../jupyterhub.libsonnet";
local params = {
  namespace:: "test-kf-001",
  disks:: "disk01,disk02",
  jupyterHubAuthenticator:: null,
  jupyterHubServiceType:: "ClusterIP",
  jupyterHubImage: "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
};

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubConfigMap(params.jupyterHubAuthenticator, params.disks), {
   "apiVersion": "v1",
   "data": {
      "jupyterhub_config.py": importstr "../jupyterhub_spawner.py",
   },
   "kind": "ConfigMap",
   "metadata": {
      "name": "jupyterhub-config",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubService,
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "app": "tf-hub"
      },
      "name": "tf-hub-0",
      "namespace": "test-kf-001"
   },
   "spec": {
      "clusterIP": "None",
      "ports": [
         {
            "name": "hub",
            "port": 8000
         }
      ],
      "selector": {
         "app": "tf-hub"
      }
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubLoadBalancer(params.jupyterHubServiceType),
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "app": "tf-hub-lb"
      },
      "name": "tf-hub-lb",
      "namespace": "test-kf-001"
   },
   "spec": {
      "ports": [
         {
            "name": "hub",
            "port": 80,
            "targetPort": 8000
         }
      ],
      "selector": {
         "app": "tf-hub"
      },
      "type": "ClusterIP"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHub(params.jupyterHubImage),
{
   "apiVersion": "apps/v1beta1",
   "kind": "StatefulSet",
   "metadata": {
      "name": "tf-hub",
      "namespace": "test-kf-001"
   },
   "spec": {
      "replicas": 1,
      "serviceName": "",
      "template": {
         "metadata": {
            "labels": {
               "app": "tf-hub"
            }
         },
         "spec": {
            "containers": [
               {
                  "command": [
                     "jupyterhub",
                     "-f",
                     "/etc/config/jupyterhub_config.py"
                  ],
                  "image": "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
                  "name": "tf-hub",
                  "ports": [
                     {
                        "containerPort": 8000
                     },
                     {
                        "containerPort": 8081
                     }
                  ],
                  "volumeMounts": [
                     {
                        "mountPath": "/etc/config",
                        "name": "config-volume"
                     }
                  ]
               }
            ],
            "serviceAccountName": "jupyter-hub",
            "volumes": [
               {
                  "configMap": {
                     "name": "jupyterhub-config"
                  },
                  "name": "config-volume"
               }
            ]
         }
      },
      "updateStrategy": {
         "type": "RollingUpdate"
      }
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRole,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "Role",
   "metadata": {
      "name": "jupyter-role",
      "namespace": "test-kf-001"
   },
   "rules": [
      {
         "apiGroups": [
            "*"
         ],
         "resources": [
            "*"
         ],
         "verbs": [
            "*"
         ]
      }
   ]
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubServiceAccount,
{
   "apiVersion": "v1",
   "kind": "ServiceAccount",
   "metadata": {
      "labels": {
         "app": "jupyter-hub"
      },
      "name": "jupyter-hub",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRoleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "RoleBinding",
   "metadata": {
      "name": "jupyter-role",
      "namespace": "test-kf-001"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "Role",
      "name": "jupyter-role"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "jupyter-hub",
         "namespace": "test-kf-001"
      }
   ]
})
