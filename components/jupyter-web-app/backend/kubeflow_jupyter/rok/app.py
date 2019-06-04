import base64
import json
from flask import Flask, request, jsonify, send_from_directory
from ..common.base_app import app as base
from ..common import utils, api
from . import rok

# Use the BaseApp, override the POST Notebook Endpoint
app = Flask(__name__)
app.register_blueprint(base)
logger = utils.create_logger(__name__)

NOTEBOOK = './kubeflow_jupyter/common/yaml/notebook.yaml'


# GETers
@app.route("/api/rok/namespaces/<namespace>/token")
def get_token(namespace):
    """Retrieve the token to authenticate with Rok."""
    secret = None
    name = rok.rok_secret_name()
    token = {
        'name': name,
        'value': "",
    }

    data = api.get_secret(namespace, name)
    if not data['success']:
        logger.warning("Couldn't load ROK token in namespace '{}': {}".format(
            namespace, data['log']
        ))
        data['token'] = token
        return jsonify(data)

    secret = data['secret']
    if secret.data is None:
        logger.warning(
            "ROK Secret doesn't exist in namespace '%s'" % namespace
        )
        return jsonify({
            'success': False,
            'log': "ROK Secret doesn't exist in namespace '%s'" % namespace,
            'token': token
        })

    token = secret.data.get('token', '')
    data['token'] = {
        'value': base64.b64decode(token).decode('utf-8'),
        'name': name
    }
    del data['secret']

    return jsonify(data)


# POSTers
@app.route("/api/namespaces/<namespace>/notebooks", methods=['POST'])
def post_notebook(namespace):
    body = request.get_json()
    logger.info('Got Notebook: ' + json.dumps(body))

    notebook = utils.load_param_yaml(NOTEBOOK,
                                     name=body['name'],
                                     namespace=namespace)

    rok.attach_rok_token_secret(notebook)
    utils.set_notebook_image(notebook, body)
    utils.set_notebook_specs(notebook, body)

    # Workspace Volume
    workspace_vol = body["workspace"]
    if not body["noWorkspace"]:
        # Create the PVC
        ws_pvc = rok.rok_pvc(workspace_vol, namespace)

        if workspace_vol["type"] == "Existing":
            rok.add_workspace_volume_annotations(ws_pvc, workspace_vol)

        r = api.post_pvc(ws_pvc)
        if not r["success"]:
            return jsonify(r)

        logger.info("Created Workspace Volume: {}".format(r['pvc'].to_dict()))

        utils.add_notebook_volume(
            notebook,
            r['pvc'].metadata.name,
            r['pvc'].metadata.name,
            "/home/jovyan",
        )
        

    # Add th Data Volumes
    for vol in body["datavols"]:
        # Create the PVC
        dtvol_pvc = rok.rok_pvc(vol, namespace)

        if vol["type"] == "Existing":
            rok.add_data_volume_annotations(dtvol_pvc, vol)

        r = api.post_pvc(dtvol_pvc)
        if not r["success"]:
            return jsonify(r)

        logger.info("Created Data Volume: {}".format(dtvol_pvc))

        utils.add_notebook_volume(
            notebook,
            r['pvc'].metadata.name,
            r['pvc'].metadata.name,
            vol["path"]
        )

    # Extra Resources
    r = utils.set_notebook_extra_resources(notebook, body)
    if not r["success"]:
        return jsonify(r)

    logger.info("Creating Notebook:", notebook)
    return jsonify(api.post_notebook(notebook))


# Since Angular is a SPA, we serve index.html every time
@app.route("/")
def serve_root():
    return send_from_directory('./static/', 'index.html')


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('./static/', path)


@app.errorhandler(404)
def page_not_found(e):
    logger.info("Sending file 'index.html'")
    return send_from_directory('./static/', 'index.html')

