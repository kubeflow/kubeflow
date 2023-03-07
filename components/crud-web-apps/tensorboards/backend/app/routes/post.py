from flask import request
from kubeflow.kubeflow.crud_backend import (
    api,
    decorators,
    logging,
)

from .. import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/tensorboards", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name", "logspath")
def post_tensorboard(namespace):

    body = request.get_json()
    log.info("Got body: %s", body)

    name = body["name"]

    tensorboard = utils.get_tensorboard_dict(namespace, body)

    log.info("About to create Tensorboard: %s", tensorboard)
    api.create_custom_rsrc(
        "tensorboard.kubeflow.org",
        "v1alpha1",
        "tensorboards",
        tensorboard,
        namespace,
    )
    log.info(
        "Successfully created Tensorboard %s in namespace %s", name, namespace
    )

    return api.success_response("message", "Tensorboard created successfully.")
