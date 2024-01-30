from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/acceleratedatasets")
def get_datasets(namespace):
    # Return the list of Dataset
    datasets = api.list_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "juicefsruntimes", namespace)
    content = [utils.parse_s3_accerlerate(dataset) for dataset in datasets["items"]]

    return api.success_response("datasets", content)

@bp.route("/api/namespaces/<namespace>/secrets")
def get_secrets(namespace):
    # Return the list of Secrets
    secrets = api.list_secrets(namespace)
    content = [utils.parse_secret(secret) for secret in secrets.items]

    return api.success_response("secrets", content)
