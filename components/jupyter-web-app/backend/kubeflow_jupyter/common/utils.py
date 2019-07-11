import logging
import os
import sys
import yaml
import json
from flask import request
from kubernetes import client
import datetime as dt
from . import api

# The backend will send the first config it will successfully load
CONFIGS = [
    "/etc/config/spawner_ui_config.yaml",
    "./kubeflow_jupyter/common/yaml/spawner_ui_config.yaml"
]

# The values of the headers to look for the User info
USER_HEADER = os.getenv("USERID_HEADER", "X-Goog-Authenticated-User-Email")
USER_PREFIX = os.getenv("USERID_PREFIX", "accounts.google.com:")


# Logging
def create_logger(name):
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter(
        "%(asctime)s | %(name)s | %(levelname)s | %(message)s"))
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    logger.addHandler(handler)
    return logger


logger = create_logger(__name__)


# Utils
def get_username_from_request():
    if USER_HEADER not in request.headers:
        logger.warning("User header not present!")
        username = None
    else:
        user = request.headers[USER_HEADER]
        username = user.replace(USER_PREFIX, "")
        logger.info("User: '{}' | Headers: '{}' '{}'".format(
            username, USER_HEADER, USER_PREFIX
        ))

    return username


def load_param_yaml(f, **kwargs):
    c = None
    try:
        with open(f, "r") as f:
            c = f.read().format(**kwargs)
    except IOError:
        logger.info("Error opening: {}".format(f))
        return None

    try:
        if yaml.safe_load(c) is None:
            # YAML exists but is empty
            return {}
        else:
            # YAML exists and is not empty
            return yaml.safe_load(c)
    except yaml.YAMLError as e:
        logger.warning("Couldn't load yaml: {}".format(e))
        return None


def spawner_ui_config():
    for config in CONFIGS:
        c = None
        try:
            with open(config, "r") as f:
                c = f.read()
        except IOError:
            logger.warning("Config file '{}' is not found".format(
                config
            ))
            continue

        try:
            if yaml.safe_load(c) is None:
                # YAML exists but is empty
                return {}
            else:
                # YAML exists and is not empty
                logger.info("Sending config file '{}'".format(config))
                return yaml.safe_load(c)["spawnerFormDefaults"]
        except yaml.YAMLError:
            logger.error("Notebook config is not a valid yaml")
            return {}
        except AttributeError as e:
            logger.error("Can't load the config at {}: {}".format(
                config, str(e)
            ))

    logger.warning("Couldn't load any config")
    return {}


def get_uptime(then):
    now = dt.datetime.now()
    then = dt.datetime.strptime(then, "%Y-%m-%dT%H:%M:%SZ")
    diff = now - then.replace(tzinfo=None)

    days = diff.days
    hours = int(diff.seconds / 3600)
    mins = int((diff.seconds % 3600) / 60)

    age = ""
    if days > 0:
        if days == 1:
            age = str(days) + " day"
        else:
            age = str(days) + " days"
    else:
        if hours > 0:
            if hours == 1:
                age = str(hours) + " hour"
            else:
                age = str(hours) + " hours"
        else:
            if mins == 0:
                return "just now"
            if mins == 1:
                age = str(mins) + " min"
            else:
                age = str(mins) + " mins"

    return age + " ago"


def handle_storage_class(vol):
    # handle the StorageClass
    if "class" not in vol:
        return None
    if vol["class"] == "{empty}":
        return ""
    if vol["class"] == "{none}":
        return None
    else:
        return vol["class"]


# Volume handling functions
def volume_from_config(config_vol, notebook):
    '''
    Create a Volume Dict from the config.yaml. This dict has the same fields as
    a Volume returned from the frontend
    '''
    vol_name = config_vol["name"]["value"].replace(
        "{notebook-name}",
        notebook["name"]
    )
    vol_class = handle_storage_class(config_vol["class"]["value"])

    return {
        "name": vol_name,
        "type": config_vol["type"]["value"],
        "size": config_vol["size"]["value"],
        "mode": config_vol["accessModes"]["value"],
        "path": config_vol["mountPath"]["value"],
        "class": vol_class,
        "extraFields": config_vol.get("extra", {}),
    }


