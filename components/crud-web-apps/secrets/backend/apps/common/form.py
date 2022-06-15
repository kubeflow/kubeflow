from kubernetes import client

def secret_from_dict(body, namespace):
    """
    body: json object (frontend json data)

    Convert the Secret json object that is sent from the backend to a python
    client Secret instance.
    """
    return client.V1Secret(
        metadata=client.V1ObjectMeta(name=body["name"], namespace=namespace),
        type=body["secretType"],
        data=body["data"],
    )
