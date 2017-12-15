local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local storageClass = k.storage.v1beta1.storageClass;
local service = k.core.v1.service;
local networkPolicy = k.extensions.v1beta1.networkPolicy;
local networkSpec = networkPolicy.mixin.spec;

{
  parts:: {
    deployment:: {
      local defaults = {
        image:: "gcr.io/kubeflow/model-server:1.0",
        imagePullPolicy:: "IfNotPresent",
        resources:: {
          "requests": {
            "memory": "1Gi",
            "cpu": "1"
          },
          "limits": {
            "memory": "4Gi",
            "cpu": "4"
          },
        },
      },

      modelService(name, namespace, labels={app:name}): {
        "apiVersion": "v1", 
        "kind": "Service", 
        "metadata": {
          "labels": labels,
          "name": name,
           namespace: namespace,
        }, 
        "spec": {
          "ports": [
            {
              "port": 9000, 
              "targetPort": 9000,
            }
          ],           
          "selector": labels,
          "type": "LoadBalancer"
        }
      },

      modelServer(name, namespace, modelPath, labels={app:name},):
        // TODO(jlewi): Allow the model to be served from a PVC.
        local volume = {
          name: "redis-data",
          namespace: namespace,
          emptyDir: {}
        };
        base(name, namespace, modelPath, labels),
        // + deployment.mixin.spec.template.spec.withVolumes(volume),
        // +
        // deployment.mapContainersWithName(
        //  [name],
        //  function(c) c + container.withVolumeMounts(defaults.dataMount)
        // ),

      local base(name, namespace, modelPath, labels) = 
      {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          name: name,
          namespace: namespace,
          labels: labels,
        },
        spec: {
          template: {
            metadata: {
              labels: labels
            },
            spec: {
              containers: [
                {
                  name: name,
                  image: defaults.image,
                  imagePullPolicy: defaults.imagePullPolicy,
                  // TODO(jlewi): Talk to owensk to figure out why we wrap in a shell.
                  command: [
                    "/bin/sh", 
                    "-c"
                  ], 
                  args: [
                    "/usr/bin/tensorflow_model_server --port=9000 --model_name=" + name + " --model_base_path=" + modelPath,
                  ], 
                  env: [],
                  ports: [
                    {                      
                      containerPort: 9000,
                    },
                  ],
                  // TODO(jlewi): We should add readiness and liveness probes. I think the blocker is that
                  // model-server doesn't have something we can use out of the box.                  
                  resources: defaults.resources,
                },
              ],
              // See:  https://github.com/google/kubeflow/tree/master/components/k8s-model-server#set-the-user-optional
              // The is user and group should be defined in the Docker image.
              // Per best practices we don't run as the root user.
              securityContext: {
                runAsUser: 1000,
                fsGroup: 1000,
              },
            },
          },
        },
      },
    },
  },
}
