import json

from kubeflow.kubeflow.crud_backend import logging
from werkzeug.exceptions import BadRequest

from . import utils

log = logging.getLogger(__name__)

SERVER_TYPE_ANNOTATION = "notebooks.kubeflow.org/server-type"
HEADERS_ANNOTATION = "notebooks.kubeflow.org/http-headers-request-set"
URI_REWRITE_ANNOTATION = "notebooks.kubeflow.org/http-rewrite-uri"


def get_form_value(body, defaults, body_field, defaults_field=None,
                   optional=False):
    """
    Get the value to set by respecting the readOnly configuration for
    the field.
    If the field does not exist in the configuration then just use the form
    value.
    """
    # The field in the defaults json not be the same in the request body
    if defaults_field is None:
        defaults_field = body_field

    # If no default value exists then just return value in the request body.
    # This is also useful if we add a new field and the configmap isn't updated
    # yet
    user_value = body.get(body_field, None)
    if defaults_field not in defaults:
        return user_value

    readonly = defaults[defaults_field].get("readOnly", False)
    default_value = defaults[defaults_field]["value"]

    # if the value of a field is readonly then the request/form should not
    # contain this field
    if readonly:
        if body_field in body:
            raise BadRequest(
                "'%s' is readonly but a value was provided: %s"
                % (body_field, user_value),
            )

        log.info("Using default value for '%s': %s", body_field, default_value)
        return default_value

    # field is not readonly and no value was provided
    if user_value is None:
        if not optional:
            raise BadRequest("No value provided for: %s" % body_field)

        # no value for field, but it was optional
        log.info("No value provided for '%s'", defaults_field)
        return None

    log.info("Using provided value for '%s': %s", body_field, user_value)
    return user_value


# Volume handling functions
def is_config_volume(vol):
    if "name" not in vol:
        return False

    if not isinstance(vol["name"], dict):
        return False

    return True


# Notebook YAML processing
def set_notebook_image(notebook, body, defaults):
    """
    If the image is set to readOnly, use only the value from the config
    """
    image_body_field = "image"
    is_custom_image = body.get("customImage", False)
    if is_custom_image:
        image_body_field = "customImage"

    image = get_form_value(body, defaults, image_body_field, "image")
    container = notebook["spec"]["template"]["spec"]["containers"][0]
    container["image"] = image.strip()


def set_notebook_image_pull_policy(notebook, body, defaults):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    container["imagePullPolicy"] = get_form_value(
        body, defaults, "imagePullPolicy"
    )


def set_server_type(notebook, body, defaults):
    valid_server_types = ["jupyter", "group-one", "group-two"]
    notebook_annotations = notebook["metadata"]["annotations"]
    server_type = get_form_value(body, defaults, "serverType")
    if server_type == "":
        server_type == "jupyter"
    if server_type not in valid_server_types:
        raise BadRequest("'%s' is not a valid server type" % server_type)

    nb_name = get_form_value(body, defaults, "name")
    nb_ns = get_form_value(body, defaults, "namespace")
    rstudio_header = '{"X-RStudio-Root-Path":"/notebook/%s/%s/"}' % (nb_ns,
                                                                     nb_name)
    notebook_annotations[SERVER_TYPE_ANNOTATION] = server_type
    if server_type == "group-one" or server_type == "group-two":
        notebook_annotations[URI_REWRITE_ANNOTATION] = "/"
    if server_type == "group-two":
        notebook_annotations[HEADERS_ANNOTATION] = rstudio_header


def set_notebook_cpu(notebook, body, defaults):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    cpu = get_form_value(body, defaults, "cpu")
    if cpu and 'nan' in cpu.lower():
        raise BadRequest("Invalid value for cpu: %s" % cpu)

    cpu_limit = get_form_value(body, defaults, "cpuLimit")
    if cpu_limit and 'nan' in cpu_limit.lower():
        raise BadRequest("Invalid value for cpu limit: %s" % cpu_limit)

    limit_factor = utils.load_spawner_ui_config()["cpu"].get("limitFactor")
    if not cpu_limit and limit_factor != "none":
        cpu_limit = str(round((float(cpu) * float(limit_factor)), 1))

    container["resources"]["requests"]["cpu"] = cpu

    if cpu_limit is None or cpu_limit == "":
        # user explicitly asked for no limits
        return

    if float(cpu_limit) < float(cpu):
        raise BadRequest("CPU limit must be greater than the request")

    limits = container["resources"].get("limits", {})
    limits["cpu"] = cpu_limit
    container["resources"]["limits"] = limits


