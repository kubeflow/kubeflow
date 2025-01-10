# Kubeflow Profile

Kubeflow Profile CRD is designed to solve access management within multi-user kubernetes cluster.

Profile access management provides namespace level isolation based on:

- Kubernetes RBAC
- Istio AuthorizationPolicy

**Resources managed by profile CRD:**

Each profile CRD will manage one namespace (with same name as profile CRD) and
will have one owner.
Specifically, each profile CRD will manage following resources:

- Namespace reserved for profile owner.
- K8s RBAC RoleBinding `namespaceAdmin`: make profile owner the namespace admin, allow access to above namespace via k8s API (kubectl).
- Istio namespace-scoped ServiceRole `ns-access-istio`: allow access to all services in target namespace via Istio routing.
- Istio namespace-scoped ServiceRoleBinding `owner-binding-istio`: bind ServiceRole `ns-access-istio` to profile owner.
So profile owner can access services in above namespace via Istio (browser).
- Setup namespace-scoped service-accounts `editor` and `viewer` to be used by user-created pods in above namespace.
- Resource Quota (since v1beta1)
- Custom Plugins (since v1beta1)

## Supported platforms and prerequisites

**GCP**
- All users should have IAM permission `Kubernetes Engine Cluster Viewer`
  - This is needed in order to get cluster access by `gcloud container clusters get-credentials`
- kubeflow cluster with version v0.6.2+
- kubeflow cluster ingress is setup with GCP IAP

## Manage access control and resources

**[Detailed document for Kubeflow Multi-Tenancy](https://www.kubeflow.org/docs/other-guides/multi-user-overview/)**

### manual access management by admin

Cluster admin can manage access management for cluster users:

**To create an isolated namespace `test-user-profile` for user `test-user@kubeflow.org`**
- Admin can create a [profile](config/samples/_v1_profile.yaml) via kubectl:
```
kubectl create -f /path/to/profile/config
```

**To revoke access to namespace `test-user-profile` from user `test-user@kubeflow.org` and delete namespace `test-user-profile`**
- Admin can delete profile test-user-profile:
```
kubectl delete profile test-user-profile
```

### Self-serve kfam UI

Users with access to cluster API server should be able to register and use kubeflow cluster without admin manual approve.


## Profile v1beta1:

**Profile v1beta1 introduced 2 new customizable fields:**

### ResourceQuotaSpec
Profile now support configuring `ResourceQuotaSpec` as part of profile CR.
- `ResourceQuotaSpec` field will accept standard [k8s ResourceQuotaSpec](https://godoc.org/k8s.io/api/core/v1#ResourceQuotaSpec)
- A resource quota will be created in target namespace.
- [Example](config/samples/_v1beta1_profile.yaml)

### Plugins
Plugins field is introduced to support customized actions based on k8s cluster's surrounding platform.

Consider adding a plugin when you want to have platform-specific logics like managing resources outside k8s cluster.

Plugin interface is defined as:
```$xslt
type Plugin interface {
	// Called when profile CR is created / updated
	ApplyPlugin(*ProfileReconciler, *profilev1beta1.Profile) error
	// Called when profile CR is deleted, to cleanup any non-k8s resources created via ApplyPlugin
	RevokePlugin(*ProfileReconciler, *profilev1beta1.Profile) error
}
```
Plugin owners have full control over plugin spec struct and implementation.

**Available plugins:**
- [WorkloadIdentity](controllers/plugin_workload_identity.go)
  - Platform: GKE
  - Type: credential binding
  - WorkloadIdentity plugin will bind k8s service account to GCP service account,
  so pods in profile namespace can talk to GCP APIs as GCP service account identity.
- [IAMForServiceAccount](controllers/plugin_iam.go)
  - Platform: EKS
  - Type: credential binding
  - IAM For Service Account plugin will grant k8s service account permission of IAM role,
  so pods in profile namespace can authenticate AWS services as IAM role.
  - The CRD is detailed below
  ```
  apiVersion: kubeflow.org/v1
  kind: Profile
  metadata:
    name: test-profile
  spec:
    owner:
      kind: User
      name: user@example.com
    plugins:
    - kind: AwsIamForServiceAccount
      spec:
        awsIamRole: arn:aws:iam::1234567890:role/test-profile
        ### Boolean which defaults to false. If set to true IAM roles and policy will not be mutated
        annotateOnly: true 
  ```
  To attach default role ARN to all profiles that don't have the AWS plugin provide Environment variable with name "DEFAULT_AWS_IAM_ROLE_ARN" and value of the Role ARN.

# Deployment

Install the `profiles.kubeflow.org` CRD:
```sh
make install
```

Deploy the profile controller manager:
```sh
make deploy
```

Verify that the controller is running in the `profiles-system` namespace:
```sh
kubectl get pods -l kustomize.component=profiles -n profiles-system
```

### Clean-up

Uninstall the profile controller manager:

```
make undeploy
```

Uninstall the `profiles.kubeflow.org` CRD:

```
make uninstall
```

### Running the controller locally

In order for the custom Notebook Controller to be functional from your local machine, the admins must:

1. Set the number of replicas to zero:
```sh
kubectl edit deployment profiles-deployment -n=kubeflow
```

2. Start the manager locally:
```sh
make run
```

