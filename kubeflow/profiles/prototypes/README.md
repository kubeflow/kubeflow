## Overview

### Profiles / Targets

Kubeflow's use of ksonnet to register and generate components enables a declarative framework 
where these components can be deployed and executed based on different profiles.
A Profile is a resource that defines the type of target the user is interested in creating
in order to run various components. 

## Design
The Profiles ksonnet component provides a way for users to run kubeflow components within isolated namespaces.
3 CRDs are defined:

- Profile
- Target
- Permissions

The Profile resource contains a template section where a namespace and owner are specified.


The Target resource is created by the controller using the information in the Profile Resource. The target contains a template where the name of the namespace and the permissions are specified.

The Permission resource contains the RBAC Role, RoleBinding that will be created for the user within the target namespace.

Each resource has an associated controller that is implemented in jsonnet via metacontroller.
These are:

sync-profile.libsonnet
sync-target.libsonnet
sync-permission.libsonnet

## Client Integration

### kfctl

### arena



