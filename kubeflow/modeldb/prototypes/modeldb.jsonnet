// @apiVersion 0.1
// @name io.ksonnet.pkg.modeldb
// @description Model management service for KubeFlow
// @shortDescription Model management
// @param name string Name to give to each of the components
// @optionalParam artifactStoreImage string vertaaiofficial/modeldb-artifact-store:kubeflow The image for modeldb artifact store.
// @optionalParam modeldbBackendProxyImage string vertaaiofficial/modeldb-backend-proxy:kubeflow The image for the REST proxy of modeldb.
// @optionalParam modeldbBackendImage string vertaaiofficial/modeldb-backend:kubeflow The image for modeldb.
// @optionalParam modeldbBackendService string LoadBalancer Service type to use for modeldb.
// @optionalParam modeldbDatabaseImage string mysql:5.7 The image for modeldb database.
// @optionalParam modeldbMysqlPvcSize string 20Gi Size of MySQL PVC.
// @optionalParam modeldbWebappImage string vertaaiofficial/modeldb-frontend:kubeflow The image for modeldb frontend.
// @optionalParam modeldbWebappService string LoadBalancer Service type to use for the frontent.
// @optionalParam mysqlDbService string true If true, will deploy a MySQL instance. If false, please also provide the config parameter with the right configuration.
// @optionalParam config string  If provided, the specified config will be used for modeldb. If empty, a default config will be used instead.
// @optionalParam artifactConfig string  If provided, the specified config will be used for the artifact store. If empty, a default config will be used instead.

local k = import 'k.libsonnet';
local namespace = env.namespace;

local modeldb = import 'kubeflow/modeldb/modeldb.libsonnet';
std.prune(k.core.v1.list.new(modeldb.all(params, namespace)))
