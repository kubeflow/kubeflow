from kubeflow.kubeflow.crud_backend import api, logging

from ...common import utils, status, viewer as viewer_utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    # Return the list of PVCs
    pvcs = api.list_pvcs(namespace)
    notebooks = api.list_notebooks(namespace)["items"]
    content = [utils.parse_pvc(pvc, notebooks) for pvc in pvcs.items]

    # Mix-in the viewer status to the response
    viewers = {
        v["metadata"]["name"]: v for v in
        api.list_custom_rsrc(*viewer_utils.VIEWER, namespace)["items"]
    }

    for pvc in content:
        viewer = viewers.get(pvc["name"], {})
        pvc["viewer"] = {
            "status": status.viewer_status(viewer),
            "url": viewer.get("status", {}).get("url", None)
        }

    return api.success_response("pvcs", content)


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>")
def get_pvc(namespace, pvc_name):
    pvc = api.get_pvc(pvc_name, namespace)
    return api.success_response("pvc", api.serialize(pvc))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/pods")
def get_pvc_pods(namespace, pvc_name):
    pods = utils.get_pods_using_pvc(pvc_name, namespace)

    return api.success_response("pods", api.serialize(pods))


@bp.route("/api/namespaces/<namespace>/pvcs/<pvc_name>/events")
def get_pvc_events(namespace, pvc_name):
    events = api.list_pvc_events(namespace, pvc_name).items

    return api.success_response("events", api.serialize(events))