def pvc_from_dict(vol, namespace):
    if vol is None:
        return None

    return client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=vol["name"],
            namespace=namespace,
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[vol["mode"]],
            storage_class_name=handle_storage_class(vol),
            resources=client.V1ResourceRequirements(
                requests={
                    "storage": vol["size"]
                }
            )
        )
    )


def get_workspace_vol(body, defaults):
    '''
    Checks the config and the form values and returns a Volume Dict for the
    workspace. If the workspace is readOnly, then the value from the config
    will be used instead. The Volume Dict has the same format as the Volume
    interface of the frontend.
    '''
    default_ws = volume_from_config(defaults["workspaceVolume"]["value"], body)
    form_ws = body.get("workspace", None)

    if defaults["workspaceVolume"].get("readOnly", False):
        ws = default_ws
        logger.info("Using the default Workspace Volume: {}".format(ws))
    elif form_ws is not None:
        ws = form_ws
        logger.info("Using form's Workspace Volume: {}".format(ws))
    else:
        ws = default_ws
        logger.info("Using the default Workspace Volume: {}".format(ws))

    return ws


def get_data_vols(body, defaults):
    '''
    Checks the config and the form values and returns a list of Volume
    Dictionaries for the Notebook's Data Volumes. If the Data Volumes are
    readOnly, then the value from the config will be used instead. The Volume
    Dict has the same format as the Volume interface of the frontend.
    '''
    default_vols = [volume_from_config(vol["value"], body)
                    for vol in defaults["dataVolumes"]["value"]]
    form_vols = body.get("datavols", [])

    if defaults["dataVolumes"].get("readOnly", False):
        vols = default_vols
        logger.info("Using the default Data Volumes: {}".format(vols))
    elif "datavols" in body:
        vols = form_vols
        logger.info("Using the form's Data Volumes: {}".format(vols))
    else:
        vols = default_vols
        logger.info("Using the default Data Volumes: {}".format(vols))

    return vols


# Functions for transforming the data from k8s api
def process_pvc(rsrc):
    # VAR: change this function according to the main resource
    res = {
        "name": rsrc.metadata.name,
        "namespace": rsrc.metadata.namespace,
        "size": rsrc.spec.resources.requests["storage"],
        "mode": rsrc.spec.access_modes[0],
        "class": rsrc.spec.storage_class_name,
    }
    return res


def process_resource(rsrc):
    # VAR: change this function according to the main resource
    cntr = rsrc["spec"]["template"]["spec"]["containers"][0]
    status, reason = process_status(rsrc)

    res = {
        "name": rsrc["metadata"]["name"],
        "namespace": rsrc["metadata"]["namespace"],
        "age": get_uptime(rsrc["metadata"]["creationTimestamp"]),
        "image": cntr["image"],
        "shortImage": cntr["image"].split("/")[-1],
        "cpu": cntr["resources"]["requests"]["cpu"],
        "memory": cntr["resources"]["requests"]["memory"],
        "volumes": [v["name"] for v in cntr["volumeMounts"]],
        "status": status,
        "reason": reason,
    }
    return res


def process_status(rsrc):
    '''
    Return status and reason. Status may be [running|waiting|warning|error]
    '''
    # If the Notebook is being deleted, the status will be waiting
    if "deletionTimestamp" in rsrc["metadata"]:
        return "waiting", "Deleting Notebook Server"

    # Check the status
    try:
        s = rsrc["status"]["containerState"]
    except KeyError:
        return "waiting", "No Status available"

    if "running" in s:
        return "running", "Running"
    elif "waiting" in s:
        reason = s["waiting"]["reason"]

        if reason == "ImagePullBackOff":
            return "error", reason
        elif reason == "ContainerCreating":
            return "waiting", reason
        elif reason == "PodInitializing":
            return "waiting", reason
        else:
            return "warning", reason
    elif "terminated" in s:
        return "error", "The Pod has Terminated"
    else:
        return "waiting", "Scheduling the Pod"


# Notebook YAML processing
def set_notebook_image(notebook, body, defaults):
    '''
    If the image is set to readOnly, use only the value from the config
    '''
    if defaults["image"].get("readOnly", False):
        image = defaults["image"]["value"]
        logger.info("Using default Image: " + image)
    elif body.get("customImageCheck", False):
        image = body["customImage"]
        logger.info("Using form's custom Image: " + image)
    elif "image" in body:
        image = body["image"]
        logger.info("Using form's Image: " + image)
    else:
        image = defaults["image"]["value"]
        logger.info("Using default Image: " + image)

    notebook["spec"]["template"]["spec"]["containers"][0]["image"] = image


