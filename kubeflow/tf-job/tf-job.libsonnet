local k = import 'k.libsonnet';

{
  parts:: {
    tfJobReplica(replicaType, number, args, image, numGpus=0)::
      local baseContainer = {
        image: image,
        name: "tensorflow",
      };
      local containerArgs = if std.length(args) > 0 then
        {
          args: args,
        }
      else {};
      local resources = if numGpus > 0 then {
        resources: {
          limits: {
            "nvidia.com/gpu": numGpus,
          },
        },
      } else {};
      if number > 0 then
        {
          replicas: number,
          template: {
            spec: {
              containers: [
                baseContainer + containerArgs + resources,
              ],
              restartPolicy: "OnFailure",
            },
          },
          tfReplicaType: replicaType,
        }
      else {},

    tfJob(name, namespace, replicas):: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "TFJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        replicaSpecs: replicas,
      },
    },
  },
}
