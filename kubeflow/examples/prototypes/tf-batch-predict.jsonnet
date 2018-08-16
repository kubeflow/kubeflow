// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-batch-predict
// @description TensorFlow batch-predict
// @shortDescription A TensorFlow batch-predict job
// @param name string Name to give to each of the components
// @optionalParam numGpus number 0 Name to give to each of the components
// @param modelPath string 0 Name to give to each of the components
// @param inputFilePatterns string Name to give to each of the components
// @param outputResultPrefix string  Name to give to each of the components
// @param outputErrorPrefix string Name to give to each of the components
// @optionalParam batchSize number 8 Name to give to each of the components

local k = import "k.libsonnet";

local tfBatchPredictBase = {
  // Parameters are intended to be late bound.
  local base = self,
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

    // Which cloud to use
    // cloud:: "gcp",
    cloud:: null,
  },

  // Parametes specific to GCP.
  gcpParams:: {
    gcpCredentialSecretName: "",
  } + self.params,


  parts:: {
    // We define the containers one level beneath parts because combined with jsonnet late binding
    // this makes it easy for users to override specific bits of the container.
    tfBatchPredictContainerBase:: {
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
      resources: {
        requests: {
          memory: "4Gi",
          cpu: "1",
        },
        limits: {
          memory: "4Gi",
          cpu: "4",
        },
      },
    },  // tfBatchPredictContainerBase

    tfBatchPredictContainer+: base.parts.tfBatchPredictContainerBase +
                                 if base.params.numGpus > 0 then
                                  {
                                    resources+: {
                                    limits+: {
                                      "nvidia.com/gpu": base.params.numGpus,
                                    },
                                  },
                                 }
                             else {},

    tfJob: {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: base.params.name + base.params.version,
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
              base.parts.tfBatchPredictContainer,
            ],
            restartPolicy: "Never",
            activeDeadlineSeconds: 3000,
            // See:  https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server#set-the-user-optional
            // The is user and group should be defined in the Docker image.
            // Per best practices we don't run as the root user.
            securityContext: {
              runAsUser: 1000,
              fsGroup: 1000,
            },
          },
        },
      },
    },  // tfJob
  }, // parts

  // Parts specific to GCP
  gcpParts:: base.parts {
    gcpEnv:: [
      if base.gcpParams.gcpCredentialSecretName != "" then
        { name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" },
    ],

    tfBatchPredictContainer: base.parts.tfBatchPredictContainer {
      env+: base.gcpParts.gcpEnv,
      volumeMounts+: [
        if base.gcpParams.gcpCredentialSecretName != "" then
          {
            name: "gcp-credentials",
            readOnly: true,
            mountPath: "/secret/gcp-credentials",
          },
      ],
    },

    tfJob: base.parts.tfJob {
      spec+: {
        template+: {

          spec+: {
            containers: [
              base.gcpParts.tfBatchPredictContainer,
            ],

            volumes: [
              if base.gcpParams.gcpCredentialSecretName != "" then
                {
                  name: "gcp-credentials",
                  secret: {
                    secretName: base.gcpParams.gcpCredentialSecretName,
                  },
                },
            ],
          },
        },
      },
    },  // tfJob
  },  // gcpParts

  components:: {
    all::
        if base.params.cloud == "gcp" then
        [
          base.gcpParts.tfJob,
        ]
      else
        [
          base.parts.tfJob,
        ],
  }.all,

};

// ksonnet appears to require name be a parameter of the prototype which is why we handle it differently.
local name = params.name;

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;
// local updatedParams = params;

local tfBatchPredict = tfBatchPredictBase {
  // Override parameters with user supplied parameters.
  params+: updatedParams {
    name: name,
  },
};


std.prune(k.core.v1.list.new([tfBatchPredict.components]))
