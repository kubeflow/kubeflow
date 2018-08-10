{
  // Parameters are intended to be late bound.
  params:: {
    name: null,
    labels: {
      app: $.params.name,
    },
    modelName: $.params.name,
    modelPath: null,
    inputFilePatterns: null,
    inputFileFormat: null,
    outputResultPrefix: null,
    outputErrorPrefix: null,
    batchSize: 64,
    numGpus: 0,

    version: "v1",

    serviceType: "ClusterIP",
    // If users want to override the image then can override defaultCpuImage and/or defaultGpuImage
    // in which case the image used will still depend on whether GPUs are used or not.
    // Users can also override the predictImage in which case the user supplied value will always be used
    // regardless of numGpus.
    defaultCpuImage: "gcr.io/kubeflow-examples/batch-predict:tf18",
    defaultGpuImage: "gcr.io/kubeflow-examples/batch-predict:tf18-gpu",

    predictImage: if $.params.numGpus == 0 then
      $.params.defaultCpuImage
    else
      $.params.defaultGpuImage,


    // Which cloud to use
    cloud:: null,
  },

  // Parametes specific to GCP.
  gcpParams:: {
    gcpCredentialSecretName: "",
  } + $.params,


  components:: {
    all::
        if $.params.cloud == "gcp" then
        [
          $.gcpParts.tfJob,
        ]
      else
        [
          $.parts.tfJob,
        ],
  }.all,

  parts:: {
    // We define the containers one level beneath parts because combined with jsonnet late binding
    // this makes it easy for users to override specific bits of the container.
    tfBatchPredictContainerBase:: {
      name: $.params.name,
      image: $.params.predictImage,
      imagePullPolicy: "IfNotPresent",
      args: [
        "--model_dir=" + $.params.modelPath,
		"--input_file_patterns=" + $.params.inputFilePatterns,
		"--input_file_format=" + $.params.inputFileFormat,
		"--output_result_prefix=" + $.params.outputResultPrefix,
		"--output_error_prefix=" + $.params.outputErrorPrefix,
		"--batch_size=" + $.params.batchSize,
      ],
      resources: {
        requests: {
          memory: "5Gi",
          cpu: "1",
        },
        limits: {
          memory: "5Gi",
          cpu: "4",
        },
      },
    },  // tfBatchPredictContainerBase

    tfBatchPredictContainer+: $.parts.tfBatchPredictContainerBase +
                                 if $.params.numGpus > 0 then
                                  {
                                    resources+: {
                                    limits+: {
                                      "nvidia.com/gpu": $.params.numGpus,
                                    },
                                  },
                                 }
                             else {},

    tfJob: {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: $.params.name + $.params.version,
        namespace: $.params.namespace,
        labels: $.params.labels,
      },
      spec: {
        template: {
          metadata: {
            labels: $.params.labels,
          },
          backoffLimit: 1,
          spec: {
            containers: [
              $.parts.tfBatchPredictContainer,
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
  gcpParts:: $.parts {
    gcpEnv:: [
      if $.gcpParams.gcpCredentialSecretName != "" then
        { name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" },
    ],

    tfBatchPredictContainer: $.parts.tfBatchPredictContainer {
      env+: $.gcpParts.gcpEnv,
      volumeMounts+: [
        if $.gcpParams.gcpCredentialSecretName != "" then
          {
            name: "gcp-credentials",
			readOnly: True,
            mountPath: "/secret/gcp-credentials",
          },
      ],
    },

    tfJob: $.parts.tfJob {
      spec+: {
        template+: {

          spec+: {
            containers: [
              $.gcpParts.tfBatchPredictContainer,
            ],

            volumes: [
              if $.gcpParams.gcpCredentialSecretName != "" then
                {
                  name: "gcp-credentials",
                  secret: {
                    secretName: $.gcpParams.gcpCredentialSecretName,
                  },
                },
            ],
          },
        },
      },
    },  // tfJob
  },  // gcpParts
}
