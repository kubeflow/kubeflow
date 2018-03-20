// from github.com/jlewi/kubeflow-rl

local params = std.extVar("__ksonnet/params").components["tensorboard"];
local k = import 'k.libsonnet';
local tb = import "tensorboard.libsonnet";

local name = params.name;
local namespace = params.namespace;
local logDir = params.log_dir;
local secretName = params.secret;
local secretFileName = params.secret_file_name;

std.prune(k.core.v1.list.new([tb.parts(namespace, name).tbDeployment(logDir, secretName, secretFileName),
                              tb.parts(namespace, name).service]))
