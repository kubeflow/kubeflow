import json
from flask import jsonify, render_template, request, Flask
from kubernetes.client.rest import ApiException
from . import api as rok
from ..common import api
from ..common import utils

app = Flask(__name__)
logger = utils.create_logger(__name__)


# Helper function for getting the prefix of the webapp
def prefix():
  if request.headers.get("x-forwarded-prefix"):
    return request.headers.get("x-forwarded-prefix")
  else:
    return ""


# REST Routes
@app.route("/api/namespaces/<namespace>/notebooks")
def list_notebooks_route(namespace):
  # Get the list of Notebooks in the given Namespace
  data = {"notebooks": [], "success": True}
  try:
    data['notebooks'] = api.get_notebooks(namespace)
  except ApiException as e:
    data['notebooks'] = []
    data['success'] = False
    data["log"] = api.parse_error(e)

  return jsonify(data)


@app.route("/api/namespaces/<namespace>/notebooks", methods=['POST'])
def post_notebook(namespace):
  data = {"success": True, "log": ""}
  body = request.form

  # Template
  notebook = utils.create_notebook_template()
  notebook_cont = notebook["spec"]['template']['spec']['containers'][0]

  # Attach ROK token
  rok.attach_rok_token_secret(notebook, body)

  # Set Name and Namespace
  utils.set_notebook_names(notebook, body)

  # Set Image
  utils.set_notebook_image(notebook, body)

  # CPU/RAM
  utils.set_notebook_cpu_ram(notebook, body)

  # Workspacae Volume
  if body["ws_type"] != "None":
    try:
      rok.create_workspace_pvc(body)
    except ApiException as e:
      data["success"] = False
      data["log"] = api.parse_error(e)
      return jsonify(data)

    # Create the Workspace Volume in the Pod
    utils.add_notebook_volume(
        notebook,
        body["ws_name"],
        body["ws_name"],
        "/home/jovyan",
    )

  # Add the Data Volumes
  counter = 1
  while ("vol_name" + str(counter)) in body:
    i = str(counter)
    vol_nm = body['vol_name' + i]
    pvc_nm = vol_nm
    mnt = body['vol_mount_path' + i]

    # Create the Data Volume PVC
    try:
      rok.create_datavol_pvc(body, i)
    except ApiException as e:
      data["success"] = False
      data["log"] = api.parse_error(e)
      return jsonify(data)

    # Create the Data Volume in the Pod
    utils.add_notebook_volume(notebook, vol_nm, pvc_nm, mnt)
    counter += 1

  # Add Extra Resources
  try:
    extra = json.loads(body["extraResources"])
  except Exception as e:
    data["success"] = False
    data["log"] = api.parse_error(e)
    return jsonify(data)

  notebook_cont['resources']['limits'] = extra

  # If all the parameters are given, then we try to create the notebook
  # return
  try:
    api.create_notebook(notebook)
  except ApiException as e:
    data["success"] = False
    data["log"] = api.parse_error(e)
    return jsonify(data)

  return jsonify(data)


@app.route("/api/namespaces/<namespace>/notebooks/<notebook>",
           methods=['DELETE'])
def del_notebook_route(namespace, notebook):
  # try to delete the notebook
  data = {"success": True, "log": ""}
  try:
    api.delete_notebook(notebook, namespace)
  except ApiException as e:
    data["success"] = False
    data["log"] = api.parse_error(e)

  return jsonify(data)


# Front End
@app.route("/new")
def new_notebook():
  # A default value for the namespace to add the notebook
  ns = request.args.get("namespace", "kubeflow")

  # Get default StorageClass
  is_default = False
  try:
    if api.get_default_storageclass() != "":
      is_default = True
  except ApiException as e:
    logger.warning("Can't  list storageclasses: %s" % api.parse_error(e))

  # Load the Rok Token
  rok_token = rok.get_rok_token('kubeflow')

  form_defaults = utils.spawner_ui_config("notebook")
  return render_template(
      'add_notebook.html',
      prefix=prefix(),
      ns=ns,
      form_defaults=form_defaults,
      username="user",
      default_storage_class=is_default,
      rok_token=rok_token)


@app.route("/")
def home():
  base_ns = "kubeflow"

  # Get the namespaces the token can see
  try:
    nmsps = api.get_namespaces()
  except ApiException as e:
    logger.warning("Error when trying to list Namespaces: %s"
                   % api.parse_error(e))
    nmsps = [base_ns]

  return render_template(
      'notebooks.html',
      prefix=prefix(),
      title='Notebooks',
      namespaces=nmsps,
      username="user",
      rok_token=rok.get_rok_token('kubeflow')
  )


if __name__ == '__main__':
  app.run(host="0.0.0.0")