local k = import "k.libsonnet";

{
  parts:: {

    paddleJobInstance(min_instance, max_instance):: {
        "min-instance": min_instance,
        "max-instance": max_instance,
    },

    paddleJobResources(limit_cpu, limit_mem, request_cpu, request_mem)::
        local baseResources = {
            limits: {
              cpu: limit_cpu,
              memory: limit_mem,
            },
            requests: {
              cpu: request_cpu,
              memory: request_mem,
            },
        };

        {
            resources: baseResources,
        },
  },
}
