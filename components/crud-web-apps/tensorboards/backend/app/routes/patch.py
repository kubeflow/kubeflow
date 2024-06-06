import datetime as dt

from flask import request
from werkzeug import exceptions

from kubeflow.kubeflow.crud_backend import api, decorators, logging

from .. import status
from . import bp

log = logging.getLogger(__name__)

STOP_ATTR = "stopped"
ATTRIBUTES = set([STOP_ATTR])


# Routes
@bp.route(
    "/api/namespaces/<namespace>/tensorboards/<tensorboard>", methods=["PATCH"]
)
@decorators.request_is_json_type
def patch_tensorboard(namespace, tensorboard):
    request_body = request.get_json()
    log.info("Got body: %s", request_body)

    if request_body is None:
        raise exceptions.BadRequest("Request doesn't have a body.")

    # Ensure request has at least one valid command
    if not any(attr in ATTRIBUTES for attr in request_body.keys()):
        raise exceptions.BadRequest(
            "Request body must include at least one supported key: %s"
            % list(ATTRIBUTES)
        )

    # start/stop a notebook
    if STOP_ATTR in request_body:
        start_stop_tensorboard(namespace, tensorboard, request_body)

    return api.success_response()


# helper functions
def start_stop_tensorboard(namespace, tensorboard, request_body):
    stop = request_body[STOP_ATTR]

    patch_body = {}
    if stop:
        if tensorboard_is_stopped(namespace, tensorboard):
            raise exceptions.Conflict(
                "Tensorboard %s/%s is already stopped." % (namespace,
                                                           tensorboard)
            )

        log.info("Stopping tensorboard '%s/%s'", namespace, tensorboard)
        now = dt.datetime.now(dt.timezone.utc)
        timestamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")

        patch_body = {
            "metadata": {"annotations": {status.STOP_ANNOTATION: timestamp}}
        }
    else:
        log.info("Starting tensorboard '%s/%s'", namespace, tensorboard)
        patch_body = {
            "metadata": {"annotations": {status.STOP_ANNOTATION: None}}
        }

    log.info(
        "Sending PATCH to tensorboard %s/%s: %s", namespace, tensorboard,
        patch_body
    )

    api.patch_custom_rsrc("tensorboard.kubeflow.org", "v1alpha1",
                          "tensorboards", namespace, tensorboard, patch_body)


def tensorboard_is_stopped(namespace, tensorboard):
    log.info("Checking if tensorboard %s/%s is already stopped",
             namespace, tensorboard,)

    tensorboard = api.get_custom_rsrc(
        "tensorboard.kubeflow.org", "v1alpha1", "tensorboards", namespace,
        tensorboard
    )
    annotations = tensorboard.get("metadata", {}).get("annotations", {})

    return status.STOP_ANNOTATION in annotations
