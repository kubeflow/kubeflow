import os
import random
import string
import functools
import datetime

from kubernetes import client
from kubernetes.client.rest import ApiException

from werkzeug import exceptions

from kubeflow.kubeflow.crud_backend.api import v1_core
from kubeflow.kubeflow.crud_backend import helpers, logging

from . import status

_log = logging.getLogger(__name__)

_spawner_config_cache = {}

_notebook_index_cached_config = None

MAX_CONFIG_AGE = datetime.timedelta(seconds=10)

FILE_ABS_PATH = os.path.abspath(os.path.dirname(__file__))

NOTEBOOK_TEMPLATE_YAML = os.path.join(
    FILE_ABS_PATH, "yaml/notebook_template.yaml"
)

# The production configuration is mounted on the app's pod via a configmap
DEV_CONFIG = os.path.join(FILE_ABS_PATH, "yaml/spawner_ui_config.yaml")
CONFIGS = [
    "/etc/config/spawner_ui_config.yaml",
    DEV_CONFIG,
]
PER_NAMESPACE_CONFIG_MAP_NAME = "kubeflow-notebook-template"


def random_string(size=9, chars=string.ascii_lowercase + string.digits):
    """Create a random string."""
    return "".join(random.choice(chars) for _ in range(size))


def load_notebook_template(**kwargs):
    """
    kwargs: the parameters to be replaced in the yaml

    Reads the yaml for the web app's custom resource, replaces the variables
    and returns it as a python dict.
    """
    return helpers.load_param_yaml(NOTEBOOK_TEMPLATE_YAML, **kwargs)


def load_ns_specific_config(namespace):
    try:
        cfg_map = v1_core.read_namespaced_config_map(PER_NAMESPACE_CONFIG_MAP_NAME, namespace)
        config_dict = helpers.load_yaml_from_string(cfg_map.data["spawner_ui_config.yaml"])

        if config_dict is not None:
            _log.info("Using config map: %s:%s", namespace, PER_NAMESPACE_CONFIG_MAP_NAME)
            return config_dict["spawnerFormDefaults"]
    except ApiException as ex:
        if ex.status != 404:
            raise
    return None


def load_default_config():
    for config in CONFIGS:
        config_dict = helpers.load_yaml(config)
        if config_dict is not None:
            _log.info("Using config file: %s", config)
            return config_dict["spawnerFormDefaults"]
    return None


def load_spawner_ui_config(namespace):
    global _spawner_config_cache
    if not namespace:
        raise exceptions.NotFound("Namespace not specified.")

    config_sources = [
        functools.partial(load_ns_specific_config, namespace),
        load_default_config
    ]
    now = datetime.datetime.now()
    min_timestamp = now - MAX_CONFIG_AGE
    cached = _spawner_config_cache.get(namespace)
    if cached is not None and min_timestamp < cached[1]:
        _log.info("Using cached config for namespace: %s", namespace)
        return cached[0]
    for config_source in config_sources:
        config = config_source()
        if config is not None:
            _spawner_config_cache[namespace] = (config, now)
            return config

    _log.error("Couldn't find any config file.")
    raise exceptions.NotFound("Couldn't find any config file.")

def load_notebook_index_ui_config():
    global _notebook_index_cached_config
    now = datetime.datetime.now()
    min_timestamp = now - MAX_CONFIG_AGE

    cached = _notebook_index_cached_config
    if cached is not None and min_timestamp < cached[1]:
        _log.info("Using cached index config")
        return cached[0]

    for config in CONFIGS:
        config_dict = helpers.load_yaml(config)

        if config_dict is not None:
            _log.info("Using config file: %s", config)
            if "notebookIndexOptions" in config_dict:
                _notebook_index_cached_config = (config_dict["notebookIndexOptions"], now)
                return config_dict["notebookIndexOptions"]
            else:
                _notebook_index_cached_config = ({}, now)
                return {}

    _log.error("Couldn't find any index config file.")
    raise exceptions.NotFound("Couldn't find any index config file.")

def process_gpus(container, all_configs):
    """
    This function will expose two things, regarding GPUs:
    1. The total number of GPUs that the Notebook has requested
    2. A message describing how many GPUs from each venders it requested

    This function will check the vendors that the admin has defined in the
    app's config file.
    """
    # get the GPU vendors from the app's config
    if isinstance(all_configs, list):
        config = all_configs[0]
    else:
        config = all_configs

    cfg_vendors = config.get("gpus", {}).get("value", {}).get("vendors", [])
    # create a dict mapping the limits key with the UI name.
    # For example: "nvidia.com/gpu": "NVIDIA"
    gpu_vendors = {v["limitsKey"]: v["uiName"] for v in cfg_vendors}

    count = 0
    gpus = []
    resource_limits = container.get("resources", {}).get("limits", {})
    for vendor in gpu_vendors.keys():
        if vendor not in resource_limits:
            continue

        gpu_count = resource_limits[vendor]
        count += int(gpu_count)

        # final message will be like: 1 NVIDIA, 2 AMD
        gpus.append("%s %s" % (gpu_count, gpu_vendors[vendor]))

    return {"count": count, "message": ", ".join(gpus)}


def pvc_from_dict(vol, namespace):
    if vol is None:
        return None

    return client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(name=vol["name"], namespace=namespace,),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[vol["mode"]],
            storage_class_name=get_storage_class(vol),
            resources=client.V1ResourceRequirements(
                requests={"storage": vol["size"]}
            ),
        ),
    )


def get_storage_class(vol):
    # handle the StorageClass
    if "class" not in vol:
        return None
    if vol["class"] == "{empty}":
        return ""
    if vol["class"] == "{none}":
        return None
    else:
        return vol["class"]


# Functions for transforming the data from k8s api
def notebook_dict_from_k8s_obj(notebook, index_config, spawner_config):
    cntr = notebook["spec"]["template"]["spec"]["containers"][0]
    server_type = None
    if notebook["metadata"].get("annotations"):
        annotations = notebook["metadata"]["annotations"]
        server_type = annotations.get("notebooks.kubeflow.org/server-type")
    
    name = notebook["metadata"]["name"]
    namespace = notebook["metadata"]["namespace"]
    debugURL = ""
    if "debugURLFormat" in index_config:
        debugURL = index_config["debugURLFormat"].format(namespace=namespace, name=name)

    return {
        "name": name,
        "namespace": namespace,
        "serverType": server_type,
        "age": helpers.get_uptime(notebook["metadata"]["creationTimestamp"]),
        "image": cntr["image"],
        "shortImage": cntr["image"].split("/")[-1],
        "cpu": cntr["resources"]["requests"]["cpu"],
        "gpus": process_gpus(cntr, spawner_config),
        "memory": cntr["resources"]["requests"]["memory"],
        "volumes": [v["name"] for v in cntr["volumeMounts"]],
        "status": status.process_status(notebook),
        "debugURL": debugURL
    }
