// @apiVersion 0.1
// @name io.ksonnet.pkg.chainer-job-simple
// @description A Simple Chainer Job
// @shortDescription A Simple Chainer Job.
// @param name string Name to give to each of the components.
// @optionalParam image string everpeace/chainer:latest The image to use for the job.
// @optionalParam gpus number 1 number of GPUs requested on each worker.
// @optionalParam command string python3 Command to pass to the job.
// @optionalParam args string /train_mnist.py,-e,2,-b,1000,-u,100,--noplot Comma separated list of arguments to pass to the job.

local k = import "k.libsonnet";
local chainerJob = import "kubeflow/chainer-job/chainer-job.libsonnet";

local namespace = env.namespace;  // namespace is inherited from the environment
local name = params.name;
local image = params.image;
local gpus = params.gpus;
local command = params.command;
local args = params.args;

std.prune(k.core.v1.list.new([
  chainerJob.simple(namespace, name, image, gpus, command, args),
]))
