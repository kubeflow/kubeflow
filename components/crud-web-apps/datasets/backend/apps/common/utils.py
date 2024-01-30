from kubeflow.kubeflow.crud_backend import helpers, api

def parse_s3_accerlerate(juicefsruntime):
    """
    dataset: custom.Dataset

    Process the Dataset and format it as the UI expects it.
    """
    
    dataset = api.get_dynamic_custom_rsrc("data.fluid.io", "v1alpha1", "Dataset", 
                                          juicefsruntime["metadata"]["namespace"], 
                                          juicefsruntime["metadata"]["name"])

    parsed_dataset = {
        "name": juicefsruntime["metadata"]["name"],
        "namespace": juicefsruntime["metadata"]["namespace"],
        "age": {
            "uptime": helpers.get_uptime(juicefsruntime["metadata"]["creationTimestamp"]),
            "timestamp": helpers.get_uptime(juicefsruntime["metadata"]["creationTimestamp"])
        },
        "bucket": dataset["spec"]["mounts"][0]["options"]["bucket"],
        "storage": dataset["spec"]["mounts"][0]["options"]["storage"],
        "mediumType": juicefsruntime["spec"]["tieredstore"]["levels"][0]["mediumtype"],
        "quotaSize": juicefsruntime["spec"]["tieredstore"]["levels"][0]["quota"],
        "path": juicefsruntime["spec"]["tieredstore"]["levels"][0]["path"],
    }

    return parsed_dataset

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
