## Overview

### Goals

- Provide an easy way for data-scientists to create protected namespaces where 
notebooks, jobs, and other components can be deployed into this namespace.

- Use native kubernetes RBAC rules to isolate this namespace to a particular user's service account.

- Do not grant cluster wide privileges to a user when creating a protected namespace.

- Only use namespaced scoped Roles and RoleBindings.

- Separate infra components from user components where intra components reside in a shared/admin namespace and 
user components reside in protected namespaces.

- Enable a forward path to include proposed [Security Profiles](https://github.com/kubernetes/community/blob/a8cb2060dc621664c86b185c7426367994b181b5/keps/draft-20180418-security-profile.md) 	


## Design

Protected Namespaces allow a data scientist to use shared kubeflow components but within a namespace that is protected.

![shared and protected namespaces](./docs/namespaces.png "shared and protected namespaces")

Users __stan__ and __jackie__ are defined as service accounts within the shared namespace. This is something the kubeflow admin does by creating service accounts and distributing the service account secret tokens to the data scientists so gthey can be added to each user's $HOME/.kube/config. 

![service accounts](./docs/serviceaccounts.png "service accounts")

For each user, the kubeflow admin also creates a RoleBinding for that user in the shared namespace. The RoleBinding's roleRef is a constained Role that only allows the user to create and get Profile CRs.

- Profile
- Target
- Permissions

The Profile resource contains a template section where a namespace and owner are specified. The Profile resource is created within the shared namespace. An example is:

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

The Target resource is created by the controller using the information in the Profile Resource. The Target resource is created within the shared namespace. The target contains a template where the name of the namespace and the permissions are specified. An example is:

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
spec:
  namespace: gan
  owner: alice
```

The Permission resource contains the RBAC Role, RoleBinding that will be created for the user within the target namespace. The Permission resource is created within the target namespace. An example is:

```
apiVersion: kubeflow.org/v1alpha1
kind: Permission
metadata:
  labels:
    controller-uid: cc6cf46d-d9ea-11e8-9846-42010a8a00a5
  name: default
  namespace: gan
  ownerReferences:
  - apiVersion: kubeflow.org/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Target
    name: mnist
spec:
  owner: alice
```

Each resource has an associated controller that is implemented in jsonnet using metacontroller's CompositeController.
These controllers do the following:

- profiles-controller 
  - watches for __Profile__ Custom Resources
  - creates Target
- targets-controller
  - watches for __Target__ Custom Resources
  - creates Namespace, Permission
- permissions-controller
  - watches for __Permission__ Custom Resources
  - creates Role, RoleBinding





