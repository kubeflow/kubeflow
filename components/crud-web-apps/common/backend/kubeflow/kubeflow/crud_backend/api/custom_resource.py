from .. import authz
from . import custom_api


def create_custom_rsrc(group, version, kind, data, namespace):
    authz.ensure_authorized("create", group, version, kind, namespace)
    return custom_api.create_namespaced_custom_object(group, version,
                                                      namespace, kind, data)


def delete_custom_rsrc(group, version, kind, name, namespace,
                       policy="Foreground"):
    authz.ensure_authorized("delete", group, version, kind, namespace)
    return custom_api.delete_namespaced_custom_object(
        group, version, namespace, kind, name, propagation_policy=policy
    )


def list_custom_rsrc(group, version, kind, namespace):
    authz.ensure_authorized("list", group, version, kind, namespace)
    return custom_api.list_namespaced_custom_object(group, version, namespace,
                                                    kind)


def get_custom_rsrc(group, version, kind, namespace, name):
    authz.ensure_authorized("get", group, version, kind, namespace)

    return custom_api.get_namespaced_custom_object(group, version, namespace,
                                                   kind, name)
