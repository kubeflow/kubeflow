from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/configurations")
def get_configurations(namespace):
    # Return the list of Poddefault
    configurations = api.list_poddefaults(namespace)
    content = [utils.parse_poddefault(configuration) for configuration in configurations["items"]]

    return api.success_response("configurations", content)

@bp.route("/api/namespaces/<namespace>/secrets")
def get_secrets(namespace):
    # Return the list of Secrets
    secrets = api.list_secrets(namespace)
    content = [utils.parse_secret(secret) for secret in secrets.items]

    return api.success_response("secrets", content)

@bp.route("/api/namespaces/<namespace>/configmaps")
def get_configmaps(namespace):
    # Return the list of ConfigMaps
    configmaps = api.list_configmaps(namespace)
    content = [utils.parse_configmap(configmap) for configmap in configmaps.items]
    return api.success_response("secrets", content)