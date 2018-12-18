// @apiVersion 0.1
// @name io.ksonnet.pkg.modeldb
// @description Model management service for KubeFlow
// @shortDescription Model management
// @param name string Name to give to each of the components
// @optionalParam modeldbImage string mitdbg/modeldb-backend:kf0.4 The image for modeldb
// @optionalParam modeldbDatabaseImage string mongo:3.4 The image for modeldb database.
// @optionalParam modeldbFrontendImage string mitdbg/modeldb-frontend:kf0.4 The image for modeldb frontend.
// @optionalParam mongoDbService string  The name of an existing service for Mongo. If empty, a Mongo instance will be created.
// @optionalParam modeldbMongoPvcSize string 20Gi Size of Mongo PVC.
// @optionalParam modeldbBackendPvcSize string 20Gi Size of SQLite PVC.

local k = import "k.libsonnet";
local namespace = env.namespace;

local modeldb = import "kubeflow/modeldb/modeldb.libsonnet";
std.prune(k.core.v1.list.new(modeldb.all(params, namespace)))
