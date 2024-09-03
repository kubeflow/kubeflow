from .. import authz
from . import custom_api, events, utils


def get_notebook(notebook, namespace):
    authz.ensure_authorized(
        "get", "kubeflow.org", "v1beta1", "notebooks", namespace
    )
    return custom_api.get_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks", notebook
    )


def create_notebook(notebook, namespace, dry_run=False):
    authz.ensure_authorized(
        "create", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    return custom_api.create_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks", notebook,
        dry_run="All" if dry_run else None)


def list_notebooks(namespace):
    authz.ensure_authorized(
        "list", "kubeflow.org", "v1beta1", "notebooks", namespace
    )
    return custom_api.list_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks"
    )


def delete_notebook(notebook, namespace):
    authz.ensure_authorized(
        "delete", "kubeflow.org", "v1beta1", "notebooks", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        group="kubeflow.org",
        version="v1beta1",
        namespace=namespace,
        plural="notebooks",
        name=notebook,
        propagation_policy="Foreground",
    )


def patch_notebook(notebook, namespace, body):
    authz.ensure_authorized(
        "patch", "kubeflow.org", "v1beta1", "notebooks", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "notebooks", notebook, body
    )


def list_notebook_events(notebook, namespace):

    field_selector = utils.events_field_selector("Notebook", notebook)

    return events.list_events(namespace, field_selector)

def list_all_notebooks(namespace):
    authz.ensure_authorized(
        "list", "kubeflow.org", "v1beta1", "notebooks", namespace
    )
    return custom_api.list_cluster_custom_object(
        "kubeflow.org", "v1beta1", "notebooks", label_selector="isTemplateName=yes"
    )

#2024 YC get notebook access start#
def get_notebooks_access(namespace,notebook,url1):
    authz.ensure_authorized(
        "list", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    )
    authorization_policies = custom_api.list_namespaced_custom_object(
        "security.istio.io", "v1beta1", namespace, "authorizationpolicies"
    )

    if authorization_policies is None:
        return []

    return authorization_policies.get("items", [])
#2024 YC get notebook access end#

#Create authorization policy start #
def create_authorization(authorization,namespace,dry_run=False):
    # authz.ensure_authorized(
    #    "create", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    #)
    #print(authorization)
    return custom_api.create_namespaced_custom_object(
        "security.istio.io", "v1beta1", namespace, "authorizationpolicies",authorization,
        dry_run="All" if dry_run else None)
#Create authorization policy end #  

#2024/01/20 Delete authorization policy start#
def delete_authorization(name,namespace):
    #authz.ensure_authorized(
    #    "delete", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    #)
    return custom_api.delete_namespaced_custom_object(
        group="security.istio.io",
        version="v1beta1",
        namespace=namespace,
        plural="authorizationpolicies",
        name=name
    ) 
#2024/01/20 Delete authorization policy end#

#2024/01/23 Modify authorization policy start#
def modify_authorization(namespace, name,body):
    #authz.ensure_authorized(
    #    "patch", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    #)

    return custom_api.patch_namespaced_custom_object(
        "security.istio.io", "v1beta1", namespace, "authorizationpolicies", name, body
    )
#2024/01/23 Modify authorization policy end#

#2024/01/23 Modify authorization policy start#
def modify_authorization_delete(namespace, name,body):
    #authz.ensure_authorized(
    #    "patch", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    #)

    return custom_api.patch_namespaced_custom_object(
        "security.istio.io", "v1beta1", namespace, "authorizationpolicies", name, body
    )
#2024/01/23 Modify authorization policy end#

# List all authorizationpolicy start//    
def list_all_authorizationpolicy(namespace):
    #authz.ensure_authorized(
    #    "list", "security.istio.io", "v1beta1", "authorizationpolicies", namespace
    #)
    return custom_api.list_namespaced_custom_object(
        "security.istio.io", "v1beta1", namespace, "authorizationpolicies"
    )
# List all authorizationpolicy end


