from kubernetes import client

from .. import authz
from . import custom_api, v1_core


def create_virtual_service(service):
    authz.ensure_authorized(
        "create", "networking.istio.io", "v1alpha3", "virtualservices"
    )

    return custom_api.create_cluster_custom_object(
        "networking.istio.io", "v1alpha3", "virtualservices", service
    )


def get_virtual_service(service):
    authz.ensure_authorized(
        "create", "networking.istio.io", "v1alpha3", "virtualservices"
    )

    return custom_api.get_cluster_custom_object(
        "networking.istio.io", "v1alpha3", "virtualservices", service
    )


def list_services():
    authz.ensure_authorized(
        "create", "networking.istio.io", "v1alpha3", "virtualservices"
    )

    return custom_api.list_cluster_custom_object(
        "networking.istio.io", "v1alpha3", "virtualservices"
    )


def delete_profiles(service, namespace):
    authz.ensure_authorized(
        "delete", "networking.istio.io", "v1alpha3", "virtualservices", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "networking.istio.io",
        "v1beta1",
        namespace,
        "virtualservices",
        service,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_profile(service, namespace, body):
    authz.ensure_authorized(
        "patch", "networking.istio.io", "v1alpha3", "virtualservices", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "networking.istio.io", "v1alpha3", namespace, "virtualservices", service, body
    )


def list_profile_events(service, namespace):
    selector = "involvedObject.kind=VirtualService,involvedObject.name=" + service

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )