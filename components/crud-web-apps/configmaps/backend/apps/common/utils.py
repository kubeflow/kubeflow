from kubeflow.kubeflow.crud_backend import api, helpers


def parse_configmap(cmap):
    """
    cmap: client.V1ConfigMap

    Process the ConfigMap and format it as the UI expects it.
    """
    
    parsed_cmap = {
        "name": cmap.metadata.name,
        "namespace": cmap.metadata.namespace,
        "labels": cmap.metadata.labels,
        "annotations": cmap.metadata.annotations,
        "data": cmap.data,
        "age": {
            "uptime": helpers.get_uptime(cmap.metadata.creation_timestamp),
            "timestamp": cmap.metadata.creation_timestamp.strftime(
                "%d/%m/%Y, %H:%M:%S"
            ),
        }
    }

    return parsed_cmap

