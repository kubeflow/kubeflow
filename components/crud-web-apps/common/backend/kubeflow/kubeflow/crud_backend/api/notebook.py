from .. import authz
from . import custom_api, v1_core


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
    authz.ensure_authorized(
        "list", "", "v1", "events", namespace
    )

    selector = "involvedObject.kind=Notebook,involvedObject.name=" + notebook

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )
