local k = import "k.libsonnet";
local util = import "util.libsonnet";

{
  parts:: {
    tfJobReplica(replicaType, number, args, image, imagePullSecrets=[], numGpus=0)::
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
              imagePullSecrets: [{ name: secret } for secret in util.toArray(imagePullSecrets)],
              containers: [
                baseContainer + containerArgs + resources,
              ],
              restartPolicy: "OnFailure",
            },
          },
          tfReplicaType: replicaType,
        }
      else {},

    tfJobTerminationPolicy(replicaName, replicaIndex):: {
      chief: {
        replicaName: replicaName,
        replicaIndex: replicaIndex,
      },
    },

    tfJob(name, namespace, replicas, tp):: {
      apiVersion: "kubeflow.org/v1alpha2",
      kind: "TFJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        replicaSpecs: replicas,
        terminationPolicy: tp,
      },
    },
  },
}
