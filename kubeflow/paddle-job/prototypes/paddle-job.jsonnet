// @apiVersion 0.1
// @name io.ksonnet.pkg.paddle-job
// @description A Paddle job (could be training or evaluation).
// @shortDescription A Paddle job.
// @param name string Name to give to each of the components.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam jobVersion string v1 The paddle operator version to use.

// @optionalParam image string null The docker image to use for the job.
// @optionalParam port string null The open port for training job.
// @optionalParam trainer_package string null The trainer package file path which user have the access right.
// @optionalParam ports_num number 0 The number of open port.
// @optionalParam ports_num_for_sparse number 0 The number of sparse open port.
// @optionalParam schedulerName string null The name of selected scheduler.
// @optionalParam podGroupName string null The name of pod group which is used in co-scheduling.
// @optionalParam mountPath string null The path to mount into container for each trainer and pserver.

// @optionalParam trainer_limit_cpu number 0 The number of limit cpus to use
// @optionalParam trainer_limit_mem number 0 The number of limit memory to use
// @optionalParam trainer_request_cpu number 0 The number of request cpus to use
// @optionalParam trainer_request_mem number 0 The number of request memory to use
// @optionalParam trainer_max_instance number 0 The number of trainer max instance to use
// @optionalParam trainer_min_instance number 0 The number of trainer min instance to use
// @optionalParam trainer_gpu number 0 The number of GPUs to attach to workers.
// @optionalParam entrypoint string null The entrypoint of trainer
// @optionalParam workspace string null The workspace of trainer
// @optionalParam passes number 0 The training pass number

// @optionalParam pserver_limit_cpu number 0 The number of limit cpus to use
// @optionalParam pserver_limit_mem number 0 The number of limit memory to use
// @optionalParam pserver_request_cpu number 0 The number of request cpus to use
// @optionalParam pserver_request_mem number 0 The number of request memory to use
// @optionalParam pserver_max_instance number 0 The number of pserver max instance to use
// @optionalParam pserver_min_instance number 0 The number of pserver min instance to use

local k = import "k.libsonnet";
local paddlejob = import "kubeflow/paddle-job/paddle-job.libsonnet";

local namespace = env.namespace;
local name = params.name;
local jobVersion = params.jobVersion;

local image = params.image;
local port = params.port;
local trainer_package = params.trainer_package;
local ports_num = params.ports_num;
local ports_num_for_sparse = params.ports_num_for_sparse;
local schedulerName = params.schedulerName;
local podGroupName = params.podGroupName;
local mountPath = params.mountPath;

local pserver_limit_cpu = params.pserver_limit_cpu;
local pserver_limit_mem = params.pserver_limit_mem;
local pserver_request_cpu =params.pserver_request_cpu;
local pserver_request_mem = params.pserver_request_mem;
local pserver_min_instance = params.pserver_min_instance;
local pserver_max_instance = params.pserver_max_instance;

local trainer_limit_cpu = params.trainer_limit_cpu;
local trainer_limit_mem = params.trainer_limit_mem;
local trainer_request_cpu =params.trainer_request_cpu;
local trainer_request_mem = params.trainer_request_mem;
local trainer_min_instance = params.trainer_min_instance;
local trainer_max_instance = params.trainer_max_instance;
local entrypoint = params.entrypoint;
local workspace = params.workspace;
local passes = params.passes;
local trainer_gpu = params.trainer_gpu;

local trainerResources = paddlejob.parts.paddleJobResources(trainer_limit_cpu, trainer_limit_mem, trainer_request_cpu, trainer_request_mem);
local pserverResources = paddlejob.parts.paddleJobResources(pserver_limit_cpu, pserver_limit_mem, pserver_request_cpu, pserver_request_mem);

local trainerInstance = paddlejob.parts.paddleJobInstance(trainer_min_instance, trainer_max_instance);
local pserverInstance = paddlejob.parts.paddleJobInstance(pserver_min_instance, pserver_max_instance);

local trainerSpec = {
    entrypoint: entrypoint,
    workspace: workspace,
    passes: passes,
    trainer_gpu: trainer_gpu,
};

local job = {
    apiVersion: "paddlepaddle.org/" + jobVersion,
    kind: "PaddleJob",
    metadata: {
      name: name,
      namespace: namespace,
    },
    spec: {
      image: image,
      trainer_package: trainer_package,
      port: port,
      ports_num: ports_num,
      ports_num_for_sparse: ports_num_for_sparse,
      schedulerName: schedulerName,
      podGroupName: podGroupName,
      mountPath: mountPath,
      pserver:
        pserverInstance + pserverResources,
      trainer:
        trainerSpec + trainerInstance + trainerResources,
    },
};

std.prune(k.core.v1.list.new([job]))
