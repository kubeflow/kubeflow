# -*- coding: utf-8 -*-
import json
from flask import jsonify, render_template, request
from kubernetes.client.rest import ApiException
from kubeflow.jupyter import app
from kubeflow.jupyter.server import parse_error, \
            get_namespaces, \
            get_notebooks, \
            delete_notebook, \
            create_notebook, \
            create_pvc
from kubeflow.jupyter.utils import create_notebook_template, \
            create_pvc_template, \
            set_notebook_names, \
            set_notebook_image, \
            set_notebook_cpu_ram, \
            add_notebook_volume, \
            spawner_ui_config


# Helper function for getting the prefix of the webapp
def prefix():
  if request.headers.get("x-forwarded-prefix"):
    return request.headers.get("x-forwarded-prefix")
  else:
    return ""


@app.route("/post-notebook", methods=['POST'])
def post_notebook_route():
  data = {"success": True, "log": ""}
  body = request.form

  # Template
  notebook = create_notebook_template()
  notebook_cont = notebook["spec"]['template']['spec']['containers'][0]

  # Set Name and Namespace
  set_notebook_names(notebook, body)

  # Set Image
  set_notebook_image(notebook, body)

  # CPU/RAM
  set_notebook_cpu_ram(notebook, body)

  # Workspacae Volume
  if body["ws_type"] == "New":
    pvc = create_pvc_template()
    pvc['metadata']['name'] = body['ws_name']
    pvc['metadata']['namespace'] = body['ns']
    pvc['spec']['accessModes'].append(body['ws_access_modes'])
    pvc['spec']['resources']['requests']['storage'] = \
        body['ws_size'] + 'Gi'

    try:
      create_pvc(pvc)
    except ApiException as e:
      data["success"] = False
      data["log"] = parse_error(e)
      return jsonify(data)

  # Create the Workspace Volume in the Pod
  if body["ws_type"] != "None":
    add_notebook_volume(
        notebook,
        "volume-" + body["nm"],
        body["ws_name"],
        "/home/jovyan",
    )

  # Add the Data Volumes
  counter = 1
  while ("vol_name" + str(counter)) in body:
    i = str(counter)
    vol_nm = 'data-volume-' + i
    pvc_nm = body['vol_name' + i]
    mnt = body['vol_mount_path' + i]

    # Create a PVC if its a new Data Volume
    if body["vol_type" + i] == "New":
      size = body['vol_size' + i] + 'Gi'
      mode = body['vol_access_modes' + i]
      pvc = create_pvc_template()

      pvc['metadata']['name'] = pvc_nm
      pvc['metadata']['namespace'] = body['ns']
      pvc['spec']['accessModes'].append(mode)
      pvc['spec']['resources']['requests']['storage'] = size

      try:
        create_pvc(pvc)
      except ApiException as e:
        data["success"] = False
        data["log"] = parse_error(e)
        return jsonify(data)

    add_notebook_volume(notebook, vol_nm, pvc_nm, mnt)
    counter += 1

  # Add Extra Resources
  try:
    extra = json.loads(body["extraResources"])
  except Exception as e:
    data["success"] = False
    data["log"] = parse_error(e)
    return jsonify(data)

  notebook_cont['resources']['limits'] = extra

  # If all the parameters are given, then we try to create the notebook
  # return
  try:
    create_notebook(notebook)
  except ApiException as e:
    data["success"] = False
    data["log"] = parse_error(e)
    return jsonify(data)

  return jsonify(data)


@app.route("/add-notebook", methods=['GET'])
def add_notebook_route():
  # A default value for the namespace to add the notebook
  if request.args.get("namespace"):
    ns = request.args.get("namespace")
  else:
    ns = "kubeflow"

  form_defaults = spawner_ui_config("notebook")
  return render_template(
      'add_notebook.html', prefix=prefix(), ns=ns, form_defaults=form_defaults)


@app.route("/delete-notebook", methods=['GET', 'POST'])
def del_notebook_route():
  nb = request.args.get("notebook")
  ns = request.args.get("namespace")

  # try to delete the notebook
  data = {"success": True, "log": ""}
  try:
    delete_notebook(nb, ns)
  except ApiException as e:
    data["success"] = False
    data["log"] = parse_error(e)

  return jsonify(data)


@app.route("/list-notebooks")
def list_notebooks_route():
  ns = request.args.get("namespace")

  # Get the list of Notebooks in the given Namespace
  data = {"notebooks": [], "success": True}
  try:
    data['notebooks'] = get_notebooks(ns)
  except ApiException as e:
    data['notebooks'] = []
    data['success'] = False
    data["log"] = parse_error(e)

  return jsonify(data)


@app.route("/")
@app.route("/home")
@app.route("/notebooks")
def notebooks_route():
  base_ns = "kubeflow"

  # Get the namespaces the token can see
  try:
    nmsps = get_namespaces()
  except ApiException:
    nmsps = [base_ns]

  return render_template(
      'notebooks.html', prefix=prefix(), title='Notebooks', namespaces=nmsps)
