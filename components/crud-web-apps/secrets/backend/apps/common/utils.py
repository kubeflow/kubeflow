from kubeflow.kubeflow.crud_backend import helpers


def parse_secret(secret):
    """
    secret: client.V1Secret

    Process the Secret and format it as the UI expects it.
    """
    
    parsed_secret = {
        "name": secret.metadata.name,
        "namespace": secret.metadata.namespace,
        "labels": secret.metadata.labels,
        "annotations": secret.metadata.annotations,
        "type": secret.type,
        "age": {
            "uptime": helpers.get_uptime(secret.metadata.creation_timestamp),
            "timestamp": secret.metadata.creation_timestamp.strftime(
                "%d/%m/%Y, %H:%M:%S"
            ),
        },
        "data": secret.data,
    }

    return parsed_secret
