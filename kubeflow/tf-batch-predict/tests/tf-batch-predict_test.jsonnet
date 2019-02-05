// To run the test:
// jsonnet eval kubeflow/tf-batch-predict/tests/tf-batch-predict_test.jsonnet --jpath . --jpath ./testing/workflows/lib/v1.7.0/

local tf_batch_predict = import "kubeflow/tf-batch-predict/tf-batch-predict.libsonnet";

local params = {
  batchSize: 2,
  gcpCredentialSecretName: "user-gcp-sa",
  inputFileFormat: "tfrecord",
  inputFilePatterns: "gs://mymodel_bucket/object-detection-coco/data/object-detection-images.tfrecord",
  modelPath: "gs://mymodel_bucket/object-detection-coco/image_string_model/saved_model",
  name: "myname",
  numGpus: 1,
  outputErrorPrefix: "gs://myoutput_bucket/tmp/er",
  outputResultPrefix: "gs://myoutput_bucket/tmp/re",
};

local env = {
  namespace: "test-kf-001",
};
local instance_gpu = tf_batch_predict.new(env, params);

local params_dataflow = params {
  numGpus: 0,
  jobName: "myjob",
  projectName: "myproject",
  runDataflow: "true",
  tempLocation: "",
  machineType: "n1-highmem-2",
  maxNumWorkers: 10,
};
local instance_dataflow = tf_batch_predict.new(env, params_dataflow);

local params_cpu = params {
  numGpus: 0,
};
local instance_cpu = tf_batch_predict.new(env, params_cpu);

std.assertEqual(
  instance_gpu.all[0],
  {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      labels: {
        app: "myname",
      },
      name: "myname-v1",
    },
    spec: {
      backoffLimit: 1,
      template: {
        metadata: {
          labels: {
            app: "myname",
          },
        },
        spec: {
          activeDeadlineSeconds: 3000,
          containers: [
            {
              args: [
                "--model_dir=gs://mymodel_bucket/object-detection-coco/image_string_model/saved_model",
                "--input_file_patterns=gs://mymodel_bucket/object-detection-coco/data/object-detection-images.tfrecord",
                "--input_file_format=tfrecord",
                "--output_result_prefix=gs://myoutput_bucket/tmp/re",
                "--output_error_prefix=gs://myoutput_bucket/tmp/er",
                "--batch_size=2",
              ],
              env: [
                {
                  name: "GOOGLE_APPLICATION_CREDENTIALS",
                  value: "/secret/gcp-credentials/key.json",
                },
              ],
              image: "gcr.io/kubeflow-examples/batch-predict:tf18-gpu",
              imagePullPolicy: "IfNotPresent",
              name: "myname",
              resources: {
                limits: {
                  "nvidia.com/gpu": 1,
                },
              },
              volumeMounts: [
                {
                  mountPath: "/secret/gcp-credentials",
                  name: "gcp-credentials",
                  readOnly: true,
                },
              ],
            },
          ],
          restartPolicy: "Never",
          securityContext: {
            fsGroup: 1000,
            runAsUser: 1000,
          },
          volumes: [
            {
              name: "gcp-credentials",
              secret: {
                secretName: "user-gcp-sa",
              },
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  instance_dataflow.all[0].spec.template.spec.containers[0],
  {
    args: [
      "--model_dir=gs://mymodel_bucket/object-detection-coco/image_string_model/saved_model",
      "--input_file_patterns=gs://mymodel_bucket/object-detection-coco/data/object-detection-images.tfrecord",
      "--input_file_format=tfrecord",
      "--output_result_prefix=gs://myoutput_bucket/tmp/re",
      "--output_error_prefix=gs://myoutput_bucket/tmp/er",
      "--batch_size=2",
      "--runner=DataflowRunner",
      "--max_num_workers=10",
      "--project=myproject",
      "--job_name=myjob",
      "--temp_location=gs://myoutput_bucket/tmp/er/tmp",
      "--staging_location=gs://myoutput_bucket/tmp/er/stg",
      "--job_name=myjob",
      "--extra_package=/opt/kubeflow-batch-predict.zip",
      "--worker_machine_type=n1-highmem-2",
    ],
    env: [
      {
        name: "GOOGLE_APPLICATION_CREDENTIALS",
        value: "/secret/gcp-credentials/key.json",
      },
    ],
    image: "gcr.io/kubeflow-examples/batch-predict:tf18",
    imagePullPolicy: "IfNotPresent",
    name: "myname",
    resources: {
      limits: {

      },
    },
    volumeMounts: [
      {
        mountPath: "/secret/gcp-credentials",
        name: "gcp-credentials",
        readOnly: true,
      },
    ],
  }
) &&

std.assertEqual(
  instance_cpu.all[0].spec.template.spec.containers[0],
  {
    args: [
      "--model_dir=gs://mymodel_bucket/object-detection-coco/image_string_model/saved_model",
      "--input_file_patterns=gs://mymodel_bucket/object-detection-coco/data/object-detection-images.tfrecord",
      "--input_file_format=tfrecord",
      "--output_result_prefix=gs://myoutput_bucket/tmp/re",
      "--output_error_prefix=gs://myoutput_bucket/tmp/er",
      "--batch_size=2",
    ],
    env: [
      {
        name: "GOOGLE_APPLICATION_CREDENTIALS",
        value: "/secret/gcp-credentials/key.json",
      },
    ],
    image: "gcr.io/kubeflow-examples/batch-predict:tf18",
    imagePullPolicy: "IfNotPresent",
    name: "myname",
    resources: {
      limits: {

      },
    },
    volumeMounts: [
      {
        mountPath: "/secret/gcp-credentials",
        name: "gcp-credentials",
        readOnly: true,
      },
    ],
  },
)
