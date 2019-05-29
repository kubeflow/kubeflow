# Profile CRD

Kubeflow Profile CRD is designed to solve access management within multi-user kubernetes cluster.

Profile access management provides namespace level isolation based on:

- k8s rbac access control
- Istio rbac access control

**Resources managed by profile CRD:**

Each profile CRD will manage one namespace (with same name as profile CRD), and will have one owner.
Specifically, each profile CRD will manage following resources:

- Namespace reserved for profile owner.
- K8s rbac Rolebinding `namespaceAdmin`: make profile owner the namespace admin, allow access to above namespace via k8s API (kubectl).
- Istio namespace-scoped ServiceRole `ns-access-istio`: allow access to all services in target namespace via Istio routing.
- Istio namespace-scoped ServiceRoleBinding `owner-binding-istio`: bind ServiceRole `ns-access-istio` to profile owner. 
So profile owner can access services in above namespace via Istio (browser).
- Setup namespace-scoped service-accounts `editor` and `viewer` to be used by user-created pods in above namespace.
- resource quota management (coming)

## Supported platforms and prerequisites:

**GCP**
- All users should have IAM permission `Kubernetes Engine Cluster Viewer`
  - This is needed in order to get cluster access by `gcloud container clusters get-credentials`
- kubeflow cluster with version v0.6

## Manage access control and resources

### manual access management by admin

Cluster admin will manage access management for cluster users:

**To create and reserve namespace `ns1` for user `abc@def.com`**
- Admin need to create profile via kubectl:
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
- Admin can delete profile ns1:
```
kubectl delete profile ns1
```

### Self-serve kfam UI 

Users with access to cluster API server should be able to resiger and use kubeflow cluster without admin manual approve.

**Coming**


### Dev Instruction

##### How to generate Istio rbac CRD types

- We use kube builder https://book.kubebuilder.io/quick_start.html
```
kubebuilder init --domain istio.io --license apache2 --owner "The Kubernetes Authors"
kubebuilder create api --group rbac --version v1alpha1 --kind ServiceRole
kubebuilder create api --group rbac --version v1alpha1 --kind ServiceRoleBinding
```
- Then copy ServiceRole / ServiceRoleBinding schema from Istio release version https://github.com/istio/istio/releases/tag/1.1.6 to `pkg/apis/istiorbac/v1alpha1/*_types.go`
- Run `make` to update code.
