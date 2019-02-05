{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env {
      labels: {
        app: _params.name,
      },
    },

    local tfBatchPredict = {
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

        // If run in Dataflow on GCP, the following flags are needed.
        runDataflow: null,
        projectName: null,
        tempLocation: null,
        tempPrefix: if self.tempLocation == "" then
          self.outputErrorPrefix
        else
          self.tempLocation,

        maxNumWorkers: 1,
        machineType: "n1-highmem-2",
        jobName: null,
      } + params,

      parts:: {
        bpJob: {
          apiVersion: "batch/v1",
          kind: "Job",
          metadata: {
            name: base.params.name + "-" + base.params.version,
            labels: base.params.labels,
          },
          spec: {
            backoffLimit: 1,
            template: {
              metadata: {
                labels: base.params.labels,
              },
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
                    ] + if base.params.runDataflow == "true" && base.params.numGpus == 0 then [
                      "--runner=DataflowRunner",
                      "--max_num_workers=" + base.params.maxNumWorkers,
                      "--project=" + base.params.projectName,
                      "--job_name=" + base.params.jobName,
                      "--temp_location=" + base.params.tempPrefix + "/tmp",
                      "--staging_location=" + base.params.tempPrefix + "/stg",
                      "--job_name=" + base.params.jobName,
                      "--extra_package=/opt/kubeflow-batch-predict.zip",
                      "--worker_machine_type=" + base.params.machineType,
                    ] else [],

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
    },
    tfBatchPredict:: tfBatchPredict,

    parts:: self,
    all:: [
      self.tfBatchPredict.parts.bpJob,
    ],

    list(obj=self.all):: util.list(obj),
  },
}
