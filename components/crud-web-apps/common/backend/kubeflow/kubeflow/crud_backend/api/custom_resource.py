from kubernetes import client

from .. import authz
from . import custom_api


def create_custom_rsrc(group, version, resource, data, namespace):
    authz.ensure_authorized("create", group, version, resource, namespace)
    return custom_api.create_namespaced_custom_object(
        group, version, namespace, resource, data
    )


def delete_custom_rsrc(
    group, version, resource, name, namespace, foreground=True
):
    del_policy = client.V1DeleteOptions()
    if foreground:
        del_policy = client.V1DeleteOptions(propagation_policy="Foreground")

    authz.ensure_authorized("delete", group, version, resource, namespace)
    return custom_api.delete_namespaced_custom_object(
        group, version, namespace, resource, name, del_policy,
    )


def list_custom_rsrc(group, version, resource, namespace):
    authz.ensure_authorized("list", group, version, resource, namespace)
    return custom_api.list_namespaced_custom_object(
        group, version, namespace, resource
    )
