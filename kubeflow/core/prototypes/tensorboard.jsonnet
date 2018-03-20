// from github.com/jlewi/kubeflow-rl

local params = std.extVar("__ksonnet/params").components["tensorboard"];
local k = import 'k.libsonnet';
local tb = import "kubeflow/core/tensorboard.libsonnet";

local name = import "param://name";
local namespace = import "param://namespace";
local logDir = import "param://logDir";
local secretName = import "param://secretName";
local secretFileName = import "param://secretFileName";

std.prune(k.core.v1.list.new([tb.parts(namespace, name).tbDeployment(logDir, secretName, secretFileName),
                              tb.parts(namespace, name).service]))
