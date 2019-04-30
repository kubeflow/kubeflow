// @apiVersion 0.1
// @name io.ksonnet.pkg.kubebench-job
// @description A benchmark job on Kubeflow
// @shortDescription A benchmark job on Kubeflow
// @param name string Name to give to each of the components
// @optionalParam serviceAccount string null The service account used to run the job
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/kubebench/kubebench-controller:v0.4.0-13-g262c593 Configurator image
// @optionalParam githubTokenSecret string null Github token secret
// @optionalParam githubTokenSecretKey string null Key of Github token secret
// @optionalParam awsCredentialsSecret string null AWS credentials secret
// @optionalParam awsCredentialsSecretAccessKeyId string null AWS credentials secret access key id
// @optionalParam awsCredentialsSecretAccessKey string null AWS credentials secret access key
// @optionalParam awsRegion string null Key of AWS Region
// @optionalParam gcpCredentialsSecret string null GCP credentials secret
// @optionalParam gcpCredentialsSecretKey string null Key of GCP credentials secret
// @optionalParam mainJobKsPrototype string kubebench-example-tfcnn The Ksonnet prototype of the job being benchmarked
// @optionalParam mainJobKsPackage string kubebench-examples The Ksonnet package of the job being benchmarked
// @optionalParam mainJobKsRegistry string github.com/kubeflow/kubebench/tree/master/kubebench The Ksonnet registry of the job being benchmarked
// @optionalParam mainJobConfig string tf-cnn/tf-cnn-dummy.yaml Path to the config of the benchmarked job
// @optionalParam experimentConfigPvc string kubebench-config-pvc Configuration PVC
// @optionalParam experimentDataPvc string null Data PVC
// @optionalParam experimentRecordPvc string kubebench-exp-pvc Experiment PVC
// @optionalParam postJobImage string gcr.io/kubeflow-images-public/kubebench/kubebench-example-tf-cnn-post-processor:v0.4.0-13-g262c593 Image of post processor
// @optionalParam postJobArgs string null Arguments of post processor
// @optionalParam reporterType string csv Type of reporter
// @optionalParam csvReporterInput string result.json The input of CSV reporter
// @optionalParam csvReporterOutput string report.csv The output of CSV reporter

local k = import "k.libsonnet";
local kubebenchJob = import "kubeflow/kubebench/kubebench-job.libsonnet";
local kubebenchRbac = import "kubeflow/kubebench/kubebench-rbac.libsonnet";

local name = params.name;
local namespace = env.namespace;
local serviceAccount = params.serviceAccount;
local controllerImage = params.controllerImage;
local configPvc = params.experimentConfigPvc;
local dataPvc = params.experimentDataPvc;
local experimentPvc = params.experimentRecordPvc;
local awsCredentialsSecret = params.awsCredentialsSecret;
local awsCredentialsSecretAccessKeyId = params.awsCredentialsSecretAccessKeyId;
local awsCredentialsSecretAccessKey = params.awsCredentialsSecretAccessKey;
local awsRegion = params.awsRegion;
local gcpCredentialsSecret = params.gcpCredentialsSecret;
local gcpCredentialsSecretKey = params.gcpCredentialsSecretKey;
local githubTokenSecret = params.githubTokenSecret;
local githubTokenSecretKey = params.githubTokenSecretKey;
local mainJobKsPrototype = params.mainJobKsPrototype;
local mainJobKsPackage = params.mainJobKsPackage;
local mainJobKsRegistry = params.mainJobKsRegistry;
local mainJobConfig = params.mainJobConfig;
local postJobArgsStr = params.postJobArgs;
local postJobImage = params.postJobImage;
local reporterType = params.reporterType;
local csvReporterInput = params.csvReporterInput;
local csvReporterOutput = params.csvReporterOutput;

local postJobArgs =
  if postJobArgsStr == "null" then
    []
  else
    std.split(postJobArgs, ",");

local newServiceAccount = if serviceAccount == "null" then "kubebench-user-" + name else serviceAccount;
local rbacParts = if newServiceAccount != serviceAccount then [
  kubebenchRbac.parts.serviceAccount(newServiceAccount, namespace),
  kubebenchRbac.parts.role(newServiceAccount, namespace),
  kubebenchRbac.parts.roleBinding(newServiceAccount, newServiceAccount, newServiceAccount, namespace),
] else [];

local jobParts = [
  kubebenchJob.parts.workflow(name,
                              namespace,
                              newServiceAccount,
                              controllerImage,
                              configPvc,
                              dataPvc,
                              experimentPvc,
                              githubTokenSecret,
                              githubTokenSecretKey,
                              awsCredentialsSecret,
                              awsCredentialsSecretAccessKeyId,
                              awsCredentialsSecretAccessKey,
                              awsRegion,
                              gcpCredentialsSecret,
                              gcpCredentialsSecretKey,
                              mainJobKsPrototype,
                              mainJobKsPackage,
                              mainJobKsRegistry,
                              mainJobConfig,
                              postJobImage,
                              postJobArgs,
                              reporterType,
                              csvReporterInput,
                              csvReporterOutput),
];

std.prune(k.core.v1.list.new(rbacParts + jobParts))
