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

    serviceType: "ClusterIP",
    // If users want to override the image then can override defaultCpuImage and/or defaultGpuImage
    // in which case the image used will still depend on whether GPUs are used or not.
    // Users can also override predictImage in which case the user supplied value will always be used
    // regardless of numGpus.
    defaultCpuImage: "gcr.io/cloud-ml-dev/yxshi-batch-prediction:cpu17",
    defaultGpuImage: "gcr.io/cloud-ml-dev/yxshi-batch-prediction:gpu17",

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
      // TODO(jlewi): It would be better to structure s3 as a mixin.
      // As an example it would be great to allow S3 and GCS parameters
      // to be enabled simultaneously. This should be doable because
      // each entails adding a set of environment variables and volumes
      // to the containers. These volumes/environment variables shouldn't
      // overlap so there's no reason we shouldn't be able to just add
      // both modifications to the base container.
      // I think we want to restructure things as mixins so they can just
      // be added.
      if $.params.cloud == "gcp" then
        [
          $.gcpParts.tfService,
          $.gcpParts.tfJob,
        ]
      else
        [
          $.parts.tfService,
          $.parts.tfJob,
        ],
  }.all,

  parts:: {
    // We define the containers one level beneath parts because combined with jsonnet late binding
    // this makes it easy for users to override specific bits of the container.
    tfBatchPredictionContainerBase:: {
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
      ports: [
        {
          containerPort: 9000,
        },
      ],
      // TODO(jlewi): We should add readiness and liveness probes. I think the blocker is that
      // model-server doesn't have something we can use out of the box.
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
    },  // tfBatchPredictionContainerBase

    tfBatchPredictionContainer+: $.parts.tfBatchPredictionContainerBase +
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
      // apiVersion: "extensions/v1beta1",
      // apiVersion: "v1",
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: $.params.name,
        namespace: $.params.namespace,
        labels: $.params.labels,
      },
      spec: {
        template: {
          metadata: {
            labels: $.params.labels,
          },
		  backoffLimit: 2,
          spec: {
            containers: [
              $.parts.tfBatchPredictionContainer,
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

    tfService: {
      apiVersion: "v1",
	  metadata: {
        name: $.params.name,
	  },
      kind: "Service",
      spec: {
        ports: [
          {
            name: "tf-batch-predict",
            port: 9000,
            targetPort: 9000,
          },
        ],
        selector: $.params.labels,
        type: $.params.serviceType,
      },
    },  // tfService

  },  // parts

  // Parts specific to GCP
  gcpParts:: $.parts {
    gcpEnv:: [
      if $.gcpParams.gcpCredentialSecretName != "" then
        { name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" },
    ],

    tfBatchPredictionContainer: $.parts.tfBatchPredictionContainer {
      env+: $.gcpParts.gcpEnv,
      volumeMounts+: [
        if $.gcpParams.gcpCredentialSecretName != "" then
          {
            name: "gcp-credentials",
            mountPath: "/secret/gcp-credentials",
          },
      ],
    },

    tfJob: $.parts.tfJob {
      spec+: {
        template+: {

          spec+: {
            containers: [
              $.gcpParts.tfBatchPredictionContainer,
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
