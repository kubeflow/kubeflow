from kubeflow.kubeflow.crud_backend import api, logging

from .. import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/tensorboards")
def get_tensorboards(namespace):

    tensorboards = api.list_custom_rsrc("tensorboard.kubeflow.org", "v1alpha1", "tensorboards", namespace) # noqa E501
    content = [utils.parse_tensorboard(tensorboard) for tensorboard in tensorboards['items']] # noqa E501

    return api.success_response("tensorboards", content)
