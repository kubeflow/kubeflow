from .. import authz
from . import dyamicClient, custom_api

def _get_resource(api_version, kind):
    return dyamicClient.resources.get(api_version=api_version, kind=kind)


def create_dynamic_custom_rsrc(group, version, kind, data, namespace, auth=True):
    if auth:
        authz.ensure_authorized("create", group, version, kind, namespace)
        
    dynamic_api = _get_resource(version, kind)
    return dynamic_api.create(body=data, namespace=namespace)


def delete_dynamic_custom_rsrc(group, version, kind, name, namespace,
                       policy="Foreground", auth=True):
    if auth:
        authz.ensure_authorized("delete", group, version, kind, namespace)
    dynamic_api = _get_resource(version, kind)
    return dynamic_api.delete(name=name, body={}, namespace=namespace)


def list_dynamic_custom_rsrc(group, version, resource, namespace, auth=True):
    if auth:
        authz.ensure_authorized("list", group, version, resource, namespace)
    return custom_api.list_namespaced_custom_object(group, version, namespace, resource)


def get_dynamic_custom_rsrc(group, version, kind, namespace, name, auth=True):
    if auth:
        authz.ensure_authorized("get", group, version, kind, namespace)

    dynamic_api = _get_resource(version, kind)
    return dynamic_api.get(name=name, body={}, namespace=namespace)
