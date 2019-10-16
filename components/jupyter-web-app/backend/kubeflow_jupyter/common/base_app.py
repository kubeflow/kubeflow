from flask import jsonify, request, Blueprint
from kubernetes import client
from . import api
from . import utils

# The BaseApp is a Blueprint that other UIs will use
app = Blueprint("base_app", __name__)
logger = utils.create_logger(__name__)


# Helper function for getting the prefix of the webapp
def prefix():
    if request.headers.get("x-forwarded-prefix"):
        return request.headers.get("x-forwarded-prefix")
    else:
        return ""


# REST Routes
@app.route("/api/namespaces/<namespace>/notebooks")
def get_notebooks(namespace):
    user = utils.get_username_from_request()
    data = api.get_notebooks(namespace, user)

    if not data["success"]:
        return jsonify(data)

    data["notebooks"] = [utils.process_resource(nb)
                         for nb in data["notebooks"]["items"]]
    return jsonify(data)


@app.route("/api/namespaces/<namespace>/poddefaults")
def get_poddefaults(namespace):
    user = utils.get_username_from_request()
    data = api.get_poddefaults(namespace, user)

    if not data["success"]:
        return jsonify(data)

    # Return a list of (label, desc) with the pod defaults
    pdefaults = []
    for pd in data["poddefaults"]["items"]:
        label = list(pd["spec"]["selector"]["matchLabels"].keys())[0]
        if "desc" in pd["spec"]:
            desc = pd["spec"]["desc"]
        else:
            desc = pd["metadata"]["name"]

        pdefaults.append({"label": label, "desc": desc})

    logger.info("Found poddefaults: {}".format(pdefaults))
    data["poddefaults"] = pdefaults
    return jsonify(data)


@app.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    user = utils.get_username_from_request()
    data = api.get_pvcs(namespace, user)
    if not data["success"]:
        return jsonify(data)

    data["pvcs"] = [utils.process_pvc(pvc) for pvc in data["pvcs"].items]

    return jsonify(data)


@app.route("/api/namespaces")
def get_namespaces():
    user = utils.get_username_from_request()
    data = api.get_namespaces(user)

    # Result must be jsonify-able
    if data["success"]:
        nmsps = data["namespaces"]
        data["namespaces"] = [ns.metadata.name for ns in nmsps.items]

    return jsonify(data)


@app.route("/api/storageclasses")
def get_storageclasses():
    user = utils.get_username_from_request()
    data = api.get_storageclasses(user)

    # Result must be jsonify-able
    if data["success"]:
        scs = data["storageclasses"]
        data["storageclasses"] = [sc.metadata.name for sc in scs.items]

    return jsonify(data)


@app.route("/api/storageclasses/default")
def get_default_storageclass():
    user = utils.get_username_from_request()
    data = api.get_storageclasses(user)
    if not data["success"]:
        return jsonify({
            "success": False,
            "log": data["log"]
        })

    strg_classes = data["storageclasses"].items
    for strgclss in strg_classes:
        annotations = strgclss.metadata.annotations
        if annotations is None:
            continue

        # List of possible annotations
        keys = [
            "storageclass.kubernetes.io/is-default-class",
            "storageclass.beta.kubernetes.io/is-default-class"  # GKE
        ]

        for key in keys:
            is_default = annotations.get(key, "false")
            
            if is_default == "true":
                return jsonify({
                    "success": True,
                    "defaultStorageClass": strgclss.metadata.name
                })

    # No StorageClass is default
    return jsonify({
        "success": True,
        "defaultStorageClass": ""
    })


@app.route("/api/config")
def get_config():
    data = {"success": True}

    data["config"] = utils.spawner_ui_config()
    return jsonify(data)


# POSTers
@app.route("/api/namespaces/<namespace>/pvcs", methods=["POST"])
def post_pvc(namespace):
    user = utils.get_username_from_request()
    body = request.get_json()

    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=body["name"],
            namespace=namespace
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[body["mode"]],
            resources=client.V1ResourceRequirements(
                requests={
                    "storage": body["size"] + "Gi"
                }
            )
        )
    )

    return jsonify(api.post_pvc(pvc, user))


# DELETErs
@app.route("/api/namespaces/<namespace>/notebooks/<notebook>",
           methods=["DELETE"])
def delete_notebook(namespace, notebook):
    user = utils.get_username_from_request()
    return jsonify(api.delete_notebook(namespace, notebook, user))


if __name__ == "__main__":
    app.run(host="0.0.0.0")
