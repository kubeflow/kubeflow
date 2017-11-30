local openvino = import "kubeflow/openvino/openvino.libsonnet";

local params = {
  name: "openvino",
  platform: "gke",
  serviceType: "ClusterIP",
  servicePort: 80,
  targetPort: 80,
  image: "openvino-model-server",
  replicas: 1,
  registry: "gcr.io",
  repoPath: "constant-cubist-173123/inference_server",
  modelName: "resnet",
  modelStorageType: "nfs",
  pvc: "nfs",
  pvcMount: "/opt/ml",
};
local env = {
  namespace: "foo",
};

local instance = openvino.new(env, params);

std.assertEqual(
  instance.parts.ovService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: openvino-mapping\nprefix: /openvino/\nrewrite: /\nservice: openvino.foo:80",
      },
      name: "openvino",
      namespace: "foo",
    },
    spec: {
      ports: [
        {
          name: "ov",
          port: 80,
          targetPort: 80,
        },
      ],
      selector: {
        role: "openvino",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.ovDeployment,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        role: "openvino",
      },
      name: "openvino",
      namespace: "foo",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            role: "openvino",
          },
        },
        spec: {
          containers: [
            {
              args: [
                "ie_serving",
                "model",
                "--model_path",
                "/opt/ml/resnet",
                "--model_name",
                "resnet",
                "--port",
                "80",
              ],
              command: [
                "/ie-serving-py/start_server.sh",
              ],
              image: "gcr.io/constant-cubist-173123/inference_server/openvino-model-server",
              imagePullPolicy: "IfNotPresent",
              name: "openvino",
              ports: [
                {
                  containerPort: 80,
                },
              ],
              resources: {
                limits: {
                  cpu: "4",
                  memory: "4Gi",
                },
                requests: {
                  cpu: "1",
                  memory: "1Gi",
                },
              },
              volumeMounts: [
                {
                  mountPath: "/opt/ml",
                  name: "nfs",
                },
              ],
            },
          ],
          volumes: [
            {
              name: "nfs",
              persistentVolumeClaim: {
                claimName: "nfs",
              },
            },
          ],
        },
      },
    },
  }
)
