import logging
import sys
import yaml
import json
from kubernetes import client
import datetime as dt
from . import api


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
def load_param_yaml(f, **kwargs):
    c = None
    try:
        with open(f, "r") as f:
            c = f.read().format(**kwargs)
    except IOError:
        logger.info("Error opening: ", f)
        return None

    try:
        if yaml.safe_load(c) is None:
            # YAML exists but is empty
            return {}
        else:
            # YAML exists and is not empty
            return yaml.safe_load(c)
    except yaml.YAMLError as e:
        logger.warning("Couldn't load yaml: ", e)
        return None


def spawner_ui_config(configs):
    for config in configs:
        c = None
        try:
            with open(config, 'r') as f:
                c = f.read()
        except IOError:
            logger.warning('Config file "{}" is not found'.format(
                config
            ))
            continue

        try:
            if yaml.safe_load(c) is None:
                # YAML exists but is empty
                return {}
            else:
                # YAML exists and is not empty
                logger.info('Sending config file "{}"'.format(config))
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
            age = str(days) + ' day'
        else:
            age = str(days) + ' days'
    else:
        if hours > 0:
            if hours == 1:
                age = str(hours) + ' hour'
            else:
                age = str(hours) + ' hours'
        else:
            if mins == 0:
                return 'just now'
            if mins == 1:
                age = str(mins) + ' min'
            else:
                age = str(mins) + ' mins'

    return age + ' ago'


def handle_storage_class(vol):
    # handle the StorageClass
    if 'class' not in vol:
        return None
    if vol['class'] == '{empty}':
        return ""
    if vol['class'] == '{none}':
        return None
    else:
        return vol['class']


def pvc_from_dict(vol, namespace):
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


def process_pvc(rsrc):
    # VAR: change this function according to the main resource
    res = {
        'name': rsrc.metadata.name,
        'namespace': rsrc.metadata.namespace,
        'size': rsrc.spec.resources.requests['storage'],
        'mode': rsrc.spec.access_modes[0],
        'class': rsrc.spec.storage_class_name,
    }
    return res


def process_resource(rsrc):
    # VAR: change this function according to the main resource
    cntr = rsrc['spec']['template']['spec']['containers'][0]
    status, reason = process_status(rsrc)

    res = {
        'name': rsrc['metadata']['name'],
        'namespace': rsrc['metadata']['namespace'],
        'age': get_uptime(rsrc['metadata']['creationTimestamp']),
        'image': cntr['image'],
        'shortImage': cntr['image'].split("/")[-1],
        'cpu': cntr['resources']['requests']['cpu'],
        'memory': cntr['resources']['requests']['memory'],
        'volumes': [v['name'] for v in cntr['volumeMounts']],
        'status': status,
        'reason': reason,
    }
    return res


def process_status(rsrc):
    '''
    Return status and reason. Status may be [running|waiting|warning|error]
    '''
    # If the Notebook is being deleted, the status will be waiting
    if "deletionTimestamp" in rsrc['metadata']:
        return 'waiting', 'Deleting Notebook Server'

    # Check the status
    try:
        s = rsrc['status']['containerState']
    except KeyError:
        return "waiting", "No Status available"

    if 'running' in s:
        return 'running', 'Running'
    elif 'waiting' in s:
        reason = s['waiting']['reason']

        if reason == 'ImagePullBackOff':
            return 'error', reason
        elif reason == 'ContainerCreating':
            return 'waiting', reason
        elif reason == 'PodInitializing':
            return 'waiting', reason
        else:
            return 'warning', reason
    elif 'terminated' in s:
        return 'error', 'The Pod has Terminated'
    else:
        return 'waiting', 'Scheduling the Pod'


# Notebook YAML processing
def set_notebook_image(notebook, body):
    if body["customImageCheck"]:
        image = body["customImage"]
    else:
        image = body["image"]

    notebook["spec"]["template"]["spec"]["containers"][0]["image"] = image


def set_notebook_specs(notebook, body):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    container["resources"] = {
        "requests": {
            "cpu": body["cpu"],
            "memory": body["memory"]
        }
    }


def set_notebook_extra_resources(notebook, body):
    r = {"success": True, "log": ""}
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    try:
        extra = json.loads(body["extra"])
    except Exception as e:
        r["success"] = False
        r["log"] = api.parse_error(e)
        return r

    container["resources"]["limits"] = extra
    return r


def add_notebook_volume(notebook, vol_name, claim, mnt_path):
    spec = notebook["spec"]['template']['spec']
    container = notebook["spec"]['template']['spec']['containers'][0]

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
    spec = nb["spec"]['template']['spec']
    container = nb["spec"]['template']['spec']['containers'][0]

    volume = {
        "name": secret,
        "secret": {
            "defaultMode": mode,
            "secretName": secret_name,
        }
    }
    spec['volumes'].append(volume)

    # Container volumeMounts
    mnt = {
        "mountPath": mnt_path,
        "name": secret,
    }
    container["volumeMounts"].append(mnt)
