// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-batch-predict
// @description TensorFlow batch-predict
// @shortDescription A TensorFlow batch-predict job
// @param name string Name to give to each of the components
// @optionalParam numGpus number 0 number of GPUs to use
// @param modelPath string 0 Path to the model directory
// @param inputFilePatterns string Input file patterns
// @param outputResultPrefix string Output result file prefix
// @param outputErrorPrefix string Output error file prefix
// @optionalParam batchSize number 8 Batch size
// @optionalParam gcpCredentialSecretName string Secret name if used in GCP

local k = import "k.libsonnet";

local tfBatchPredictBase = {
  local base = self,

  // Parameters are intended to be late bound.
  params:: {
    name: null,
    labels: {
      app: base.params.name,
    },
    modelName: self.name,
    modelPath: null,
    inputFilePatterns: null,
    inputFileFormat: null,
    outputResultPrefix: null,
    outputErrorPrefix: null,
    batchSize: 8,
    numGpus: 0,
    gcpCredentialSecretName: "",

    version: "v1",

    // If users want to override the image then can override defaultCpuImage and/or defaultGpuImage
    // in which case the image used will still depend on whether GPUs are used or not.
    // Users can also override the predictImage in which case the user supplied value will always be used
    // regardless of numGpus.
    defaultCpuImage: "gcr.io/kubeflow-examples/batch-predict:tf18",
    defaultGpuImage: "gcr.io/kubeflow-examples/batch-predict:tf18-gpu",

    predictImage: if self.numGpus == 0 then
      self.defaultCpuImage
    else
      self.defaultGpuImage,
  },

  parts:: {
    bpJob: {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: base.params.name + "-" + base.params.version,
        namespace: base.params.namespace,
        labels: base.params.labels,
      },
      spec: {
        template: {
          metadata: {
            labels: base.params.labels,
          },
          backoffLimit: 1,
          spec: {
            containers: [
              {
                name: base.params.name,
                image: base.params.predictImage,
                imagePullPolicy: "IfNotPresent",
                args: [
                  "--model_dir=" + base.params.modelPath,
                  "--input_file_patterns=" + base.params.inputFilePatterns,
                  "--input_file_format=" + base.params.inputFileFormat,
                  "--output_result_prefix=" + base.params.outputResultPrefix,
                  "--output_error_prefix=" + base.params.outputErrorPrefix,
                  "--batch_size=" + base.params.batchSize,
                ],

                env:
                  if base.params.gcpCredentialSecretName != "" then
                    [{
                      name: "GOOGLE_APPLICATION_CREDENTIALS",
                      value: "/secret/gcp-credentials/key.json",
                    }]
                  else [],

                resources: {
                  limits: {
                    [if base.params.numGpus > 0 then "nvidia.com/gpu"]: base.params.numGpus,
                  },
                },

                volumeMounts+: if base.params.gcpCredentialSecretName != "" then [
                  {
                    name: "gcp-credentials",
                    readOnly: true,
                    mountPath: "/secret/gcp-credentials",
                  },
                ],
              },  // container
            ],  // containers

            restartPolicy: "Never",
            activeDeadlineSeconds: 3000,
            // See:  https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server#set-the-user-optional
            // The is user and group should be defined in the Docker image.
            // Per best practices we don't run as the root user.
            securityContext: {
              runAsUser: 1000,
              fsGroup: 1000,
            },
            volumes:
              if base.params.gcpCredentialSecretName != "" then [
                {
                  name: "gcp-credentials",
                  secret: {
                    secretName: base.params.gcpCredentialSecretName,
                  },
                },
              ] else [],
          },  // template spec
        },  // template
      },  // overall spec
    },  // bpJob
  },  // parts
};


// ksonnet appears to require name be a parameter of the prototype which is why we handle it differently.
local name = params.name;

local updatedParams = env + params;

local tfBatchPredict = tfBatchPredictBase {
  // Override parameters with user supplied parameters.
  params+: updatedParams {
    name: name,
  },
};


std.prune(k.core.v1.list.new([tfBatchPredict.parts.bpJob]))
