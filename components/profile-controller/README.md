# Profile CRD

Kubeflow Profile CRD is designed to solve access management within multi-user kubernetes cluster.

Profile access management provide namespace level isolation based on:

- k8s rbac access control
- Istio rbac access control

**Resources managed by profile CRD:**

Each profile CRD will manage one namespace (with same name as profile CRD), and will have one owner.
Specifically, each profile CRD will manage following resources:

- Namespace
- K8s rbac Role & Rolebinding to grant profile owner access to above namespace via k8s API (kubectl)
- Istio namespace-scoped gateway & rbac permission to grant profile owner access to above namespace via Istio (browser)
- Setup namespace-scoped service-accounts `editor` and `viewer` to be used by user-created pods in 
- resource quota management (coming)

## Supported platforms and prerequisites:

**GCP**
- All users should have IAM permission `Kubernetes Engine Cluster Viewer`
- kubeflow cluster with version v0.6

## Manage access control and resources

### manual access management by admin

Cluster admin will manage access management for cluster users:

**To create and reserve namespace `ns1` for user `abc@def.com`**
- create profile:
```
apiVersion: kubeflow.org/v1alpha1
kind: Profile
metadata:
  name: ns1
spec:
  owner:
    kind: User
    name: abc@def.com
```

**To revoke access to namespace `ns1` from user `abc@def.com` and delete namespace `ns1`**
- delete profile ns1:
```
kubectl delete profile ns1
```

You should have kubeflow components deployed inside your k8s cluster. Generated ksonnet application is store in [app-dir](./bootstrapper.yaml#L65).
Exec into pod ```kubeflow-bootstrapper-0``` in namespace ```kubeflow-admin``` if you need to edit your ksonnet app.

The default components are defined in [default.yaml](config/default.yaml), user can customize which components to deploy by
pointing ```--config``` args in [bootstrapper.yaml](./bootstrapper.yaml) to their own config (eg. a configmap in k8s cluster)

This bootstrapper example [config](config/gcp_prototype.yaml) can help explain how config customization works.

### self serve access management by UI
