local params = std.extVar("__ksonnet/params").components["argo"];

local k = import 'k.libsonnet';
local argo = import 'argo.libsonnet';
local namespace = params.namespace;

std.prune(k.core.v1.list.new([argo.parts(namespace).uiDeploy,
	                          argo.parts(namespace).uiService]))