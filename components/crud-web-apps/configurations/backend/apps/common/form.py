
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
            "labels": body["labels"],
            "annotations": body["annotations"],
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
    if body["env"]:
        poddefault["spec"].update({"env": body["env"]})
    if body["volumes"]:
        poddefault["spec"].update({"volumes": body["volumes"]})
    if body["volumeMounts"]:
        poddefault["spec"].update({"volumeMounts": body["volumeMounts"]})
    
    return poddefault
