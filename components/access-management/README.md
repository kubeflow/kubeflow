# Kubeflow Access Management API

Kubeflow Access Management API provides fine-grain user-namespace level access control.
The goal is to support multi-tenancy kubeflow cluster / services.

## Resources

### Profile
- Profile contains owner which refers to a k8s user.
- Profile will spawn a namespace with same name and make profile owner the namespace owner.
- Profile will fulfill necessary k8s resources to enable owner access to kubeflow servuces under multi-tenancy mode.
- Delete profile will delete namespace and other k8s resources owned by this profile.

### Binding
- Binding contains a user-namespace pair.
- Binding will give user edit access to referred namespace.
- Delete binding will revoke user's access in binding.


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
  * For example filter by "user=abc@def.com" when need to list namespaces for user "abc@def.com".
  * For example filter by "namespace=abc" when need to list users of a namespace "abc"
* `delete`: delete binding; 
  * called when admin or owner revoke namespace access.

#####`/v1/users/{user}/namespaces`
* `get`: return namespaces that queried user can access as owner or editor.
  * called when need to list namespaces for an user: list namespaces on notebook spawner for current user

#####`/v1/profiles/{profile}/users`
* `get`: return users with owner or editor permission to queried profile / namespace.
  * called when need to list users of a namespace
