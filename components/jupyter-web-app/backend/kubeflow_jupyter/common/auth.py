import os
import requests
import functools
from . import utils

logger = utils.create_logger(__name__)

KFAM = os.getenv("KFAM", "profiles-kfam.kubeflow.svc.cluster.local:8081")


def is_authorized(user, namespace):
    '''
    Queries KFAM for whether the provided user has access
    to the specific namespace
    '''
    if user is None:
        # In case a user is not present, preserve the behavior from 0.5
        # Pass the authorization check and make the calls with the webapp's SA
        return True

    try:
        resp = requests.get("http://{}/kfam/v1/bindings?namespace={}".format(
            KFAM, namespace)
        )
    except Exception as e:
        logger.warning(
            "Error talking to KFAM: {}".format(utils.parse_error(e))
        )
        return False

    if resp.status_code == 200:
        # Iterate through the namespace's bindings and check for the user
        for binding in resp.json().get("bindings", []):
            if binding["user"]["name"] == user:
                return True

        return False
    else:
        logger.warning("{}: Error talking to KFAM!".format(resp.status_code))
        return False


def needs_authorization(verb, rsrc):
    '''
    This function will serve as a decorator. It will be used to make sure that
    the decorated function is authorized to perform the corresponding k8s api
    verb on a specific resource.
    '''
    def wrapper(func):
        @functools.wraps(func)
        def runner(*args, **kwargs):
            user = utils.get_username_from_request()
            ns = kwargs.get("namespace", None)

            if is_authorized(user, ns):
                # If the user is authorized, then perform the func
                return func(*args, **kwargs)
            else:
                # If the user is not authorized, then we don't perform the
                # func and return an unauthorized message
                msg = f"User '{user}' is not authorized for namespace '{ns}'"
                return {
                    "success": False,
                    "log": msg,
                }

        return runner

    return wrapper
