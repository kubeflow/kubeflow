local ambassador = import "../ambassador.libsonnet";
local params = {
  namespace:: "test-kf-001",
  tfAmbassadorServiceType:: "ClusterIP",
};

std.assertEqual(
ambassador.parts(params.namespace).service(params.tfAmbassadorServiceType),
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "service": "ambassador"
      },
      "name": "ambassador",
      "namespace": "test-kf-001"
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
}) &&

std.assertEqual(
ambassador.parts(params.namespace).adminService,
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "service": "ambassador-admin"
      },
      "name": "ambassador-admin",
      "namespace": "test-kf-001"
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
      "type": "ClusterIP"
   }
}) &&

std.assertEqual(
ambassador.parts(params.namespace).role,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "Role",
   "metadata": {
      "name": "ambassador",
      "namespace": "test-kf-001"
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
}) &&

std.assertEqual(
ambassador.parts(params.namespace).serviceAccount,
{
   "apiVersion": "v1",
   "kind": "ServiceAccount",
   "metadata": {
      "name": "ambassador",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(
ambassador.parts(params.namespace).roleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "RoleBinding",
   "metadata": {
      "name": "ambassador",
      "namespace": "test-kf-001"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "Role",
      "name": "ambassador"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "ambassador",
         "namespace": "test-kf-001"
      }
   ]
}) &&

std.assertEqual(
ambassador.parts(params.namespace).deploy,
{
   "apiVersion": "extensions/v1beta1",
   "kind": "Deployment",
   "metadata": {
      "name": "ambassador",
      "namespace": "test-kf-001"
   },
   "spec": {
      "replicas": 3,
      "template": {
         "metadata": {
            "labels": {
               "service": "ambassador"
            },
            "namespace": "test-kf-001"
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
                     },
                     {
                        "name": "AMBASSADOR_SINGLE_NAMESPACE",
                        "value": "true"
                     }
                  ],
                  "image": "quay.io/datawire/ambassador:0.30.1",
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
                  "image": "quay.io/datawire/statsd:0.30.1",
                  "name": "statsd"
               }
            ],
            "restartPolicy": "Always",
            "serviceAccountName": "ambassador"
         }
      }
   }
}) &&

std.assertEqual(
ambassador.parts(params.namespace).k8sDashboard("cloud"),
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "annotations": {
         "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: k8s-dashboard-ui-mapping\nprefix: /k8s/ui/\nrewrite: /\ntls: true\nservice: kubernetes-dashboard.kube-system"
      },
      "name": "k8s-dashboard",
      "namespace": "test-kf-001"
   },
   "spec": {
      "ports": [
         {
            "port": 443,
            "targetPort": 8443
         }
      ],
      "selector": {
         "k8s-app": "kubernetes-dashboard"
      },
      "type": "ClusterIP"
   }
})