def set_notebook_memory(notebook, body, defaults):
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    memory = get_form_value(body, defaults, "memory")
    if memory and 'nan' in memory.lower():
        raise BadRequest("Invalid value for memory: %s" % memory)

    memory_limit = get_form_value(body, defaults, "memoryLimit")
    if memory_limit and 'nan' in memory_limit.lower():
        raise BadRequest("Invalid value for memory limit: %s" % memory_limit)

    limit_factor = utils.load_spawner_ui_config()["memory"].get("limitFactor")
    if not memory_limit and limit_factor != "none":
        memory_limit = str(
            round((
                float(memory.replace('Gi', '')) * float(
                    limit_factor)), 1)) + "Gi"

    container["resources"]["requests"]["memory"] = memory

    if memory_limit is None or memory_limit == "":
        # user explicitly asked for no limits
        return

    if float(memory_limit.replace('Gi', '')) < float(
            memory.replace('Gi', '')):
        raise BadRequest("Memory limit must be greater than the request")

    limits = container["resources"].get("limits", {})
    limits["memory"] = memory_limit
    container["resources"]["limits"] = limits


def set_notebook_tolerations(notebook, body, defaults):
    tolerations_group_key = get_form_value(body, defaults, "tolerationGroup")

    if tolerations_group_key == "none":
        return

    notebook_tolerations = notebook["spec"]["template"]["spec"]["tolerations"]
    config = utils.load_spawner_ui_config()
    toleration_groups = config.get("tolerationGroup", {}).get("options", [])

    for group in toleration_groups:
        if group["groupKey"] != tolerations_group_key:
            continue

        log.info("Appending Notebook tolerations: %s", group["tolerations"])
        notebook_tolerations.extend(group["tolerations"])
        return

    log.warning(
        "Didn't find any Toleration Group with key '%s' in the config",
        tolerations_group_key,
    )


def set_notebook_affinity(notebook, body, defaults):
    affinity_config_key = get_form_value(body, defaults, "affinityConfig")

    if affinity_config_key == "none":
        return

    notebook_spec = notebook["spec"]["template"]["spec"]
    config = utils.load_spawner_ui_config()
    affinity_configs = config.get("affinityConfig", {}).get("options", [])

    for affinity_config in affinity_configs:
        if affinity_config["configKey"] != affinity_config_key:
            continue

        log.info("Setting Notebook affinity: %s", affinity_config["affinity"])
        notebook_spec["affinity"] = affinity_config["affinity"]
        return

    log.warning(
        "Didn't find any Affinity Config with key '%s' in the config",
        affinity_config_key,
    )


def set_notebook_gpus(notebook, body, defaults):
    gpus = get_form_value(body, defaults, "gpus")

    # Check if any GPU allocation is requested
    has_whole_gpu = gpus.get("num") and gpus["num"] != "none"
    has_fractional = gpus.get("fractional") and gpus["fractional"] != ""
    has_fractional_memory = gpus.get("fractionalMemory") and gpus["fractionalMemory"] != ""

    # If no GPU allocation is requested, return early
    if not (has_whole_gpu or has_fractional or has_fractional_memory):
        return

    if "vendor" not in gpus:
        raise BadRequest("'gpus' must have a 'vendor' field")

    container = notebook["spec"]["template"]["spec"]["containers"][0]
    vendor = gpus["vendor"]
    limits = container["resources"].get("limits", {})

    log.info("Processing GPU allocation: vendor=%s, whole_gpu=%s, fractional=%s, fractional_memory=%s",
             vendor, has_whole_gpu, has_fractional, has_fractional_memory)

    # Handle fractional GPU allocation for HAMi (NVIDIA GPUs)
    if vendor == "nvidia.com/gpu" and (has_fractional or has_fractional_memory):
        # For fractional allocation, always request 1 physical GPU
        limits[vendor] = "1"

        if has_fractional:
            # Convert fraction (0.1-1.0) to percentage for HAMi gpucores and memory
            try:
                fractional_value = float(gpus["fractional"])
                if fractional_value < 0.1 or fractional_value > 1.0:
                    raise BadRequest("Fractional GPU value must be between 0.1 and 1.0: %s" % fractional_value)

                gpu_cores_percentage = int(fractional_value * 100)
                limits["nvidia.com/gpucores"] = str(gpu_cores_percentage)

                # For fraction mode, also set memory percentage to same value
                limits["nvidia.com/gpumem-percentage"] = str(gpu_cores_percentage)

                log.info("Set fractional GPU allocation: cores=%s%%, memory=%s%%",
                        gpu_cores_percentage, gpu_cores_percentage)

            except (ValueError, TypeError) as e:
                raise BadRequest("Invalid fractional GPU value: %s" % gpus["fractional"])

        elif has_fractional_memory:
            # Use absolute memory allocation in MiB
            try:
                memory_mb = int(gpus["fractionalMemory"])
                if memory_mb < 1024:
                    raise BadRequest("Fractional GPU memory must be at least 1024 MiB: %s" % memory_mb)

                limits["nvidia.com/gpumem"] = str(memory_mb)

                # Set a reasonable default for cores (50% when using memory allocation)
                limits["nvidia.com/gpucores"] = "50"

                log.info("Set fractional GPU memory allocation: memory=%s MiB, cores=50%%", memory_mb)

            except (ValueError, TypeError) as e:
                raise BadRequest("Invalid fractional GPU memory value: %s" % gpus["fractionalMemory"])

    elif has_whole_gpu:
        # Handle traditional whole GPU allocation
        try:
            num = str(gpus["num"])
            limits[vendor] = num
            log.info("Set whole GPU allocation: vendor=%s, count=%s", vendor, num)
        except ValueError:
            raise BadRequest("gpus.num is not a valid number: %s" % gpus["num"])

    container["resources"]["limits"] = limits


