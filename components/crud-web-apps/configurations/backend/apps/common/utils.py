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
        "env": poddefault["spec"].get("env")
    }

    return parsed_poddefault