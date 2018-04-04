// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components

local k = import 'k.libsonnet';
local tensorboard = import "../tensorboard.libsonnet";

local name = import "param://name";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;

local logDir = updatedParams.logDir;

local tb = tensorboard.parts.tbContainer {
    params+: updatedParams {
        name: name,
    },
};


std.assertEqual(true, std.len(logDir) > 0) &&
std.prune(k.core.v1.list.new(tb.components))


