from flask import request
from kubeflow.kubeflow.crud_backend import api, decorators, logging

from ...common import form
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/acceleratedataset", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "bucket", "storage", "mountPoint", "mediumType", "path", "quotaSize",
                                 "metaurl_key", "metaurl_name", "access_key_name", "access_key", "secret_key", "secret_key_name")
def post_acceleratedataset(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    dataset = form.dataset_from_dict(body, namespace)
    log.info("Received Dataset: %s", dataset)

    log.info("Creating Dataset '...")
    api.create_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "Dataset", dataset, namespace)
    juicefsruntime = form.juicefsruntime_from_dict(body, namespace)
    api.create_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "JuiceFSRuntime", juicefsruntime, namespace)
    log.info("Successfully created Dataset %s/%s", namespace, body["name"])

    return api.success_response("message", "Dataset created successfully.")


@bp.route("/api/namespaces/<namespace>/acceleratedataset", methods=["PATCH"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "bucket", "storage", "mountPoint", "mediumType", "path", "quotaSize", 
                                 "metaurl_key", "metaurl_name", "access_key_name", "access_key", "secret_key", "secret_key_name")
def replace_acceleratedataset(namespace):
    body = request.get_json()
    log.info("Received body: %s", body)

    dataset = form.dataset_from_dict(body, namespace)
    log.info("Received Dataset: %s", dataset)

    log.info("Creating Dataset '...")
    api.patch_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "Dataset", dataset, namespace)
    juicefsruntime = form.juicefsruntime_from_dict(body, namespace)
    api.patch_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "JuiceFSRuntime", juicefsruntime, namespace)
    log.info("Successfully created Dataset %s/%s", namespace, body["name"])

    return api.success_response("message", "Dataset update successfully.")