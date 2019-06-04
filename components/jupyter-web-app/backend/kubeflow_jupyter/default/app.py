from flask import Flask, request, jsonify, send_from_directory
from ..common.base_app import app as base
from ..common import utils, api

app = Flask(__name__)
app.register_blueprint(base)
logger = utils.create_logger(__name__)

NOTEBOOK = './kubeflow_jupyter/common/yaml/notebook.yaml'


# POSTers
@app.route("/api/namespaces/<namespace>/notebooks", methods=['POST'])
def post_notebook(namespace):
    body = request.get_json()
    logger.info('Got Notebook: {}'.format(body))

    notebook = utils.load_param_yaml(NOTEBOOK,
                                     name=body['name'],
                                     namespace=namespace)

    utils.set_notebook_image(notebook, body)
    utils.set_notebook_specs(notebook, body)

    # Workspace Volume
    workspace_vol = body["workspace"]
    if not body["noWorkspace"] and workspace_vol["type"] == "New":
        # Create the PVC
        ws_pvc = utils.pvc_from_dict(workspace_vol, namespace)

        logger.info("Creating Workspace Volume: {}".format(ws_pvc.to_dict()))
        r = api.post_pvc(ws_pvc)
        if not r["success"]:
            return jsonify(r)

    if not body["noWorkspace"]:
        utils.add_notebook_volume(
            notebook,
            workspace_vol["name"],
            workspace_vol["name"],
            "/home/jovyan",
        )

    # Add th Data Volumes
    for vol in body["datavols"]:
        if vol["type"] == "New":
            # Create the PVC
            dtvol_pvc = utils.pvc_from_dict(vol, namespace)

            logger.info("Creating Data Volume {}:".format(dtvol_pvc))
            r = api.post_pvc(dtvol_pvc)
            if not r["success"]:
                return jsonify(r)

        utils.add_notebook_volume(
            notebook,
            vol["name"],
            vol["name"],
            vol["path"]
        )

    # Extra Resources
    r = utils.set_notebook_extra_resources(notebook, body)
    if not r["success"]:
        return jsonify(r)

    logger.info("Creating Notebook: {}".format(notebook))
    return jsonify(api.post_notebook(notebook))


# Since Angular is a SPA, we serve index.html every time
@app.route("/")
def serve_root():
    return send_from_directory('./static/', 'index.html')


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    logger.info("Sending file '/static/{}' for path: {}".format(path, path))
    return send_from_directory('./static/', path)


@app.errorhandler(404)
def page_not_found(e):
    logger.info("Sending file 'index.html'")
    return send_from_directory('./static/', 'index.html')

