"""GET request handlers."""

from kubeflow.kubeflow.crud_backend import api, logging
from werkzeug.exceptions import NotFound

from .. import utils
from .. import status
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/config")
def get_config():
    config = utils.load_spawner_ui_config()
    return api.success_response("config", config)


@bp.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    pvcs = api.list_pvcs(namespace).items
    data = [{"name": pvc.metadata.name,
             "size": pvc.spec.resources.requests["storage"],
             "mode": pvc.spec.access_modes[0]} for pvc in pvcs]

    return api.success_response("pvcs", data)


@bp.route("/api/namespaces/<namespace>/poddefaults")
def get_poddefaults(namespace):
    pod_defaults = api.list_poddefaults(namespace)

    # Return a list of pod defaults adding custom fields (label, desc) for
    # forms
    contents = []
    for pd in pod_defaults["items"]:
        label = list(pd["spec"]["selector"]["matchLabels"].keys())[0]
        if "desc" in pd["spec"]:
            desc = pd["spec"]["desc"]
        else:
            desc = pd["metadata"]["name"]

        pd["label"] = label
        pd["desc"] = desc
        contents.append(pd)

    log.info("Found poddefaults: %s", contents)

    return api.success_response("poddefaults", contents)


@bp.route("/api/namespaces/<namespace>/notebooks")
def get_notebooks(namespace):
    notebooks = api.list_notebooks(namespace)["items"]
    contents = [utils.notebook_dict_from_k8s_obj(nb) for nb in notebooks]

    return api.success_response("notebooks", contents)


@bp.route("/api/namespaces/<namespace>/notebooks/<name>")
def get_notebook(name, namespace):
    notebook = api.get_notebook(name, namespace)
    notebook["processed_status"] = status.process_status(notebook)

    return api.success_response("notebook", notebook)


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/pod")
def get_notebook_pod(notebook_name, namespace):
    label_selector = "notebook-name=" + notebook_name
    # There should be only one Pod for each Notebook,
    # so we expect items to have length = 1
    pods = api.list_pods(namespace=namespace, label_selector=label_selector)
    if pods.items:
        pod = pods.items[0]
        return api.success_response(
            "pod", api.serialize(pod),
        )
    else:
        raise NotFound("No pod detected.")


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/pod/<pod_name>/logs")  # noqa: E501
def get_pod_logs(namespace, notebook_name, pod_name):
    container = notebook_name
    logs = api.get_pod_logs(namespace, pod_name, container)
    return api.success_response(
        "logs", logs.split("\n"),
    )


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/events")
def get_notebook_events(notebook_name, namespace):
    events = api.list_notebook_events(notebook_name, namespace).items

    return api.success_response(
        "events", api.serialize(events),
    )


@bp.route("/api/namespaces/<namespace>/culling-policy")
def get_culling_policy(namespace):
    """
    Return the effective culling policy for the given namespace.
    This includes hierarchical policy resolution from cluster -> profile -> namespace levels.
    """
    try:
        # Try to get cluster-level culling configuration
        cluster_config = {}
        try:
            cluster_cm = api.get_configmap("cluster-culling-config", "kubeflow")
            cluster_config = cluster_cm.data or {}
        except Exception:
            log.debug("No cluster-level culling config found")

        # Try to get profile-level configuration
        profile_config = {}
        try:
            profile = api.get_custom_rsrc(
                "kubeflow.org", "v1beta1", "profiles", namespace
            )
            profile_annotations = profile.get("metadata", {}).get("annotations", {})
            if "notebooks.kubeflow.org/cull-idle-time" in profile_annotations:
                profile_config["idleTimeout"] = profile_annotations["notebooks.kubeflow.org/cull-idle-time"]
            if "notebooks.kubeflow.org/cull-check-period" in profile_annotations:
                profile_config["checkPeriod"] = profile_annotations["notebooks.kubeflow.org/cull-check-period"]
        except Exception:
            log.debug(f"No profile-level culling config found for namespace {namespace}")

        # Try to get namespace-level CullingPolicy CRDs
        namespace_config = {}
        try:
            culling_policies = api.list_custom_rsrc(
                "kubeflow.org", "v1beta1", "cullingpolicies", namespace
            )
            if culling_policies.get("items"):
                # Use the first CullingPolicy found
                policy = culling_policies["items"][0]
                spec = policy.get("spec", {})
                namespace_config["idleTimeout"] = f"{spec.get('defaultIdleTime', 5)}m"
                namespace_config["checkPeriod"] = f"{spec.get('checkPeriod', 1)}m"
        except Exception:
            log.debug(f"No CullingPolicy CRDs found in namespace {namespace}")

        # Determine effective policy with hierarchy: namespace > profile > cluster > default
        effective_policy = {
            "source": "default",
            "enabled": True,
            "idleTimeout": "24h",
            "checkPeriod": "1m",
            "exempt": False
        }

        if cluster_config:
            effective_policy.update(cluster_config)
            effective_policy["source"] = "cluster"

        if profile_config:
            effective_policy.update(profile_config)
            effective_policy["source"] = "profile"

        if namespace_config:
            effective_policy.update(namespace_config)
            effective_policy["source"] = "namespace"

        return api.success_response("cullingPolicy", effective_policy)

    except Exception as e:
        log.error(f"Error getting culling policy for namespace {namespace}: {e}")
        # Return default policy on error
        default_policy = {
            "source": "default",
            "enabled": True,
            "idleTimeout": "24h",
            "checkPeriod": "1m",
            "exempt": False
        }
        return api.success_response("cullingPolicy", default_policy)


@bp.route("/api/gpus")
def get_gpu_vendors():
    """
    Return a list of GPU vendors for which at least one node has the necessary
    annotation required to schedule pods
    """
    frontend_config = utils.load_spawner_ui_config()
    gpus_value = frontend_config.get("gpus", {}).get("value", {})
    config_vendor_keys = [
        v.get("limitsKey", "") for v in gpus_value.get("vendors", [])
    ]

    # Get all of the different resources installed in all nodes
    installed_resources = set()
    nodes = api.list_nodes().items
    for node in nodes:
        if node.status.capacity:
            installed_resources.update(node.status.capacity.keys())
        else:
            log.debug(
                f"Capacity was not available for node {node.metadata.name}"
            )

    # Keep the vendors the key of which exists in at least one node
    available_vendors = installed_resources.intersection(config_vendor_keys)

    return api.success_response("vendors", list(available_vendors))