def set_notebook_configurations(notebook, body, defaults):
    notebook_labels = notebook["metadata"]["labels"]
    labels = get_form_value(body, defaults, "configurations")

    if not isinstance(labels, list):
        raise BadRequest("Labels for PodDefaults are not list: %s" % labels)

    for label in labels:
        notebook_labels[label] = "true"


def set_notebook_shm(notebook, body, defaults):
    shm = get_form_value(body, defaults, "shm")
    if not shm:
        return

    notebook_spec = notebook["spec"]["template"]["spec"]
    notebook_cont = notebook["spec"]["template"]["spec"]["containers"][0]

    shm_volume = {"name": "dshm", "emptyDir": {"medium": "Memory"}}
    notebook_spec["volumes"].append(shm_volume)

    shm_mnt = {"mountPath": "/dev/shm", "name": "dshm"}
    notebook_cont["volumeMounts"].append(shm_mnt)


def set_notebook_environment(notebook, body, defaults):
    env = get_form_value(body, defaults, "environment")

    # FIXME: Validate the environment?
    env = json.loads(env) if env else {}

    env = [{"name": name, "value": str(value)} for name, value in env.items()]
    notebook["spec"]["template"]["spec"]["containers"][0]["env"] += env


def set_notebook_culling(notebook, body, defaults):
    """
    Set culling annotations on the notebook based on form values
    """
    # defaults parameter is kept for consistency with other form functions
    culling = body.get("culling")
    if not culling or not culling.get("enabled"):
        return

    annotations = notebook["metadata"].get("annotations", {})

    # Set culling annotations that the enhanced culling controller expects
    if culling.get("idleTimeout"):
        annotations["notebooks.kubeflow.org/cull-idle-time"] = culling["idleTimeout"]

    if culling.get("checkPeriod"):
        annotations["notebooks.kubeflow.org/cull-check-period"] = culling["checkPeriod"]

    if culling.get("exempt"):
        annotations["notebooks.kubeflow.org/cull-exempt"] = "true"

    notebook["metadata"]["annotations"] = annotations


def set_notebook_gpu_culling(notebook, body, defaults):
    """
    Set GPU culling annotations on the notebook based on form values
    """
    gpu_culling = body.get("gpuCulling")
    if not gpu_culling or not gpu_culling.get("enabled"):
        return

    annotations = notebook["metadata"].get("annotations", {})

    # Set GPU culling annotations that the enhanced culling controller expects
    annotations["notebooks.kubeflow.org/gpu-cull-enabled"] = "true"

    if gpu_culling.get("mode"):
        annotations["notebooks.kubeflow.org/gpu-culling-mode"] = gpu_culling["mode"]

    if gpu_culling.get("memoryThreshold"):
        annotations["notebooks.kubeflow.org/gpu-memory-threshold"] = str(gpu_culling["memoryThreshold"])

    if gpu_culling.get("computeThreshold"):
        annotations["notebooks.kubeflow.org/gpu-compute-threshold"] = str(gpu_culling["computeThreshold"])

    if gpu_culling.get("kernelTimeout"):
        annotations["notebooks.kubeflow.org/gpu-kernel-timeout"] = gpu_culling["kernelTimeout"]

    if gpu_culling.get("sustainedDuration"):
        annotations["notebooks.kubeflow.org/gpu-sustained-duration"] = gpu_culling["sustainedDuration"]

    notebook["metadata"]["annotations"] = annotations


# Volume add functions
def add_notebook_volume(notebook, vol_name, claim, mnt_path):
    spec = notebook["spec"]["template"]["spec"]
    container = notebook["spec"]["template"]["spec"]["containers"][0]

    volume = {"name": vol_name, "persistentVolumeClaim": {"claimName": claim}}
    spec["volumes"].append(volume)

    # Container Mounts
    mnt = {"mountPath": mnt_path, "name": vol_name}
    container["volumeMounts"].append(mnt)
