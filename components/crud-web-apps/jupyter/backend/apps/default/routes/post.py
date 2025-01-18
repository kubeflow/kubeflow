from flask import request

from kubeflow.kubeflow.crud_backend import api, decorators, helpers, logging, \
    authn

from ...common import form, utils, volumes, clone_notebook
from . import bp

import json

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/notebooks", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name")
def post_pvc(namespace):
    body = request.get_json()
    log.info("Got body: %s" % body)
    user = authn.get_username()

    # Convert dict to string
    data = json.dumps(body)
    log.info("Got data: %s" % data)

    # If template is defined, clone the PVC from the template and then add the /source 
    # to the volumes and volumeMount.
    try:
        template = body["template"]
    except:
        template = None
    newpvcname=None
    if template == None:
      notebook = helpers.load_param_yaml(
          utils.NOTEBOOK_TEMPLATE_YAML,
          name=body["name"],
          namespace=namespace,
          isTemplate='\"no\"',
          creator=body["name"],
          serviceAccount="default-editor",
          jsonStr='\'' + data + '\'',
      )
    else:
      origin_namespace = body['origin_namespace']
      oldpvcname = template
      newpvcname = body["name"]+'-source-volume'
      clone_notebook.CloneNotebook().clone_pvc(origin_namespace, oldpvcname, namespace, newpvcname,clone=True)
      notebook = helpers.load_param_yaml(
          utils.NOTEBOOK_TEMPLATE_CLONE_YAML,
          name=body["name"],
          namespace=namespace,
          # isTemplate =  '\"'+body["isTemplate"]+'\"',
          isTemplate='\"no\"',
          creator=body["name"],
          serviceAccount="default-editor",
          templatePvcName = '\"'+newpvcname+'\"',
          destvolume = '\"'+body["name"]+'-volume\"',
          jsonStr = '\'' + data + '\'',
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

    # add source volume from the template
    if newpvcname:
        api_volumes.append({"mount":'/source',"existingSource": {"persistentVolumeClaim":{"claimName":newpvcname}}})

    log.info("Creating Notebook: %s", notebook)

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
        print("lancemount",mount)
        print("lancenewpvcname",newpvcname)
        if mount["name"] != newpvcname:
            notebook = volumes.add_notebook_container_mount(notebook, mount)
            # If the template is used, we add the to the clone container
            if template != None:
                notebook = volumes.add_notebook_container_source_mount(notebook, mount)


    log.info("Creating Notebook: %s", notebook)
    api.create_notebook(notebook, namespace)

    return api.success_response("message", "Notebook created successfully.")

@bp.route("/api/namespaces/clone_pvc/<namespace>/<oldpvcname>/<target_namespace>/<newpvcname>", methods=["GET"])
def clone_pvc(namespace,oldpvcname,target_namespace,newpvcname):
    clone_notebook.CloneNotebook().clone_pvc(namespace, oldpvcname, target_namespace, newpvcname,clone=True)
    return api.success_response("message", "PVC is cloned successfully.")

#YCL creat authorization policy for /view start
@bp.route("/api/namespaces/<namespace>/aps_vnc", methods=["POST"])
@decorators.request_is_json_type
@decorators.required_body_params("name")

def post_pvc1(namespace):
    body = request.get_json()
    log.info("Got body: %s" % body)
   
    authorization = helpers.load_param_yaml(
        utils.AUTHORIZATIONPOLICY_TEMPLATE_YAML,
        name=body["name"],
        namespace=namespace,
        paths=body["paths"],
        useremail = body["useremail"]
    )

    #log.info("Creating AuthorizationPolicy for view...: %s",  authorization)
    api.create_authorization(authorization,namespace)

    return api.success_response("message", "File created successfully.")
#YCL creat authorization policy for /view end