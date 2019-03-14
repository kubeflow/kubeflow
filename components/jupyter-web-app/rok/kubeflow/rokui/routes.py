# -*- coding: utf-8 -*-
import json
from flask import jsonify, render_template, request
from kubernetes.client.rest import ApiException
# from kubernetes import client
from kubeflow.rokui import app
from kubeflow.rokui.api import get_rok_token
from baseui.api import parse_error, \
    get_namespaces, \
    get_notebooks, \
    delete_notebook, \
    create_notebook, \
    create_datavol_pvc, \
    create_workspace_pvc
from baseui.utils import create_notebook_template, \
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
    try:
      create_workspace_pvc(body)
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
      try:
        create_datavol_pvc(data, i)
      except ApiException as e:
        data["success"] = False
        data["log"] = parse_error(e)
        return jsonify(data)

    # Create the Data Volume in the Pod
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

  # Load the Rok Token
  rok_token = get_rok_token('kubeflow')

  form_defaults = spawner_ui_config("notebook")
  return render_template(
      'add_notebook.html',
      prefix=prefix(),
      ns=ns,
      form_defaults=form_defaults,
      username="webapp",
      rok_token=rok_token)


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
      'notebooks.html',
      prefix=prefix(),
      title='Notebooks',
      namespaces=nmsps,
      username="user",
      rok_token=get_rok_token('kubeflow'))
