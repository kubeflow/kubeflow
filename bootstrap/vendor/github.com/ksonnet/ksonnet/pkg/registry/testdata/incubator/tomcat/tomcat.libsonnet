local k = import 'k.libsonnet';

{
  parts::{
    local defaults = {
      serviceType: "LoadBalancer"
    },

    svc(namespace, name, selector={app: name})::{
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
          type: defaults.serviceType,
          ports: [
            {
              name: "http",
              port: 80,
              targetPort: "http",
            },
          ],
          selector: selector
        },
    },

    secret(namespace, name, tomcatPassword):: {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name
        },
      },
      type: "Opaque",
      data:
        if tomcatPassword != null then {
          "tomcat-password": std.base64(tomcatPassword)
        } else error "Please set password"
    },

    pvc(namespace, name, storageClass=null):: {
      local defaults = {
        persistence: {
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
          app: name,
        },
        annotations:
          if storageClass != null then {
            "volume.beta.kubernetes.io/storage-class": storageClass,
          } else {
            "volume.alpha.kubernetes.io/storage-class": "default",
          },
      },
      spec: {
        accessModes: [
          defaults.persistence.accessMode
        ],
        resources: {
          requests: {
            storage: defaults.persistence.size,
          },
        },
      },
    },

    deployment:: {
      local defaults = {
        image: "bitnami/tomcat:8.0.46-r0",
        imagePullPolicy: "IfNotPresent",
        tomcatAllowRemoteManagement: 0,
        persistence:{
          accessMode: "ReadWriteOnce",
          size: "8Gi",
        },
        resources:{
          requests: {
            memory: "512Mi",
            cpu: "300m",
            },
        },
      },

      persistent(namespace, name, tomcatUser, passwordSecretName, claimName)::
        base(namespace, name, tomcatUser, passwordSecretName) +
        k.apps.v1beta1.deployment.mixin.spec.template.spec.withVolumes(
          {
            name: "tomcat-data",
            persistentVolumeClaim: {
              claimName: claimName,
            },
          }),

      nonPersistent(namespace, name, tomcatUser, passwordSecretName)::
        base(namespace, name, tomcatUser, passwordSecretName) +
        k.apps.v1beta1.deployment.mixin.spec.template.spec.withVolumes(
          {
            name: "tomcat-data",
            emptyDir: {}
          }),

      local base(namespace, name, tomcatUser, passwordSecretName) = {
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
              },
            },
            spec: {
              containers: [
                {
                  name: name,
                  image: defaults.image,
                  imagePullPolicy: defaults.imagePullPolicy,
                  env: [
                    {
                      name: "TOMCAT_USERNAME",
                      value: tomcatUser,
                    },
                    {
                      name: "TOMCAT_PASSWORD",
                      valueFrom: {
                        secretKeyRef: {
                          name: passwordSecretName,
                          key: "tomcat-password",
                        },
                      },
                    }
                    {
                      name: "TOMCAT_ALLOW_REMOTE_MANAGEMENT",
                      value: defaults.tomcatAllowRemoteManagement,
                    },
                  ],
                  ports: [
                    {
                      name: "http",
                      containerPort: 8080,
                    },
                  ],
                  livenessProbe: {
                    httpGet: {
                      path: "/",
                      port: "http",
                    },
                    initialDelaySeconds: 120,
                    timeoutSeconds: 5,
                    failureThreshold: 6,
                  },
                  readinessProbe: {
                    httpGet: {
                      path: "/",
                      port: "http",
                    },
                    initialDelaySeconds: 30,
                    timeoutSeconds: 3,
                    periodSeconds: 51,
                  },
                  resources: defaults.resources,
                  volumeMounts: [
                    {
                      name: "tomcat-data",
                      mountPath: "/bitnami/tomcat",
                    },
                  ],
                },
              ],
            },
          },
        },
      }
    },
  },
}
