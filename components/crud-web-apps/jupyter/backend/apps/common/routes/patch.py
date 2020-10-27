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
    "/api/namespaces/<namespace>/notebooks/<notebook>", methods=["PATCH"]
)
@decorators.request_is_json_type
def patch_notebook(namespace, notebook):
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
        start_stop_notebook(namespace, notebook, request_body)

    return api.success_response()


# helper functions
def start_stop_notebook(namespace, notebook, request_body):
    stop = request_body[STOP_ATTR]

    patch_body = {}
    if stop:
        if notebook_is_stopped(namespace, notebook):
            raise exceptions.Conflict(
                "Notebook %s/%s is already stopped." % (namespace, notebook)
            )

        log.info("Stopping Notebook Server '%s/%s'", namespace, notebook)
        now = dt.datetime.now(dt.timezone.utc)
        timestamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")

        patch_body = {
            "metadata": {"annotations": {status.STOP_ANNOTATION: timestamp}}
        }
    else:
        log.info("Starting Notebook Server '%s/%s'", namespace, notebook)
        patch_body = {
            "metadata": {"annotations": {status.STOP_ANNOTATION: None}}
        }

    log.info(
        "Sending PATCH to Notebook %s/%s: %s", namespace, notebook, patch_body
    )
    api.patch_notebook(notebook, namespace, patch_body)


def notebook_is_stopped(namespace, notebook):
    log.info(
        "Checking if Notebook %s/%s is already stopped", namespace, notebook,
    )
    notebook = api.get_notebook(notebook, namespace)
    annotations = notebook.get("metadata", {}).get("annotations", {})

    return status.STOP_ANNOTATION in annotations
