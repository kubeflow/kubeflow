local k = import "k.libsonnet";
local deployment = k.extensions.v1beta1.deployment;

{
  parts::{
    svc(namespace, name, selector={app: name}):: {
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
        type: "LoadBalancer",
        ports: [
          {
            name: "http",
            port: 80,
            targetPort: "http",
          },
          {
            name: "https",
            port: 443,
            targetPort: "https",
          },
        ],
        selector: selector
      },
    },

    deployment(namespace, name, labels={app: name})::{
      local defaults = {
        // ref: https://hub.docker.com/r/bitnami/apache/tags/
        imageTag:: "2.4.23-r12",
        // ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
        imagePullPolicy:: "IfNotPresent",
      },
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        namespace: namespace,
        name: name,
        labels: labels
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: labels
          },
          spec: {
            containers: [
              {
                name: name,
                image: "bitnami/apache:%s" % defaults.imageTag,
                imagePullPolicy: defaults.imagePullPolicy,
                ports: [
                  {
                    name: "http",
                    containerPort: 80,
                  },
                  {
                    name: "https",
                    containerPort: 443,
                  }
                ],
                livenessProbe: {
                  httpGet: {
                    path: "/",
                    port: "http",
                  },
                  initialDelaySeconds: 30,
                  timeoutSeconds: 5,
                  failureThreshold: 6,
                },
                readinessProbe: {
                  httpGet: {
                    path: "/",
                    port: "http",
                  },
                  initialDelaySeconds: 5,
                  timeoutSeconds: 3,
                  periodSeconds: 5,
                },
                volumeMounts: [
                  {
                    name: "apache-data",
                    mountPath: "/bitnami/apache",
                  }
                ],
              }
            ],
            volumes: [
              {
                name: "apache-data",
                emptyDir: {},
              }
            ]
          },
        },
      },
    },
  },
}
