from flask import request

from kubeflow.kubeflow.crud_backend import api, decorators, logging

from ...common import form
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configuration", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "labels", "annotations", "desc",
                                 "env", "volumeMounts", "volumes")
def post_configuration(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    configuration = form.poddefault_from_dict(body, namespace)
    log.info("Received configuration: %s", configuration)

    log.info("Creating Configuration '...")
    api.create_poddefault(configuration, namespace)
    log.info("Successfully created Configuration %s/%s", namespace, body["name"])

    return api.success_response("message", "Configuration created successfully.")


@bp.route("/api/namespaces/<namespace>/configuration", methods=["PATCH"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "labels", "annotations", "desc",
                                 "env", "volumeMounts", "volumes")
def replace_configuration(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    configuration = form.poddefault_from_dict(body, namespace)
    log.info("Received configuration: %s", configuration)

    log.info("Creating Configuration '...")
    api.delete_poddefault(body["name"], namespace)
    api.create_poddefault(configuration, namespace)
    log.info("Successfully update Configuration %s/%s", namespace, body["name"])

    return api.success_response("message", "Configuration update successfully.")