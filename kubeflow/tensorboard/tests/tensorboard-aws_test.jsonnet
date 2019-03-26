local aws = import "kubeflow/tensorboard/aws.libsonnet";
local tensorboard = import "kubeflow/tensorboard/tensorboard.libsonnet";

local params = {
  name: "tensorboard",
  logDir: "logs",
  targetPort: "6006",
  servicePort: "9000",
  serviceType: "LoadBalancer",
  defaultTbImage: "tensorflow/tensorflow:1.9.0",
  s3Enabled: true,
  s3SecretName: "foo",
  s3SecretAccesskeyidKeyName: "bar",
  s3SecretSecretaccesskeyKeyName: "baz",
  s3AwsRegion: "us-west1-a",
  s3UseHttps: "true",
  s3VerifySsl: "true",
  s3Endpoint: "null",
  efsEnabled: true,
  efsPvcName: "qux",
  efsVolumeName: "quux",
  efsMountPath: "/quuz",
};
local env = {
  namespace: "test-kf-001",
};

local instance = tensorboard.new(env, params) + aws;

std.assertEqual(
  instance.tbService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: tb-mapping-tensorboard-get\nprefix: /tensorboard/ tensorboard/\nrewrite: /\nmethod: GET\nservice: tensorboard.test-kf-001:9000",
      },
      labels: {
        app: "tensorboard",
      },
      name: "tensorboard",
      namespace: "test-kf-001",
    },
    spec: {
      ports: [
        {
          name: "tb",
          port: "9000",
          targetPort: "6006",
        },
      ],
      selector: {
        app: "tensorboard",
      },
      type: "LoadBalancer",
    },
  }
) &&

std.assertEqual(
  instance.tbDeployment,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        app: "tensorboard",
      },
      name: "tensorboard",
      namespace: "test-kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: "tensorboard",
          },
        },
        spec: {
          containers: [
            {
              args: [
                "--logdir=logs",
                "--port=6006",
              ],
              command: [
                "/usr/local/bin/tensorboard",
              ],
              env: [
                {
                  name: "AWS_ACCESS_KEY_ID",
                  valueFrom: {
                    secretKeyRef: {
                      key: "bar",
                      name: "foo",
                    },
                  },
                },
                {
                  name: "AWS_SECRET_ACCESS_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      key: "baz",
                      name: "foo",
                    },
                  },
                },
                {
                  name: "AWS_REGION",
                  value: "us-west1-a",
                },
                {
                  name: "S3_REGION",
                  value: "us-west1-a",
                },
                {
                  name: "S3_USE_HTTPS",
                  value: "true",
                },
                {
                  name: "S3_VERIFY_SSL",
                  value: "true",
                },
                {
                  name: "S3_ENDPOINT",
                  value: "null",
                },
              ],
              image: "tensorflow/tensorflow:1.9.0",
              imagePullPolicy: "IfNotPresent",
              name: "tensorboard",
              ports: [
                {
                  containerPort: "6006",
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
                  mountPath: "/quuz",
                  name: "quux",
                },
              ],
            },
          ],
          volumes: [
            {
              name: "quux",
              persistentVolumeClaim: {
                claimName: "qux",
              },
            },
          ],
        },
      },
    },
  }
)
