import time
from kubeflow.kubeflow.crud_backend import helpers

def parse_poddefault(poddefault):
    """
    poddefault: custom.PodDefault

    Process the PodDefault and format it as the UI expects it.
    """
    
    parsed_poddefault = {
        "name": poddefault["metadata"]["name"],
        "namespace": poddefault["metadata"]["namespace"],
        "labels": poddefault["metadata"].get("labels"),
        "annotations": poddefault["metadata"].get("annotations"),
        "age": {
            "uptime": helpers.get_uptime(poddefault["metadata"]["creationTimestamp"]),
            "timestamp": helpers.get_uptime(poddefault["metadata"]["creationTimestamp"])
        },
        "desc": poddefault["spec"].get("desc"),
        "volumeMounts": poddefault["spec"].get("volumeMounts"),
        "volumes": poddefault["spec"].get("volumes"),
        "envs": poddefault["spec"].get("env")
    }

    return parsed_poddefault

def parse_secret(secret):
    """
    secret: client.V1Secret

    Process the Secret and format it as the UI expects it.
    """
    
    parsed_secret = {
        "name": secret.metadata.name,
        "namespace": secret.metadata.namespace,
        "data": secret.data,
    }

    return parsed_secret

def parse_configmap(configmap):
    """
    configmap: client.V1ConfigMap

    Process the ConfigMap and format it as the UI expects it.
    """
    
    parsed_configmap = {
        "name": configmap.metadata.name,
        "namespace": configmap.metadata.namespace,
        "data": configmap.data,
    }

    return parsed_configmap
