local apps = import "apps.v1beta1.libsonnet";
local core = import "core.v1.libsonnet";
local extensions = import "extensions.v1beta1.libsonnet";
local util = import "util.libsonnet";

{
  apps:: apps + {
    v1beta1:: apps.v1beta1 + {
      deployment:: apps.v1beta1.deployment + {
        default(name, containers, namespace="default")::
          super.default(name, namespace) + {
            spec+: {
              template: {spec: apps.v1.podSpec.default(containers)},
            },
          },
        mixin:: apps.v1beta1.deployment.mixin + {
          podSpec:: {
            local spec(mixin) = {
              spec+: {
                template+: {
                  spec+: mixin,
                },
              },
            },
            serviceAccountName(serviceAccountName):: spec($.apps.v1.podSpec.serviceAccountName(serviceAccountName)),
            restartPolicy(restartPolicy):: spec($.apps.v1.podSpec.restartPolicy(restartPolicy)),
            automountServiceAccountToken(automountServiceAccountToken):: spec($.apps.v1.podSpec.automountServiceAccountToken(automountServiceAccountToken)),
            activeDeadlineSeconds(activeDeadlineSeconds):: spec($.apps.v1.podSpec.activeDeadlineSeconds(activeDeadlineSeconds)),
            affinity(affinity):: spec($.apps.v1.podSpec.affinity(affinity)),
            serviceAccount(serviceAccount):: spec($.apps.v1.podSpec.serviceAccount(serviceAccount)),
            imagePullSecrets(imagePullSecrets):: spec($.apps.v1.podSpec.imagePullSecrets(imagePullSecrets)),
            hostNetwork(hostNetwork):: spec($.apps.v1.podSpec.hostNetwork(hostNetwork)),
            dnsPolicy(dnsPolicy):: spec($.apps.v1.podSpec.dnsPolicy(dnsPolicy)),
            tolerations(tolerations):: spec($.apps.v1.podSpec.tolerations(tolerations)),
            hostIPC(hostIPC):: spec($.apps.v1.podSpec.hostIPC(hostIPC)),
            initContainers(initContainers):: spec($.apps.v1.podSpec.initContainers(initContainers)),
            schedulerName(schedulerName):: spec($.apps.v1.podSpec.schedulerName(schedulerName)),
            hostPID(hostPID):: spec($.apps.v1.podSpec.hostPID(hostPID)),
            volumes(volumes):: spec($.apps.v1.podSpec.volumes(volumes)),
            nodeName(nodeName):: spec($.apps.v1.podSpec.nodeName(nodeName)),
            securityContext(securityContext):: spec($.apps.v1.podSpec.securityContext(securityContext)),
            nodeSelector(nodeSelector):: spec($.apps.v1.podSpec.nodeSelector(nodeSelector)),
            hostname(hostname):: spec($.apps.v1.podSpec.hostname(hostname)),
            hostMappings(hostMappings):: spec($.apps.v1.podSpec.hostMappings(hostMappings)),
            terminationGracePeriodSeconds(terminationGracePeriodSeconds):: spec($.apps.v1.podSpec.terminationGracePeriodSeconds(terminationGracePeriodSeconds)),
            containers(containers):: spec($.apps.v1.podSpec.containers(containers)),
            subdomain(subdomain):: spec($.apps.v1.podSpec.subdomain(subdomain)),
          },
        },
      },
    },
  },

  core:: core + {
    v1:: core.v1 + {
      container:: core.v1.container + {
        default(name, image)::
          super.default(name) +
          super.image(image),
        helpers:: {
          namedPort(name, port)::
            local portObj =
              core.v1.containerPort.name(name) +
              core.v1.containerPort.containerPort(port);
            core.v1.container.ports(portObj),
        }
      },
    },
  },
  extensions:: extensions,
  util:: util,
}
