from .. import authz
from . import custom_api

PODDEFAULT_GROUP="kubeflow.org"
PODDEFAULT_VERSION="v1alpha1"
PODDEFAULT_KIND="poddefaults"


def create_poddefault(poddefault, namespace, auth=True):
    if auth:
        authz.ensure_authorized("create", PODDEFAULT_GROUP, 
                                PODDEFAULT_VERSION, 
                                PODDEFAULT_KIND,
                                namespace)
    return custom_api.create_namespaced_custom_object(PODDEFAULT_GROUP, 
                                         PODDEFAULT_VERSION,
                                         plural=PODDEFAULT_KIND,
                                         namespace=namespace,
                                         body=poddefault
                                         )


def delete_poddefault(poddefault, namespace, auth=True):
    
    if auth:
        authz.ensure_authorized("delete", PODDEFAULT_GROUP, 
                                PODDEFAULT_VERSION, 
                                PODDEFAULT_KIND, 
                                namespace
        )
    return custom_api.delete_namespaced_custom_object(PODDEFAULT_GROUP, 
                                         PODDEFAULT_VERSION,
                                         namespace,
                                         PODDEFAULT_KIND, 
                                         poddefault)


def list_poddefaults(namespace, auth=True):
    if auth:
        authz.ensure_authorized("list", PODDEFAULT_GROUP, 
                                PODDEFAULT_VERSION, 
                                PODDEFAULT_KIND,
                                namespace)
    return custom_api.list_namespaced_custom_object(PODDEFAULT_GROUP, 
                                                    PODDEFAULT_VERSION,
                                                    namespace,
                                                    PODDEFAULT_KIND)


def patch_poddefault(name, namespace, poddefault, auth=True):
    if auth:
        authz.ensure_authorized("patch", PODDEFAULT_GROUP, 
                                PODDEFAULT_VERSION, 
                                PODDEFAULT_KIND,
                                namespace)

    return custom_api.patch_namespaced_custom_object(PODDEFAULT_GROUP,
                                                  PODDEFAULT_VERSION,
                                                  namespace,
                                                  PODDEFAULT_KIND,
                                                  name,
                                                  poddefault)


def replace_poddefault(name, namespace, poddefault, auth=True):
    if auth:
        authz.ensure_authorized("patch", PODDEFAULT_GROUP, 
                                PODDEFAULT_VERSION, 
                                PODDEFAULT_KIND,
                                namespace)

    return custom_api.replace_namespaced_custom_object(PODDEFAULT_GROUP,
                                                  PODDEFAULT_VERSION,
                                                  namespace,
                                                  PODDEFAULT_KIND,
                                                  name,
                                                  poddefault)
