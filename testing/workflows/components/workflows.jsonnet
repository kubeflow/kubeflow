local params = std.extVar("__ksonnet/params").components.workflows;

local k = import "k.libsonnet";
local workflows = import "workflows.libsonnet";
local namespace = params.namespace;

// TODO(jlewi): Can we make name default so some random unique value?
// I didn't see any routines in the standard library for datetime or random.
local name = params.name;

local prowEnv = workflows.parseEnv(params.prow_env);
local bucket = params.bucket;
std.prune(k.core.v1.list.new([workflows.parts(namespace, name).e2e(prowEnv, bucket, params.platform, params.workflowName)]))
