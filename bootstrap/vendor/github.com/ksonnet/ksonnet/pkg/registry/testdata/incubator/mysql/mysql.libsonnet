local k = import 'k.libsonnet';

{
  parts:: {
    svc(namespace, name, selector= {app:name}):: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name
        },
      },
      spec: {
        ports: [
          {
            name: "mysql",
            port: 3306,
            targetPort: "mysql",
          },
        ],
        selector: selector
      },
    },

    secret(namespace, name, mysqlPassword, mysqlRootPassword):: {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name,
        },
      },
      type: "Opaque",
      data: {
        "mysql-root-password": std.base64(mysqlRootPassword),
        "mysql-password": std.base64(mysqlPassword),
      },
    },

    pvc(namespace, name, storageClassName=null):: {
      local defaults = {
       persistence: {
          enabled: true,
          accessMode: "ReadWriteOnce",
          size: "8Gi",
        },
      },

      kind: "PersistentVolumeClaim",
      apiVersion: "v1",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name
        },
      },
      spec: {
        accessModes: [
          defaults.persistence.accessMode,
        ],
        resources: {
          requests: {
            storage: defaults.persistence.size,
          },
        },
        // I chose this route to avoid passing both storageClass and storageClassName
        // it does feel a bit hacky and I'm willing to change it
      [if storageClassName != null then "storageClass"]:
        storageClassName,
      },
    },

    configMap(namespace,name,configurationFiles=
      {configurationFiles: {
        "mysql.cnf":
         |||
         - [mysqld]
         skip-name-resolve
        |||,
    }}):: {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: name,
          namespace: namespace,
        },
        data: configurationFiles,
      },

    deployment:: {
      local defaults = {
        imagePullPolicy: "IfNotPresent",
        image: "mysql",
        imageTag: "5.7.14",
        persistence: {
          enabled: true,
          accessMode: "ReadWriteOnce",
          size: "8Gi",
        },
        resources: {
          requests: {
            memory: "256Mi",
            cpu: "100m",
          },
        },
      },

      persistent(namespace, name, secretKeyName, claimName, mysqlUser="", mysqlDatabase="", mysqlAllowEmptyPassword=false, subPath=null, persistenceEnabled=true)::
        base(namespace, name, secretKeyName, claimName, mysqlUser, mysqlDatabase,  mysqlAllowEmptyPassword, subPath, persistenceEnabled),

      nonpersistent(namespace, name, secretKeyName, claimName, mysqlUser, mysqlDatabase, mysqlAllowEmptyPassword=false, subPath=null, persistenceEnabled=false)::
        base(namespace, name, secretKeyName,  claimName, mysqlUser, mysqlDatabase, mysqlAllowEmptyPassword, subPath, persistenceEnabled),

      local base(namespace, name, secretKeyName, claimName, mysqlUser, mysqlDatabase,  mysqlAllowEmptyPassword, subPath, persistenceEnabled)= {
        apiVersion: "extensions/v1beta1",
          kind: "Deployment",
          metadata: {
            name: name,
            labels: {
              app: name,
            },
          },
          spec: {
            template: {
              metadata: {
                labels: {
                  app: name,
                  namespace: namespace
                },
              },
              spec: {
                initContainers: [
                  {
                    name: "remove-lost-found",
                    image: "busybox:1.25.0",
                    // imagePullPolicy: change to "Always" if the imageTag is "latest"
                    imagePullPolicy: defaults.imagePullPolicy,
                    command:  ["rm", "-fr", "/var/lib/mysql/lost+found"],
                    volumeMounts: [
                      {
                        name: "data",
                        mountPath: "/var/lib/mysql",
                        [if subPath != null then "subPath"]: subPath
                      },
                    ]
                  },
                ],
                containers: [
                  {
                    name: name,
                    image: "%s:%s" % [defaults.image, defaults.imageTag],
                    imagePullPolicy: defaults.imagePullPolicy,
                    resources: defaults.resources,
                    env:
                      if mysqlAllowEmptyPassword then [
                        {
                          name: "MYSQL_ALLOW_EMPTY_PASSWORD",
                          value: "true",
                        },
                      ] else [
                        {
                          name: "MYSQL_ROOT_PASSWORD",
                          valueFrom: {
                            secretKeyRef: {
                              name: secretKeyName,
                              key: "mysql-root-password",
                            }
                          },
                        },
                        {
                          name: "MYSQL_PASSWORD",
                          valueFrom: {
                            secretKeyRef: {
                              name: secretKeyName,
                              key: "mysql-password",
                            },
                          },
                        },
                      ] + [
                        {
                          name: "MYSQL_USER",
                          value: if mysqlUser != null then mysqlUser else "",
                        },
                        {
                          name: "MYSQL_DATABASE",
                          value: if mysqlDatabase != null then mysqlDatabase else "",
                        },
                      ],
                    ports: [
                      {
                        name: "mysql",
                        containerPort: 3306,
                      },
                    ],
                    livenessProbe: {
                      exec: {
                        command:
                          if mysqlAllowEmptyPassword then [
                            "mysqladmin",
                            "ping",
                          ] else [
                            "sh",
                            "-c",
                            "mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}",
                          ],
                      },
                      initialDelaySeconds: 30,
                      timeoutSeconds: 5,
                    },
                    readinessProbe: {
                      exec: {
                        command:
                          if mysqlAllowEmptyPassword then [
                            "mysqladmin",
                            "ping",
                          ] else [
                            "sh",
                            "-c",
                            "mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD}",
                          ],
                      },
                      initialDelaySeconds: 5,
                      timeoutSeconds: 1,
                    },
                    volumeMounts: [
                      {
                        name: "data",
                        mountPath: "/var/lib/mysql",
                        [if subPath != null then "subPath"]: subPath,
                      },
                    ] + if "configurationFiles" != null then [
                      {
                        name: "configurations",
                        mountPath: "/etc/mysql/conf.d",
                      }
                    ] else [],
                  },
                ],
                volumes:
                  if "configurationFiles" != null then [
                    {
                      name: "configurations",
                      configMap: {
                        name: name,
                        // using the app name here though this could be expecting the configmap name
                        // my expectation would be that the config map has the same name
                      },
                    },
                  ] else [] + [
                    if persistenceEnabled then {
                      name: "data",
                      persistentVolumeClaim: {
                        claimName:
                          if claimName != null
                          then claimName
                          else name,
                      },
                    } else {
                      name: "data",
                      emptyDir: {},
                    }
                  ],
              },
            },
          },
      },
    },
  },
}
