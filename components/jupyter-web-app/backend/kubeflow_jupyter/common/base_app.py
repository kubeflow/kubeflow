from flask import jsonify, request, Blueprint
from kubernetes import client
from . import api
from . import utils

# The BaseApp is a Blueprint that other UIs will use
app = Blueprint('base_app', __name__)
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
    data = api.get_notebooks(namespace)

    if not data['success']:
        return jsonify(data)

    data['notebooks'] = [utils.process_resource(nb)
                         for nb in data['notebooks']['items']]
    return jsonify(data)


@app.route("/api/namespaces/<namespace>/pvcs")
def get_pvcs(namespace):
    # Get the active viewers for each PVC
    data = api.get_pvcs(namespace)
    if not data['success']:
        return jsonify(data)

    data['pvcs'] = [utils.process_pvc(pvc) for pvc in data['pvcs'].items]

    return jsonify(data)


@app.route("/api/namespaces")
def get_namespaces():
    data = api.get_namespaces()

    # Result must be jsonify-able
    if data['success']:
        nmsps = data['namespaces']
        data['namespaces'] = [ns.metadata.name for ns in nmsps.items]

    return jsonify(data)


@app.route("/api/storageclasses")
def get_storageclasses():
    data = api.get_storageclasses()

    # Result must be jsonify-able
    if data['success']:
        scs = data['storageclasses']
        data['storageclasses'] = [sc.metadata.name for sc in scs.items]

    return jsonify(data)


@app.route("/api/storageclasses/default")
def get_default_storageclass():
    data = api.get_storageclasses()
    if not data['success']:
        return jsonify({
            'success': False,
            'log': data['log']
        })

    strg_classes = data['storageclasses'].items
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
                'success': True,
                'defaultStorageClass': strgclss.metadata.name
            })

    # No StorageClass is default
    return jsonify({
        'success': True,
        'defaultStorageClass': ''
    })


@app.route("/api/config")
def get_config():
    data = {"success": True}

    data['config'] = utils.spawner_ui_config()
    return jsonify(data)


# POSTers
@app.route("/api/namespaces/<namespace>/pvcs", methods=['POST'])
def post_pvc(namespace):
    body = request.get_json()

    pvc = client.V1PersistentVolumeClaim(
        metadata=client.V1ObjectMeta(
            name=body['name'],
            namespace=namespace
        ),
        spec=client.V1PersistentVolumeClaimSpec(
            access_modes=[body['mode']],
            resources=client.V1ResourceRequirements(
                requests={
                    'storage': body['size'] + 'Gi'
                }
            )
        )
    )

    return jsonify(api.post_pvc(pvc))


# DELETErs
@app.route("/api/namespaces/<namespace>/notebooks/<notebook>",
           methods=['DELETE'])
def delete_notebook(namespace, notebook):
    return jsonify(api.delete_notebook(namespace, notebook))


@app.route("/api/namespaces/<namespace>/pvcs/<pvc>", methods=['DELETE'])
def delete_pvc(namespace, pvc):
    '''
    Check if any Pod is using that PVC
    '''
    data = api.get_pods(namespace)
    if not data['success']:
        return jsonify({
            'success': False,
            'log': "Couldn't list Pods: " + data['log']
        })

    pods = data['pods'].items
    for pod in pods:
        if not pod.spec.volumes:
            continue

        vols = pod.spec.volumes
        for vol in vols:
            # Check if Volume is PVC
            if not vol.persistent_volume_claim:
                continue

            # It is a PVC mount, check if it is the one we want to delete
            if vol.persistent_volume_claim.claim_name == pvc:
                msg = "Can't delete Volume {}. It is used from Pod {}".format(
                    pvc, pod.metadata.name
                )
                return jsonify({
                    'success': False,
                    'log': msg,
                })

    return jsonify(api.delete_pvc(namespace, pvc))


if __name__ == '__main__':
    app.run(host="0.0.0.0")
