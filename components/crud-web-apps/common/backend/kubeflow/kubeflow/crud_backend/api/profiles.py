from kubernetes import client

from .. import authz
from . import custom_api, v1_core


def create_profile(profile):
    # authz.ensure_authorized(
    #     "create", "kubeflow.org", "v1beta1", "profiles"
    # )

    return custom_api.create_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles", profile
    )


def get_profile(profile):
    # authz.ensure_authorized(
    #     "create", "kubeflow.org", "v1beta1", "profiles"
    # )

    return custom_api.get_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles", profile
    )


def list_profiles():
    # authz.ensure_authorized(
    #     "create", "kubeflow.org", "v1beta1", "profiles"
    # )

    return  custom_api.list_cluster_custom_object(
        "kubeflow.org", "v1beta1", "profiles"
    )
