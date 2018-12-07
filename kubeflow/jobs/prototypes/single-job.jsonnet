// @apiVersion 0.1
// @name io.ksonnet.pkg.single-job
// @description single-job
// @shortDescription a Job
// @param name string name single-job
// @optionalParam jobName string myjob name of the job
// @optionalParam jobImage string nginx image to run
// @optionalParam jobCommand string null command to run
// @optionalParam jobArgs string null args to give to command

local singlejob = import "kubeflow/jobs/single-job.libsonnet";
local instance = singlejob.new(env, params);
instance.list(instance.all)
