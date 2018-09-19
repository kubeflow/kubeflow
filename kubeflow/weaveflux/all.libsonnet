{
  // Define the various prototypes you want to support.
  // Each prototype should be a list of different parts that together
  // provide a userful function such as WeaveWorks Flux
  weaveflux(params, env):: [
    $.parts(params, env).fluxip,
    $.parts(params, env).flux,
    $.parts(params, env).memcachedep,
    $.parts(params, env).memcachesvc,
    $.parts(params, env).serviceAccount,
    $.parts(params, env).role,
    $.parts(params, env).roleBinding,
    $.parts(params, env).secret,

  ],


  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    // local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,

    serviceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          name: "flux",
        },
        name: "flux",
      },
    },

    role:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          name: "flux",
        },
        name: "flux",
      },
      rules: [
        {
          apiGroups: [
            "*",
          ],
          resources: [
            "*",
          ],
          verbs: [
            "*",
          ],
        },
        {
          nonResourceURLs: [
            "*",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          name: "flux",
        },
        name: "flux",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "flux",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "flux",
          namespace: params.namespace,
        },
      ],
    },

    secret:: {
      // K8s Deployment,
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: "flux-git-deploy",
      },
      type: "Opaque",
    },

    flux:: {
      // K8s Deployment,

      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "flux",
      },
      spec: {
        replicas: 1,
        strategy: {
          type: "Recreate",
        },
        template: {
          metadata: {
            labels: {
              name: "flux",
            },
          },
          spec: {
            containers: [
              {
                args: [
                  "--ssh-keygen-dir=/var/fluxd/keygen",
                  "--git-url=" + params.gitUrl,
                  "--git-branch=master",
                ],
                image: "quay.io/weaveworks/flux:1.4.2",
                imagePullPolicy: "IfNotPresent",
                name: "flux",
                ports: [
                  {
                    containerPort: 3030,
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/etc/fluxd/ssh",
                    name: "git-key",
                    readOnly: true,
                  },
                  {
                    mountPath: "/var/fluxd/keygen",
                    name: "git-keygen",
                  },
                ],
              },
            ],
            serviceAccount: "flux",
            volumes: [
              {
                name: "git-key",
                secret: {
                  defaultMode: 256,
                  secretName: "flux-git-deploy",
                },
              },
              {
                emptyDir: {
                  medium: "Memory",
                },
                name: "git-keygen",
              },
            ],
          },
        },
      },

      fluxip:: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          labels: {
            app: "flux",
          },
          name: "flux-ip",
        },
        spec: {
          ports: [
            {
              port: 3030,
              protocol: "TCP",
              targetPort: 3030,
            },
          ],
          selector: {
            name: "flux",
          },
          type: params.serviceType,
        },
      },

      memcachedep:: {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          name: "memcached",
        },
        spec: {
          replicas: 1,
          template: {
            metadata: {
              labels: {
                name: "memcached",
              },
            },
            spec: {
              containers: [
                {
                  args: [
                    "-m 64",
                    "-p 11211",
                    "-vv",
                  ],
                  image: "memcached:1.4.25",
                  imagePullPolicy: "IfNotPresent",
                  name: "memcached",
                  ports: [
                    {
                      containerPort: 11211,
                      name: "clients",
                    },
                  ],
                },
              ],
            },
          },
        },
      },

      memcachesvc:: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "memcached",
        },
        spec: {
          clusterIP: "None",
          ports: [
            {
              name: "memcached",
              port: 11211,
            },
          ],
          selector: {
            name: "memcached",
          },
        },
      },
    },
  },
}
