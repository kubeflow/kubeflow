// @apiVersion 0.0.1
// @name io.ksonnet.pkg.fluentd-es-sidecar
// @description A fluentd sidecar that can be added to a container to scrape
//   and preprocess logs for elasticsearch.
// @shortDescription The fluentd sidecar to scrape logs for an EFK stack
// @param containerName string Name of the main container to be logged

local k = import 'k.libsonnet';
local efk = import 'incubator/efk/efk.libsonnet';

local containerName = import 'param://containerName';

efk.parts.fluentd.sidecar(containerName)
