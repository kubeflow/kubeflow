// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon
// @description Seldon Core components. Operator and API FrontEnd.
// @shortDescription Seldon Core components.
// @param name string seldon Name to give seldon
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam withRbac string true Whether to include RBAC setup
// @optionalParam withApife string false Whether to include builtin API Oauth fornt end server for ingress
// @optionalParam apifeImage string seldonio/apife:0.2.1 Default image for API Front End
// @optionalParam apifeServiceType string NodePort API Front End Service Type
// @optionalParam operatorImage string seldonio/cluster-manager:0.2.1 Seldon cluster manager image version
// @optionalParam operatorSpringOpts string null cluster manager spring opts
// @optionalParam operatorJavaOpts string null cluster manager java opts
// @optionalParam engineImage string seldonio/engine:0.2.1 Seldon engine image version

local k = import "k.libsonnet";
local core = import "kubeflow/seldon/core.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local name = import "param://name";
local namespace = updatedParams.namespace;
local withRbac = import "param://withRbac";
local withApife = import "param://withApife";

// APIFE
local apifeImage = import "param://apifeImage";
local apifeServiceType = import "param://apifeServiceType";

// Cluster Manager (The CRD Operator)
local operatorImage = import "param://operatorImage";
local operatorSpringOptsParam = import "param://operatorSpringOpts";
local operatorSpringOpts = if operatorSpringOptsParam != "null" then operatorSpringOptsParam else "";
local operatorJavaOptsParam = import "param://operatorJavaOpts";
local operatorJavaOpts = if operatorJavaOptsParam != "null" then operatorJavaOptsParam else "";

// Engine
local engineImage = import "param://engineImage";

// APIFE
local apife = [
  core.parts(name,namespace).apife(apifeImage, withRbac),
  core.parts(name,namespace).apifeService(apifeServiceType),
];

local rbac = [
  core.parts(name,namespace).rbacServiceAccount(),
  core.parts(name,namespace).rbacClusterRoleBinding(),
];

// Core
local coreComponents = [
  core.parts(name,namespace).deploymentOperator(engineImage, operatorImage, operatorSpringOpts, operatorJavaOpts, withRbac),
  core.parts(name,namespace).redisDeployment(),
  core.parts(name,namespace).redisService(),
  core.parts(name,namespace).crd(),
];

if withRbac == "true" && withApife == "true" then
  k.core.v1.list.new(apife + rbac + coreComponents)
else if withRbac == "true" && withApife == "false" then
  k.core.v1.list.new(rbac + coreComponents)
else if withRbac == "false" && withApife == "true" then
  k.core.v1.list.new(apife + coreComponents)
else if withRbac == "false" && withApife == "false" then
  k.core.v1.list.new(coreComponents)
