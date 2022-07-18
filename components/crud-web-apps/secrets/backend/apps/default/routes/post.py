from flask import request

from kubeflow.kubeflow.crud_backend import api, decorators, logging

from ...common import form
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/secret", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "type", "data", )
def post_secret(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    secret = form.secret_from_dict(body, namespace)
    log.info("Received secret: %s", secret)

    log.info("Creating Secret '...")
    api.create_secret(namespace, secret)
    log.info("Successfully created Secret %s/%s", namespace, secret.metadata.name)

    return api.success_response("message", "Secret created successfully.")


@bp.route("/api/namespaces/<namespace>/secret", methods=["PATCH"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "type", "data", )
def replace_secret(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    secret = form.secret_from_dict(body, namespace)
    log.info("Received secret: %s", secret)

    log.info("Creating Secret '...")
    api.replace_secret(body["name"], namespace, secret)
    log.info("Successfully update Secret %s/%s", namespace, secret.metadata.name)

    return api.success_response("message", "Secret update successfully.")