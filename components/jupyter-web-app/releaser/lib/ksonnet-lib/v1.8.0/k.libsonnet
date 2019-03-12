local k8s = import 'k8s.libsonnet';
local fn = {
  mapContainers(f):: {
    local podContainers = super.spec.template.spec.containers,
    spec+: {
      template+: {
        spec+: {
          containers: std.map(f, podContainers),
        },
      },
    },
  },
  mapContainersWithName(names, f)::
    local nameSet = if std.type(names) == 'array' then std.set(names) else std.set([names]);
    local inNameSet(name) = std.length(std.setInter(nameSet, std.set([name]))) > 0;

    self.mapContainers(function(c) if std.objectHas(c, 'name') && inNameSet(c.name) then f(c) else c),
};

k8s + {
  apps:: k8s.apps + {
    v1beta1:: k8s.apps.v1beta1 + {
      deployment:: k8s.apps.v1beta1.deployment + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      statefulSet:: k8s.apps.v1beta1.statefulSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
    v1beta2:: k8s.apps.v1beta2 + {
      daemonSet:: k8s.apps.v1beta2.daemonSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      deployment:: k8s.apps.v1beta2.deployment + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      replicaSet:: k8s.apps.v1beta2.replicaSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      statefulSet:: k8s.apps.v1beta2.statefulSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
  },
  batch:: k8s.batch + {
    v1:: k8s.batch.v1 + {
      job:: k8s.batch.v1.job + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
    v1beta1:: k8s.batch.v1beta1 + {
      cronJob:: k8s.batch.v1beta1.cronJob + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
    v2alpha1:: k8s.batch.v2alpha1 + {
      cronJob:: k8s.batch.v2alpha1.cronJob + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
  },
  core:: k8s.core + {
    v1:: k8s.core.v1 + {
      list:: {
        new(items):: {
          apiVersion: 'v1',
        } + {
          kind: 'List',
        } + self.items(items),
        items(items):: if std.type(items) == 'array' then { items+: items } else { items+: [items] },
      },
      pod:: k8s.core.v1.pod + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      podTemplate:: k8s.core.v1.podTemplate + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      replicationController:: k8s.core.v1.replicationController + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
  },
  extensions:: k8s.extensions + {
    v1beta1:: k8s.extensions.v1beta1 + {
      daemonSet:: k8s.extensions.v1beta1.daemonSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      deployment:: k8s.extensions.v1beta1.deployment + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
      replicaSet:: k8s.extensions.v1beta1.replicaSet + {
        mapContainers(f):: fn.mapContainers(f),
        mapContainersWithName(names, f):: fn.mapContainersWithName(names, f),
      },
    },
  },
}