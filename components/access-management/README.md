# Kubeflow Access Management API

Kubeflow Access Management API provides fine-grain user-namespace level access control.
The goal is to support multi-tenancy kubeflow cluster / services.

## Resources under management

### Profile
- Profile contains owner which refers to a k8s user.
- Profile will create a namespace with same name and make profile owner the namespace owner.
- Profile will create necessary k8s resources to enable owner access to kubeflow servuces under multi-tenancy mode.
- After the namespace is created, the owner can grant access to additional users or groups using the API or by creating RBAC roles & bindings directly.
- Delete profile will delete namespace and other k8s resources owned by this profile.

### Binding
- Binding contains a user-namespace pair.
- Binding will give user edit access to referred namespace.
- Delete binding will revoke user's access in binding.


## Use Cases
#### Case 1: Self serve Kubeflow

A Kubeflow admin would like to grant a set of users the ability to create/delete a namespace in which they can consume Kubeflow. 
The resulting namespace should only be accessible to the user who created it; or people they grant access to.
RBAC doesn't directly support this. So we provide a service on top of RBAC which will enforce this based on the user's identity

#### Case 2: Allow user to update / share resources they own.

We will not grant user permission to edit cluster-scoped CRD resources. Then to enable user editting their own resources,
we provide update / share / delete APIs and perform permission check on every coming request.  

## APIs

#####`/v1/profiles`
* `create`: create new profile; 
  * called when new user self-register.

#####`/v1/profiles/{profile}`
* `delete`: delete profile; 
  * called when admin or owner delete profile / namespace.

#####`/v1/bindings`
* `create`: create new binding; 
  * called when admin or owner share namespace access with other users.
* `get`: get bindings; 
  * called when query for binding status.
  * filter by user=... | namespace=... | role=owner/editor to query permissions related to a user / namespace.
  * For example filter by "user=abc@def.com" when need to list namespaces for user "abc@def.com"; called when need to list namespaces for an user (list namespaces on notebook spawner for current user)
  * For example filter by "namespace=abc" when need to list users of a namespace "abc"; called when need to list users of namespace "abc".
* `delete`: delete binding; 
  * called when admin or owner revoke namespace access.
