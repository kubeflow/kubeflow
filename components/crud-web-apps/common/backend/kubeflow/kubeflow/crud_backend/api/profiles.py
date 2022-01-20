from kubernetes import client

from .. import authz
from . import custom_api, v1_core


def create_profile(profile):
    authz.ensure_authorized(
        "create", "kubeflow.org", "v1beta1", "profiles"
    )

    return custom_api.create_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles", profile
    )


def get_profile(profile):
    authz.ensure_authorized(
        "create", "kubeflow.org", "v1beta1", "profiles"
    )

    return custom_api.get_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles", profile
    )


def list_profiles():
    authz.ensure_authorized(
        "create", "kubeflow.org", "v1beta1", "profiles"
    )

    return custom_api.list_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles"
    )


def delete_profiles(profile, namespace):
    authz.ensure_authorized(
        "delete", "kubeflow.org", "v1beta1", "profiles", namespace
    )
    return custom_api.delete_namespaced_custom_object(
        "kubeflow.org",
        "v1beta1",
        namespace,
        "profiles",
        profile,
        client.V1DeleteOptions(propagation_policy="Foreground"),
    )


def patch_profile(profile, namespace, body):
    authz.ensure_authorized(
        "patch", "kubeflow.org", "v1beta1", "profiles", namespace
    )

    return custom_api.patch_namespaced_custom_object(
        "kubeflow.org", "v1beta1", namespace, "profiles", profile, body
    )


def list_profile_events(profile, namespace):
    selector = "involvedObject.kind=Profile,involvedObject.name=" + profile

    return v1_core.list_namespaced_event(
        namespace=namespace, field_selector=selector
    )