# Profile Controller Custom Resources

**Authors**: Omri Shiv ([@OmriShiv](https://github.com/OmriShiv))

## Goal

First and foremost, the goal of creating these custom resources is to ease the burden of creating common Kubeflow
components. Users should not need to manually create `RoleBinding`s, Istio `AuthorizationPolicy`s, and others when the
goal is to give a user access to a namespace. By creating higher level resources, one small, purposeful resource can
create the Kubernetes objects needed to support the task. This purpose enables some sub-goals:

By creating simple custom resources, these files can be checked into a GitOps system for automated deploying and
reconciliation. There is auditability over who create a resource and a source of truth.

Additionally, this facilitates a security goal of allowing much easier clean up of resources. By adding ownership to the
sub-resources, deleting the parents object will cascade delete the created resources. It can also serve the task of
regenerating secrets in the event that a user has left the company and secrets need to be rotated. This can also be
extended to trigger an external hook that may clean up resources in other systems.

## Proposal

The proposed solution is to add a small set of Custom Resources (described below) to enable the creation of the needed
sub-resources to facilitate each purpose

## Resources

`profile.yaml`

```yaml
apiVersion: kubeflow.org/v2
kind: Profile
metadata:
  name: ml
spec:
  resourceQuotaSpec:
    hard:
      cpu: "2"
      memory: 2Gi
      requests.nvidia.com/gpu: "1"
      persistentvolumeclaims: "1"
      requests.storage: "5Gi"
```

A slightly simplified version of the current Kubeflow Profile. `resourceQuotaSpec` is optional. This will create
a `kubeflow-ml` profile, but should be able to look up the Kubeflow namespace `prefix` and adjust based on that (for
instance `kf-ml`)

`service_account.yaml`

```yaml
apiVersion: kubeflow.org/v2
kind: ServiceAccount
metadata:
  name: omri-sa
  namespace: kubeflow-ml
spec:
  role: edit
```

This will create a `omri-sa` service account in the `kubeflow-ml` namespace with `edit` role. Internally, this will
create:

- ServiceAccount
- Secret (for the service account)
- Role (To get a token)
- RoleBinding (For the token role)
- ClusterRoleBinding (For the Kubeflow role)

`user_permission.yaml`

```yaml
apiVersion: kubeflow.org/v2
kind: Permission
metadata:
  name: omri-kubeflow-ml
  namespace: kubeflow-ml
spec:
  name: omri
  type: user
  role: edit
```

This will grant the `omri` profile user access to the `kubeflow-ml` namespace with `edit` role. Internally this will
create:

- RoleBinding (for the user in the destination namespace)
- IstioAuthPolicy (for the user in the destination namespace)

`service_account_permission.yaml`

```yaml
apiVersion: kubeflow.org/v2
kind: Permission
metadata:
  name: omri-sa-kubeflow-ml
  namespace: kubeflow-ml
spec:
  name: omri-sa
  sourceNamespace: kubeflow-omri
  type: serviceaccount
  role: edit
```

This will grant the `omri-sa` service account access to the `kubeflow-ml` namespace with `edit` role. Internally this
will create:

- Role (for the service account to create a token in the destination namespace)
- RoleBinding (for the service account in the destination namespace to get a token)
- RoleBinding (for the service account in the destination namespace for the Kubeflow role)

