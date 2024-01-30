from kubernetes import client


def handle_storage_class(vol):
    """
    vol: dict (send from the frontend)

    If the fronend sent the special values `{none}` or `{empty}` then the
    backend will need to set the corresponding storage_class value that the
    python client expects.
    """
    if "class" not in vol:
        return None
    if vol["class"] == "{none}":
        return ""
    if vol["class"] == "{empty}":
        return None
    else:
        return vol["class"]


def configmap_from_dict(body, namespace):
    """
    body: json object (frontend json data)

    Convert the ConfigMap json object that is sent from the backend to a python
    client ConfigMap instance.
    """
    return client.V1ConfigMap(
        metadata=client.V1ObjectMeta(
            name=body["name"], 
            namespace=namespace,
            labels=body["labels"],
            annotations=body["annotations"]),
        data=body["data"]
    )
