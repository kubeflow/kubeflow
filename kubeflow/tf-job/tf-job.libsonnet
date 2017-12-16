local k = import 'k.libsonnet';

{
  parts:: {    
    tfJobReplica(replicaType, number, args, image):: 
    if number > 0 then
    {
          "replicas": number, 
          "template": {
            "spec": {
              "containers": [
                {
                  "args": args, 
                  "image": image, 
                  "name": "tensorflow",                 
                },
              ], 
              "restartPolicy": "OnFailure"
            }
          }, 
          "tfReplicaType": replicaType,
    },
    else {}

    tfJob(name, namespace, replicas) = {
        "apiVersion": "tensorflow.org/v1alpha1", 
        "kind": "TfJob", 
        "metadata": {
          "name": name,
          "namespace": namespace,
        }, 
        "spec": {
          "replicaSpecs": replicas,
        }
    },
  },
}
