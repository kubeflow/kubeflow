// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon
// @description Seldon Core components. Operator and API FrontEnd.
// @shortDescription Seldon Core components.
// @param name string seldon Name to give seldon
// @optionalParam withRbac string true Whether to include RBAC setup
// @optionalParam withApife string false Whether to include builtin API OAuth gateway server for ingress
// @optionalParam withAmbassador string false Whether to include Ambassador reverse proxy
// @optionalParam apifeServiceType string NodePort API Front End Service Type
// @optionalParam operatorSpringOpts string null cluster manager spring opts
// @optionalParam operatorJavaOpts string null cluster manager java opts
// @optionalParam grpcMaxMessageSize string 4194304 Max gRPC message size
// @optionalParam seldonVersion string 0.2.5 Seldon version
// @optionalParam engineServiceAccount string default Service account for Seldon Service Orchestrator Engine
// @optionalParam singleNamespace string true Whether to limit seldon to a single namespace
// @optionalParam engineUser string 8888 User id to run service orchestrator engine
// @optionalParam registry string null The Docker registry to use
// @optionalParam repository string seldonio The Docker repository to use

local k = import "k.libsonnet";
local core = import "kubeflow/seldon/core.libsonnet";

local registry = import "param://registry";
local repository = import "param://repository";
local seldonVersion = import "param://seldonVersion";
local singleNamespace = import "param://singleNamespace";

local name = import "param://name";
local namespace = env.namespace;
local withRbac = import "param://withRbac";
local withApife = import "param://withApife";
local withAmbassador = import "param://withAmbassador";
local withClusterRole = import "param://withClusterRole";

// APIFE
local apifeImage = if registry == "null" then repository + "/apife:" + seldonVersion else registry + "/" + repository + "/apife:" + seldonVersion;
local apifeServiceType = import "param://apifeServiceType";
local grpcMaxMessageSize = import "param://grpcMaxMessageSize";

// Cluster Manager (The CRD Operator)
local operatorImage = if registry == "null" then repository + "/cluster-manager:" + seldonVersion else registry + "/" + repository + "/cluster-manager:" + seldonVersion;
local operatorSpringOptsParam = import "param://operatorSpringOpts";
local operatorSpringOpts = if operatorSpringOptsParam != "null" then operatorSpringOptsParam else "";
local operatorJavaOptsParam = import "param://operatorJavaOpts";
local operatorJavaOpts = if operatorJavaOptsParam != "null" then operatorJavaOptsParam else "";

// Engine
local engineImage = if registry == "null" then repository + "/engine:" + seldonVersion else registry + "/" + repository + "/engine:" + seldonVersion;
local engineServiceAccount = import "param://engineServiceAccount";
local engineUser = import "param://engineUser";

// APIFE
local apife = [
  core.parts(name, namespace, seldonVersion, singleNamespace).apife(apifeImage, withRbac, grpcMaxMessageSize),
  core.parts(name, namespace, seldonVersion, singleNamespace).apifeService(apifeServiceType),
];

local rbac2_single_namespace = [
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacServiceAccount(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacRole(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacRoleBinding(),
];

local rbac2_cluster_wide = [
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacServiceAccount(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacClusterRole(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacClusterRoleBinding(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacCRDClusterRole(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacCRDClusterRoleBinding(),
];

local rbac1 = [
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacServiceAccount(),
  core.parts(name, namespace, seldonVersion, singleNamespace).rbacRoleBinding(),
];

local rbac = if std.startsWith(seldonVersion, "0.1") then rbac1 else if singleNamespace == "true" then rbac2_single_namespace else rbac2_cluster_wide;

// Core
local coreComponents = [
  core.parts(name, namespace, seldonVersion, singleNamespace).deploymentOperator(engineImage, operatorImage, operatorSpringOpts, operatorJavaOpts, withRbac, engineServiceAccount, engineUser),
  core.parts(name, namespace, seldonVersion, singleNamespace).redisDeployment(),
  core.parts(name, namespace, seldonVersion, singleNamespace).redisService(),
  core.parts(name, namespace, seldonVersion, singleNamespace).crd(),
];

//Ambassador
local ambassadorRbac_single_namespace = [
  core.parts(name,namespace, seldonVersion, singleNamespace).rbacAmbassadorRole(),
  core.parts(name,namespace, seldonVersion, singleNamespace).rbacAmbassadorRoleBinding(),
];

local ambassadorRbac_cluster_wide = [
  core.parts(name,namespace, seldonVersion, singleNamespace).rbacAmbassadorClusterRole(),
  core.parts(name,namespace, seldonVersion, singleNamespace).rbacAmbassadorClusterRoleBinding(),
];

local ambassador = [
  core.parts(name,namespace, seldonVersion, singleNamespace).ambassadorDeployment(),
  core.parts(name,namespace, seldonVersion, singleNamespace).ambassadorService(),
];

local l1 = if withRbac == "true" then rbac + coreComponents else coreComponents;
local l2 = if withApife == "true" then l1 + apife else l1;
local l3 = if withAmbassador == "true" && withRbac == "true" && singleNamespace == "true" then l2 + ambassadorRbac_single_namespace else l2;
local l4 = if withAmbassador == "true" && withRbac == "true" && singleNamespace == "false" then l3 + ambassadorRbac_cluster_wide else l3;
local l5 = if withAmbassador == "true" then l4 + ambassador else l4;

l5
