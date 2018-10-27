## Overview

### Goals

- Provide an easy way for data-scientists to create protected namespaces where 
notebooks, jobs, and other components can be deployed into this namespace.

- Use native kubernetes RBAC rules to isolate this namespace to a particular user or service account.

- Separate infra components from user components where intra components reside in a shared namespace and 
user components reside in protected namespaces.

- Enable a forward path to include proposed [Security Profiles](https://github.com/kubernetes/community/blob/a8cb2060dc621664c86b185c7426367994b181b5/keps/draft-20180418-security-profile.md) 	


## Design
The Profiles ksonnet component provides a way for users and service accounts to run kubeflow components within isolated , protected namespaces. 3 CRDs are defined:

- Profile
- Target
- Permissions

The Profile resource contains a template section where a namespace and owner are specified. An example is:

```
apiVersion: kubeflow.org/v1alpha1
kind: Profile
metadata:
  name: gan-alice
  namespace: kubeflow
spec:
  template:
    metadata:
      name: gan
    spec:
      namespace: gan
      owner: alice
```

The Target resource is created by the controller using the information in the Profile Resource. The target contains a template where the name of the namespace and the permissions are specified. An example is:

```
apiVersion: kubeflow.org/v1alpha1
kind: Target
metadata:
  labels:
    controller-uid: c6de9e25-d9ea-11e8-9846-42010a8a00a5
  name: gan
  namespace: kubeflow
  ownerReferences:
  - apiVersion: kubeflow.org/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Profile
    name: gan-alice
    uid: c6de9e25-d9ea-11e8-9846-42010a8a00a5
spec:
  namespace: gan
  owner: alice
```

The Permission resource contains the RBAC Role, RoleBinding that will be created for the user within the target namespace. An example is:

```
apiVersion: kubeflow.org/v1alpha1
kind: Permission
metadata:
  labels:
    controller-uid: cc6cf46d-d9ea-11e8-9846-42010a8a00a5
  name: permission
  namespace: mnist
  ownerReferences:
  - apiVersion: kubeflow.org/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Target
    name: mnist
    uid: cc6cf46d-d9ea-11e8-9846-42010a8a00a5
spec:
  owner: alice
```

Each resource has an associated controller that is implemented in jsonnet using metacontroller's CompositeController.
These are:

sync-profile.libsonnet
sync-target.libsonnet
sync-permission.libsonnet

## Client Integration

### kfctl

### arena



