
def poddefault_from_dict(body, namespace):
    """
    body: json object (frontend json data)

    Convert the PodDefault json object that is sent from the backend to a python
    client PodDefault instance.
    """
    
    poddefault = {
        "apiVersion": "kubeflow.org/v1alpha1",
        "kind": "PodDefault",
        "metadata":{
            "name": body["name"],
            "namesapce": namespace,
        },
        "spec":{
            "selector":{
                "matchLabels":{
                    body["name"]: "true"
                }
            },
            "desc": body["desc"]
        }
    }
    if body["envs"]:
        envs = []
        for env in body["envs"]:
            pd_env = {
                "name": env["key"],
                "valueFrom": {
                    "secretKeyRef":{
                        "key": env["value"],
                        "name": env["from"],
                    }
                }
            }
            envs.append(pd_env)
        poddefault["spec"].update({"env": envs})
    
    if body["volumes"]:
        volumes = []
        volumeMounts = []
        
        for vol in body["volumes"]:
            items = []
            for item in vol["value"]:
                pd_item = {
                        "key": item,
                        "path": item,
                    }
                items.append(pd_item)
            
            pd_vol = {
                "name": vol["key"],
                "configMap": {
                    "name": vol["from"],
                    "items": items
                }
            }
            
            pd_volM = {
                "name": vol["key"],
                "mountPath": vol["path"]
            }
            
            volumes.append(pd_vol)
            volumeMounts.append(pd_volM)
        
        poddefault["spec"].update({"volumes": volumes})
        poddefault["spec"].update({"volumeMounts": volumeMounts})
    
    return poddefault
