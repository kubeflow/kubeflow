from flask import request

from kubeflow.kubeflow.crud_backend import api, decorators, logging

from ...common import form
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configmap", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "labels", "annotations", "data")
def post_cmap(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    cmap = form.configmap_from_dict(body, namespace)
    log.info("Received configmap: %s", cmap)

    log.info("Creating ConfigMap '...")
    api.create_configmap(cmap, namespace)
    log.info("Successfully created ConfigMap %s/%s", namespace, cmap.metadata.name)

    return api.success_response("message", "ConfigMap created successfully.")

@bp.route("/api/namespaces/<namespace>/configmap", methods=["PATCH"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "labels", "annotations", "data")
def patch_configmap(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    cmap = form.configmap_from_dict(body, namespace)
    log.info("Received configmap: %s", cmap)

    log.info("Creating ConfigMap '...")
    api.patch_configmap(body["name"], namespace, cmap)
    log.info("Successfully update ConfigMap %s/%s", namespace, cmap.metadata.name)

    return api.success_response("message", "ConfigMap update successfully.")