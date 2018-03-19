local nfs = import "../nfs.libsonnet";
local params = {
  namespace:: "test-kf-001",
  name:: "nfs",
};

std.assertEqual(
nfs.parts(params.namespace, params.name).serviceAccount,
{
   "apiVersion": "v1",
   "kind": "ServiceAccount",
   "metadata": {
      "labels": {
         "app": "nfsnfs-provisioner"
      },
      "name": "nfs",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(
nfs.parts(params.namespace, params.name).role,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "Role",
   "metadata": {
      "name": "nfs",
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

std.assertEqual(
nfs.parts(params.namespace, params.name).roleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "RoleBinding",
   "metadata": {
      "name": "nfs-nfs-role",
      "namespace": "test-kf-001"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "Role",
      "name": "nfs"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "nfs",
         "namespace": "test-kf-001"
      }
   ]
}) &&

std.assertEqual(
nfs.parts(params.namespace, params.name).clusterRoleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "ClusterRoleBinding",
   "metadata": {
      "name": "nfs-nfs-role",
      "namespace": "test-kf-001"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "ClusterRole",
      "name": "system:persistent-volume-provisioner"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "nfs",
         "namespace": "test-kf-001"
      }
   ]
})
