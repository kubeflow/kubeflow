from flask import request

from kubeflow.kubeflow.crud_backend import api, decorators, helpers, logging, \
    authn

from ...common import form, utils, volumes
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/notebooks", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name")
def post_pvc(namespace):
    body = request.get_json()
    log.info("Got body: %s" % body)
    user = authn.get_username()

    notebook = helpers.load_param_yaml(
        utils.NOTEBOOK_TEMPLATE_YAML,
        name=body["name"],
        namespace=namespace,
        serviceAccount="default-editor",
        creator=user if user is not None else "anonymous@kubeflow.org"
    )

    defaults = utils.load_spawner_ui_config()

    form.set_notebook_image(notebook, body, defaults)
    form.set_notebook_image_pull_policy(notebook, body, defaults)
    form.set_server_type(notebook, body, defaults)
    form.set_notebook_cpu(notebook, body, defaults)
    form.set_notebook_memory(notebook, body, defaults)
    form.set_notebook_gpus(notebook, body, defaults)
    form.set_notebook_tolerations(notebook, body, defaults)
    form.set_notebook_affinity(notebook, body, defaults)
    form.set_notebook_configurations(notebook, body, defaults)
    form.set_notebook_shm(notebook, body, defaults)

    # Notebook volumes
    api_volumes = []
    api_volumes.extend(form.get_form_value(body, defaults, "datavols",
                                           "dataVolumes"))
    workspace = form.get_form_value(body, defaults, "workspace",
                                    "workspaceVolume", optional=True)
    if workspace:
        api_volumes.append(workspace)

    # ensure that all objects can be created
    api.create_notebook(notebook, namespace, dry_run=True)
    for api_volume in api_volumes:
        pvc = volumes.get_new_pvc(api_volume)
        if pvc is None:
            continue

        api.create_pvc(pvc, namespace, dry_run=True)

    # create the new PVCs and set the Notebook volumes and mounts
    for api_volume in api_volumes:
        pvc = volumes.get_new_pvc(api_volume)
        if pvc is not None:
            logging.info("Creating PVC: %s", pvc)
            pvc = api.create_pvc(pvc, namespace)

        v1_volume = volumes.get_pod_volume(api_volume, pvc)
        mount = volumes.get_container_mount(api_volume, v1_volume["name"])

        notebook = volumes.add_notebook_volume(notebook, v1_volume)
        notebook = volumes.add_notebook_container_mount(notebook, mount)

    log.info("Creating Notebook: %s", notebook)
    api.create_notebook(notebook, namespace)

    return api.success_response("message", "Notebook created successfully.")
