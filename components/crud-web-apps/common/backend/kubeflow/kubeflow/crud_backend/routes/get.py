from .. import api
from . import bp


@bp.route("/info")
def get_info():
    return api.success_response("info", {})


@bp.route("/api/namespaces")
def get_namespaces():
    namespaces = api.list_namespaces()
    content = [ns.metadata.name for ns in namespaces.items]

    return api.success_response("namespaces", content)


@bp.route("/api/storageclasses")
def get_storageclasses():
    scs = api.list_storageclasses()
    content = [sc.metadata.name for sc in scs.items]

    return api.success_response("storageClasses", content)


@bp.route("/api/storageclasses/default")
def get_default_storageclass():
    scs = api.list_storageclasses()

    for sc in scs.items:
        annotations = sc.metadata.annotations
        if annotations is None:
            continue

        # List of possible annotations
        keys = [
            "storageclass.kubernetes.io/is-default-class",
            "storageclass.beta.kubernetes.io/is-default-class",  # GKE
        ]

        for key in keys:
            default_sc_annotation = annotations.get(key, "false")

            if default_sc_annotation == "true":
                return api.success_response(
                    "defaultStorageClass", sc.metadata.name
                )

    # No StorageClass is default
    return api.success_response("defaultStorageClass", "")
