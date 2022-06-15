from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/secrets")
def get_secrets(namespace):
    # Return the list of Secrets
    secrets = api.list_secrets(namespace)
    content = [utils.parse_secret(secret) for secret in secrets.items]

    return api.success_response("secrets", content)
