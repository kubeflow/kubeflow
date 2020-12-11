import functools
import logging

from kubernetes import client
from kubernetes import config as k8s_config
from kubernetes.client.rest import ApiException
from kubernetes.config import ConfigException
from werkzeug.exceptions import Forbidden, Unauthorized

from . import authn, config

log = logging.getLogger(__name__)

try:
    # Load configuration inside the Pod
    k8s_config.load_incluster_config()
except ConfigException:
    # Load configuration for testing
    k8s_config.load_kube_config()

# The API object for submitting SubjecAccessReviews
authz_api = client.AuthorizationV1Api()


def create_subject_access_review(
    user, verb, namespace, group, version, resource
):
    """
    Create the SubjecAccessReview object which we will use to determine if the
    user is authorized.
    """
    return client.V1SubjectAccessReview(
        spec=client.V1SubjectAccessReviewSpec(
            user=user,
            resource_attributes=client.V1ResourceAttributes(
                group=group,
                namespace=namespace,
                verb=verb,
                resource=resource,
                version=version,
            ),
        )
    )


def is_authorized(user, verb, namespace, group, version, resource):
    """
    Create a SubjectAccessReview to the K8s API to determine if the user is
    authorized to perform a specific verb on a resource.
    """
    # Skip authz check if in dev mode
    if config.dev_mode_enabled():
        log.debug("Skipping authorization check in development mode")
        return True

    if user is None:
        log.warning(
            (
                "No user credentials were found! Make sure you"
                " have correctly set the USERID_HEADER in the"
                " Web App's deployment."
            )
        )
        raise Unauthorized(description="No user credentials were found!")

    sar = create_subject_access_review(
        user, verb, namespace, group, version, resource
    )
    try:
        obj = authz_api.create_subject_access_review(sar)
    except ApiException as e:
        log.error(f"Error submitting SubjecAccessReview: {sar}, {e}")
        raise e

    if obj.status is not None:
        return obj.status.allowed
    else:
        log.error("SubjectAccessReview doesn't have status.")
        return False


def ensure_authorized(verb, group, version, resource, namespace=None):
    user = authn.get_username()
    if not is_authorized(user, verb, namespace, group, version, resource):
        if namespace is not None:
            msg = (
                f"User '{user}' is not authorized to {verb}"
                f" {group}.{version}.{resource} for namespace:"
                f" {namespace}"
            )
        else:
            msg = (
                f"User '{user}' is not authorized to {verb}"
                f" {group}.{version}.{resource}"
            )

        raise Forbidden(description=msg)


def needs_authorization(verb, group, version, resource, namespace=None):
    """
    This function will serve as a decorator. It will be used to make sure that
    the decorated function is authorized to perform the corresponding k8s api
    verb on a specific resource.
    """

    def wrapper(func):
        @functools.wraps(func)
        def runner(*args, **kwargs):
            # Run the decorated function only if the user is authorized
            ensure_authorized(verb, namespace, group, version, resource)
            return func(*args, **kwargs)

        return runner

    return wrapper
