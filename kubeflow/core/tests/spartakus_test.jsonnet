local spartakus = import "../spartakus.libsonnet";
local params = {
  namespace:: "test-kf-001",
  usageId:: "unknown_cluster",
};

std.assertEqual(
spartakus.parts(params.namespace).role,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "ClusterRole",
   "metadata": {
      "labels": {
         "app": "spartakus"
      },
      "name": "spartakus"
   },
   "rules": [
      {
         "apiGroups": [
            ""
         ],
         "resources": [
            "nodes"
         ],
         "verbs": [
            "get",
            "list"
         ]
      }
   ]
}) &&

std.assertEqual(
spartakus.parts(params.namespace).roleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "ClusterRoleBinding",
   "metadata": {
      "labels": {
         "app": "spartakus"
      },
      "name": "spartakus"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "ClusterRole",
      "name": "spartakus"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "spartakus",
         "namespace": "test-kf-001"
      }
   ]
}) &&

std.assertEqual(
spartakus.parts(params.namespace).serviceAccount,
{
   "apiVersion": "v1",
   "kind": "ServiceAccount",
   "metadata": {
      "labels": {
         "app": "spartakus"
      },
      "name": "spartakus",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(
spartakus.parts(params.namespace).deployment(params.usageId),
{
   "apiVersion": "extensions/v1beta1",
   "kind": "Deployment",
   "metadata": {
      "name": "spartakus-volunteer",
      "namespace": "test-kf-001"
   },
   "spec": {
      "replicas": 1,
      "template": {
         "metadata": {
            "labels": {
               "app": "spartakus-volunteer"
            }
         },
         "spec": {
            "containers": [
               {
                  "args": [
                     "volunteer",
                     "--cluster-id=unknown_cluster",
                     "--database=https://stats-collector.kubeflow.org"
                  ],
                  "image": "gcr.io/google_containers/spartakus-amd64:v1.0.0",
                  "name": "volunteer"
               }
            ],
            "serviceAccountName": "spartakus"
         }
      }
   }
})
