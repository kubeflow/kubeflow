// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon
// @description Seldon Core components. Operator and API FrontEnd.
// @shortDescription Seldon Core components.
// @param name string seldon Name to give seldon
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam withRbac string true Whether to include RBAC setup
// @optionalParam withApife string false Whether to include builtin API Oauth fornt end server for ingress
// @optionalParam apifeServiceType string NodePort API Front End Service Type
// @optionalParam operatorSpringOpts string null cluster manager spring opts
// @optionalParam operatorJavaOpts string null cluster manager java opts
// @optionalParam seldonVersion string 0.2.3 Seldon version

local k = import "k.libsonnet";
local core = import "kubeflow/seldon/core.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local seldonVersion = import "param://seldonVersion";

local name = import "param://name";
local namespace = updatedParams.namespace;
local withRbac = import "param://withRbac";
local withApife = import "param://withApife";

// APIFE
local apifeImage = "seldonio/apife:" + seldonVersion;
local apifeServiceType = import "param://apifeServiceType";

// Cluster Manager (The CRD Operator)
local operatorImage = "seldonio/cluster-manager:" + seldonVersion;
local operatorSpringOptsParam = import "param://operatorSpringOpts";
local operatorSpringOpts = if operatorSpringOptsParam != "null" then operatorSpringOptsParam else "";
local operatorJavaOptsParam = import "param://operatorJavaOpts";
local operatorJavaOpts = if operatorJavaOptsParam != "null" then operatorJavaOptsParam else "";

// Engine
local engineImage = "seldonio/engine:" + seldonVersion;

// APIFE
local apife = [
  core.parts(name, namespace, seldonVersion).apife(apifeImage, withRbac),
  core.parts(name, namespace, seldonVersion).apifeService(apifeServiceType),
];

local rbac2 = [
  core.parts(name, namespace, seldonVersion).rbacServiceAccount(),
  core.parts(name, namespace, seldonVersion).rbacClusterRole(),
  core.parts(name, namespace, seldonVersion).rbacRole(),
  core.parts(name, namespace, seldonVersion).rbacRoleBinding(),
  core.parts(name, namespace, seldonVersion).rbacClusterRoleBinding(),
];

local rbac1 = [
  core.parts(name, namespace, seldonVersion).rbacServiceAccount(),
  core.parts(name, namespace, seldonVersion).rbacRoleBinding(),
];

local rbac = if std.startsWith(seldonVersion, "0.1") then rbac1 else rbac2;

// Core
local coreComponents = [
  core.parts(name, namespace, seldonVersion).deploymentOperator(engineImage, operatorImage, operatorSpringOpts, operatorJavaOpts, withRbac),
  core.parts(name, namespace, seldonVersion).redisDeployment(),
  core.parts(name, namespace, seldonVersion).redisService(),
  core.parts(name, namespace, seldonVersion).crd(),
];

if withRbac == "true" && withApife == "true" then
  k.core.v1.list.new(apife + rbac + coreComponents)
else if withRbac == "true" && withApife == "false" then
  k.core.v1.list.new(rbac + coreComponents)
else if withRbac == "false" && withApife == "true" then
  k.core.v1.list.new(apife + coreComponents)
else if withRbac == "false" && withApife == "false" then
  k.core.v1.list.new(coreComponents)
