from kubeflow.kubeflow.crud_backend import api, logging

from ...common import status
from ...common.utils import get_pods_using_pvc
from .. import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    # Get the active viewers for each pvc as a dictionary
    # with Key:PVC name and Value:Status of Viewer
    viewers_lst = api.list_custom_rsrc(*utils.PVCVIEWER, namespace)

    viewers = {}
    for v in viewers_lst["items"]:
        pvc_name = v["spec"]["pvc"]
        viewers[pvc_name] = status.viewer_status(v)

    # Return the list of PVCs and the corresponding Viewer's state
    pvcs = api.list_pvcs(namespace)
    notebooks = api.list_notebooks(namespace)["items"]
    content = [utils.parse_pvc(pvc, viewers, notebooks) for pvc in pvcs.items]

    return api.success_response("pvcs", content)


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>")
def get_pvc(namespace, pvc_name):
    pvc = api.get_pvc(pvc_name, namespace)
    return api.success_response("pvc", api.serialize(pvc))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/pods")
def get_pvc_pods(namespace, pvc_name):
    pods = get_pods_using_pvc(pvc_name, namespace)

    return api.success_response("pods", api.serialize(pods))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/events")
def get_pvc_events(namespace, pvc_name):
    events = api.list_pvc_events(namespace, pvc_name).items

    return api.success_response("events", api.serialize(events))
