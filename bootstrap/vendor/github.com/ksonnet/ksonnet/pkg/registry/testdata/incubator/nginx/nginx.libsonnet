local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;

{
  parts:: {
    deployment:: {
      local defaults = {
        imageTag: "1.10.2-r3",
        imagePullPolicy: "IfNotPresent",
      },

      simple(namespace, name, labels={app: name})::
        base(namespace, name, labels),

      withServerBlock(namespace, name, configMapName="nginx-vhost", labels={app: name})::
        local volume = {
          name:: configMapName,
          configMap:: { name: name },
        };
        local dataMount = {
          name:: configMapName,
          mountPath:: "/bitnami/nginx/conf/vhosts",
        };
        base(namespace, name, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume) +
        deployment.mapContainersWithName(
          [name],
          function(c) c + container.withVolumeMounts(dataMount)
        ),

      local base(namespace, name, labels) = {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          namespace: namespace,
          name: name,
          labels: { app: name },
        },
        spec: {
          replicas: 1,
          template: {
            metadata: { labels: labels },
            spec: {
              containers: [{
                name: name,
                image: "bitnami/nginx:" + defaults.imageTag,
                imagePullPolicy: defaults.imagePullPolicy,
                ports: [
                  {
                    name: "http",
                    containerPort: 80,
                  },
                  {
                    name: "https",
                    containerPort: 443,
                  },
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
                volumeMounts: [{
                  name: "nginx-data",
                  mountPath: "/bitnami/nginx",
                }]
              }],
              volumes: [{
                name: "nginx-data",
                emptyDir: {},
              }]
            },
          },
        },
      },
    },

    service(namespace, name, selector={app: name}):: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        namespace: namespace,
        name: name,
        labels: { app: name },
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
        selector: selector,
      },
    },

    serverBlockConfigMap(namespace, name):: {
      local defaults = {
        // example PHP-FPM vhost
        vhost:
        |||
        server {
          listen 0.0.0.0:80;
          root /app;
          location / {
            index index.html index.php;
          }
          location ~ \.php$ {
            fastcgi_pass phpfpm-server:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
          }
        }
      |||
      },
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        namespace: namespace,
        name: name,
        labels: { app: name },
      },
      data: {
        "vhost.conf": defaults.vhost,
      },
    },
  },
}
