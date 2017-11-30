// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-batch-predict
// @description TensorFlow batch-predict
// @shortDescription A TensorFlow batch-predict job
// @param name string Name to give to each of the components
// @param modelPath string Path to the model directory
// @param inputFilePatterns string Input file patterns
// @param outputResultPrefix string Output result file prefix
// @param outputErrorPrefix string Output error file prefix
// @param batchSize number Batch size
// @param inputFileFormat string Input file format

// @optionalParam numGpus number 0 number of GPUs to use
// @optionalParam gcpCredentialSecretName string user-gcp-sa name if used in GCP
// Following params are needed only if runDataflow flag is set to be true
// @optionalParam runDataflow string false Whether run the job via launching Datflow job on GCP
// @optionalParam projectName string The GCP project name under which the job is launched
// @optionalParam jobName string The job name on GCP
// @optionalParam maxNumWorkers number 1 max number of workers to run
// @optionalParam machineType string n1-highmem-2 GCP machine types to run the job.
// Do NOT delete the any space between "string" and "if".
// @optionalParam tempLocation string   if the job is launched in Dataflow on GCP

local k = import "k.libsonnet";
local tfbatchpredict = import "kubeflow/tf-batch-predict/tf-batch-predict.libsonnet";
local instance = tfbatchpredict.new(env, params);
instance.list(instance.all)
