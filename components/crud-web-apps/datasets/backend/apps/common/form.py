
def dataset_from_dict(body, namespace):
    """
    body: json object (frontend json data)

    Convert the Dataset json object that is sent from the backend to a python
    client Dataset instance.
    """
    
    dataset = {
        "apiVersion": "data.fluid.io/v1alpha1",
        "kind": "Dataset",
        "metadata":{
            "name": body["name"],
            "namesapce": namespace,
        },
        "spec":{
            "mounts":[
                {
                    "mountPoint": body["mountPoint"],
                    "name": body["name"],
                    "options": {
                        "bucket": body["name"],
                        "storage": body["storage"],
                    },
                    "encryptOptions": [
                        {
                            "name": "metaurl",
                            "valueFrom": {
                                "secretKeyRef": {
                                    "key": body["metaurl_key"],
                                    "name": body["metaurl_name"]
                                }
                            }
                        },
                        {
                            "name": "access-key",
                            "valueFrom": {
                                "secretKeyRef": {
                                    "key": body["access_key"],
                                    "name": body["access_key_name"]
                                }
                            }
                        },
                        {
                            "name": "secret-key",
                            "valueFrom": {
                                "secretKeyRef": {
                                    "key": body["secret_key"],
                                    "name": body["secret_key_name"]
                                }
                            }
                        }
                ],
                }
            ]
        }
    }
    return dataset

def juicefsruntime_from_dict(body, namespace):
    """
    body: json object (frontend json data)

    Convert the JuiceFSRuntime json object that is sent from the backend to a python
    client JuiceFSRuntime instance.
    """
    
    juicefsruntime = {
        "apiVersion": "data.fluid.io/v1alpha1",
        "kind": "JuiceFSRuntime",
        "metadata":{
            "name": body["name"],
            "namesapce": namespace,
        },
        "spec":{
            "fuse": {
                "resources": {}
            },
            "initUsers": {
                "resources": {}
            },
            "jobWorker": {
                "resources": {}
            },
            "juicefsVersion": {},
            "master": {
                "resources": {}
            },
            "replicas": 1,
            "tieredstore":{
                "levels":[
                    {
                       "mediumtype": body["mediumType"],
                       "path": body["path"],
                       "quota": body["quotaSize"],
                       "high": "0.95",
                       "low": "0.7"
                    }
                ]
            },
            "worker": {
                "resources": {}
            }
        }
    }
    
    return juicefsruntime