local k = import 'k.libsonnet';

{
  parts:: {    
    tfJobReplica(replicaType, number, args, image, numGpus=0):: 
    if number > 0 then
    {
          "replicas": number, 
          "template": {
            "spec": {
              "containers": [
                {
                  "image": image, 
                  "name": "tensorflow",                 
                } + 
                if std.length(args) >0 then 
                {
                  args: args,
                }
                else {},
              ], 
              resources: if numGpus > 0 then
              {
                limits: {
                  "nvidia.com/gpu": numGpus,
                }
              }
              else {},
              "restartPolicy": "OnFailure"
            }
          }, 
          "tfReplicaType": replicaType,
    }
    else {},

    tfJob(name, namespace, replicas):: {
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