def set_notebook_cpu(notebook, body, defaults):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    if defaults["cpu"].get("readOnly", False):
        cpu = defaults["cpu"]["value"]
        logger.info("Using default CPU: " + cpu)
    elif body.get("cpu", ""):
        cpu = body["cpu"]
        logger.info("Using form's CPU: " + cpu)
    else:
        cpu = defaults["cpu"]["value"]
        logger.info("Using default CPU: " + cpu)

    container["resources"]["requests"]["cpu"] = cpu


def set_notebook_memory(notebook, body, defaults):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    if defaults["memory"].get("readOnly", False):
        memory = defaults["memory"]["value"]
        logger.info("Using default Memory: " + memory)
    elif body.get("memory", ""):
        memory = body["memory"]
        logger.info("Using form's Memory: " + memory)
    else:
        memory = defaults["memory"]["value"]
        logger.info("Using default Memory: " + memory)

    container["resources"]["requests"]["memory"] = memory


def set_notebook_configurations(notebook, body, defaults):
    notebook_labels = notebook["metadata"]["labels"]

    if defaults["configurations"].get("readOnly", False):
        labels = defaults["configurations"]["value"]
        logger.info("Using default Configurations: {}".format(labels))
    elif body.get("configurations", None) is not None:
        labels = body["configurations"]
        logger.info("Using form's Configurations: {}".format(labels))
    else:
        labels = defaults["configurations"]["value"]
        logger.info("Using default Configurations: {}".format(labels))

    if not isinstance(labels, list):
        logger.warning("Labels for PodDefaults are not list: {}".format(
            labels)
        )
        return

    for l in labels:
        notebook_labels[l] = "true"


def set_notebook_extra_resources(notebook, body, defaults):
    r = {"success": True, "log": ""}
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    if defaults["extraResources"].get("readOnly", False):
        resources_str = defaults["extraResources"]["value"]
        logger.info("Using the default Extra Resources: " + resources_str)
    elif body.get("extra", ""):
        resources_str = body["extra"]
        logger.info("Using the form's Extra Resources: " + resources_str)
    else:
        resources_str = defaults["extraResources"]["value"]
        logger.info("Using the default Extra Resources: " + resources_str)

    try:
        extra = json.loads(resources_str)
    except Exception as e:
        r["success"] = False
        r["log"] = api.parse_error(e)
        return r

    container["resources"]["limits"] = extra
    return r


def set_notebook_shm(notebook, body, defaults):
    if defaults["shm"].get("readOnly", False):
        if not defaults["shm"]["value"]:
            return
    elif "shm" in body:
        if not body["shm"]:
            return
    else:
        if not defaults["shm"]["value"]:
            return

    notebook_spec = notebook["spec"]["template"]["spec"]
    notebook_cont = notebook["spec"]["template"]["spec"]["containers"][0]

    shm_volume = {
        "name": "dshm",
        "emptyDir": {
            "medium": "Memory"
        }
    }
    notebook_spec["volumes"].append(shm_volume)
    shm_mnt = {
        "mountPath": "/dev/shm",
        "name": "dshm"
    }
    notebook_cont["volumeMounts"].append(shm_mnt)


def add_notebook_volume(notebook, vol_name, claim, mnt_path):
    spec = notebook["spec"]["template"]["spec"]
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    volume = {
        "name": vol_name,
        "persistentVolumeClaim": {
            "claimName": claim
        }
    }
    spec["volumes"].append(volume)

    # Container Mounts
    mnt = {
        "mountPath": mnt_path,
        "name": vol_name
    }
    container["volumeMounts"].append(mnt)


def add_notebook_volume_secret(nb, secret, secret_name, mnt_path, mode):
    # Create the volume in the Pod
    spec = nb["spec"]["template"]["spec"]
    container = nb["spec"]["template"]["spec"]["containers"][0]

    volume = {
        "name": secret,
        "secret": {
            "defaultMode": mode,
            "secretName": secret_name,
        }
    }
    spec["volumes"].append(volume)

    # Container volumeMounts
    mnt = {
        "mountPath": mnt_path,
        "name": secret,
    }
    container["volumeMounts"].append(mnt)
