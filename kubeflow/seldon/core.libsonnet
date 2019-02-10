local k = import "k.libsonnet";
local deployment = k.extensions.v1beta1.deployment;
local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;
local service = k.core.v1.service.mixin;
local serviceAccountMixin = k.core.v1.serviceAccount.mixin;
local clusterRoleBindingMixin = k.rbac.v1beta1.clusterRoleBinding.mixin;
local clusterRoleBinding = k.rbac.v1beta1.clusterRoleBinding;
local roleBindingMixin = k.rbac.v1beta1.roleBinding.mixin;
local roleBinding = k.rbac.v1beta1.roleBinding;
local roleMixin = k.rbac.v1beta1.role.mixin;
local serviceAccount = k.core.v1.serviceAccount;

local crdDefn = import "crd.libsonnet";
local seldonTemplate2_single_namespace = import "json/template_0.2_single_namespace.json";
local seldonTemplate2_cluster_wide = import "json/template_0.2_cluster_wide.json";
local seldonTemplate1 = import "json/template_0.1.json";

local getOperatorDeployment(x) = std.endsWith(x.metadata.name, "seldon-cluster-manager");
local getApifeDeployment(x) = std.endsWith(x.metadata.name, "seldon-apiserver") && x.kind == "Deployment";
local getApifeService(x) = std.endsWith(x.metadata.name, "seldon-apiserver") && x.kind == "Service";
local getRedisDeployment(x) = std.endsWith(x.metadata.name, "redis") && x.kind == "Deployment";
local getRedisService(x) = std.endsWith(x.metadata.name, "redis") && x.kind == "Service";
local getServiceAccount(x) = x.kind == "ServiceAccount";

local getClusterRole(x) = x.metadata.name == "seldon-wide" && x.kind == "ClusterRole";
local getClusterRoleBinding(x) = x.kind == "ClusterRoleBinding" && x.roleRef.name == "seldon-wide";

local getCRDClusterRole(x) = x.metadata.name == "seldon-crd-seldon" && x.kind == "ClusterRole";
local getCRDClusterRoleBinding(x) = x.kind == "ClusterRoleBinding" && x.roleRef.name == "seldon-crd-seldon";

local getSeldonRole(x) = x.metadata.name == "seldon-local" && x.kind == "Role";
local getRoleBinding(x) = x.kind == "RoleBinding" && x.roleRef.name == "seldon-local";

local getAmbassadorRole(x) = x.metadata.name == "ambassador" && x.kind == "Role";
local getAmbassadorRoleBinding(x) = x.kind == "RoleBinding" && x.roleRef.name == "ambassador";
local getAmbassadorClusterRole(x) = x.metadata.name == "ambassador" && x.kind == "ClusterRole";
local getAmbassadorClusterRoleBinding(x) = x.kind == "ClusterRoleBinding" && x.roleRef.name == "ambassador";

local getAmbassadorDeployment(x) = std.endsWith(x.metadata.name, "ambassador") && x.kind == "Deployment";
local getAmbassadorService(x) = std.endsWith(x.metadata.name, "ambassador") && x.kind == "Service";

local getEnvNotRedis(x) = x.name != "SELDON_CLUSTER_MANAGER_REDIS_HOST";

{
  parts(name, namespace, seldonVersion, singleNamespace)::

    local seldonTemplate = if std.startsWith(seldonVersion, "0.1") then seldonTemplate1 else if singleNamespace == "true" then seldonTemplate2_single_namespace else seldonTemplate2_cluster_wide;

    {
      apife(apifeImage, withRbac, grpcMaxMessageSize)::

        local baseApife = std.filter(getApifeDeployment, seldonTemplate.items)[0];

        local env = [
          { name: "SELDON_CLUSTER_MANAGER_REDIS_HOST", value: name + "-redis" },
	  { name: "SELDON_SINGLE_NAMESPACE", value: singleNamespace },
        ];

        local env2 = std.filter(getEnvNotRedis, baseApife.spec.template.spec.containers[0].env);

        local c = baseApife.spec.template.spec.containers[0] +
                  container.withImage(apifeImage) +
                  container.withEnv(env + env2) +
                  container.withImagePullPolicy("IfNotPresent");

        local labels = {
          "app.kubernetes.io/name": name,
          heritage: "ksonnet",
          release: name,
        };


        local apiFeBase1 =
          baseApife +
          deployment.mixin.metadata.withName(name + "-seldon-apiserver") +
          deployment.mixin.metadata.withNamespace(namespace) +
          deployment.mixin.metadata.withLabelsMixin(labels) +
          deployment.mixin.spec.template.spec.withContainers([c]);

        local extraAnnotations = { "seldon.io/grpc-max-message-size": grpcMaxMessageSize };

        // Ensure labels copied to enclosed parts
        local apiFeBase = apiFeBase1 +
                          deployment.mixin.spec.selector.withMatchLabels(apiFeBase1.metadata.labels) +
                          deployment.mixin.spec.template.metadata.withLabels(apiFeBase1.metadata.labels) +
                          deployment.mixin.spec.template.metadata.withAnnotationsMixin(extraAnnotations);


        if withRbac == "true" then
          apiFeBase +
          deployment.mixin.spec.template.spec.withServiceAccountName("seldon")
        else
          apiFeBase,


      apifeService(serviceType)::

        local apifeService = std.filter(getApifeService, seldonTemplate.items)[0];

        local labels = { "app.kubernetes.io/name": name };

        apifeService +
        service.metadata.withName(name + "-seldon-apiserver") +
        service.metadata.withNamespace(namespace) +
        service.metadata.withLabelsMixin(labels) +
        service.spec.withType(serviceType),

      deploymentOperator(engineImage, clusterManagerImage, springOpts, javaOpts, withRbac, engineServiceAccount, engineUser):

        local op = std.filter(getOperatorDeployment, seldonTemplate.items)[0];

        local env = [
          { name: "JAVA_OPTS", value: javaOpts },
          { name: "SPRING_OPTS", value: springOpts },
          { name: "ENGINE_CONTAINER_IMAGE_AND_VERSION", value: engineImage },
          { name: "ENGINE_CONTAINER_IMAGE_PULL_POLICY", value: "IfNotPresent" },
          { name: "ENGINE_CONTAINER_SERVICE_ACCOUNT_NAME", value: engineServiceAccount },
          { name: "SELDON_CLUSTER_MANAGER_REDIS_HOST", value: name + "-redis" },
          { name: "SELDON_CLUSTER_MANAGER_POD_NAMESPACE", valueFrom: { fieldRef: { apiVersion: "v1", fieldPath: "metadata.namespace" } } },
	  { name: "SELDON_CLUSTER_MANAGER_SINGLE_NAMESPACE", value: singleNamespace },
	  { name: "ENGINE_CONTAINER_USER", value: engineUser },
        ];

        local c = op.spec.template.spec.containers[0] +
                  container.withImage(clusterManagerImage) +
                  container.withEnv(env) +
                  container.withImagePullPolicy("IfNotPresent");


        local labels = {
          "app.kubernetes.io/name": name,
          heritage: "ksonnet",
          release: name,
        };

        local depOp1 = op +
                       deployment.mixin.metadata.withName(name + "-seldon-cluster-manager") +
                       deployment.mixin.metadata.withNamespace(namespace) +
                       deployment.mixin.metadata.withLabelsMixin(labels) +
                       deployment.mixin.spec.template.spec.withContainers([c]);

        // Ensure labels copied to enclosed parts
        local depOp = depOp1 +
                      deployment.mixin.spec.selector.withMatchLabels(depOp1.metadata.labels) +
                      deployment.mixin.spec.template.metadata.withLabels(depOp1.metadata.labels);


        if withRbac == "true" then
          depOp +
          deployment.mixin.spec.template.spec.withServiceAccountName("seldon")
        else
          depOp,

      redisDeployment():

        local redisDeployment = std.filter(getRedisDeployment, seldonTemplate.items)[0];

        local labels = {
          app: name + "-redis-app",
          "app.kubernetes.io/name": name,
          heritage: "ksonnet",
          release: name,
        };

        local redisDeployment1 = redisDeployment +
                                 deployment.mixin.metadata.withName(name + "-redis") +
                                 deployment.mixin.metadata.withNamespace(namespace) +
                                 deployment.mixin.metadata.withLabelsMixin(labels);

        redisDeployment1 +
        deployment.mixin.spec.selector.withMatchLabels(redisDeployment1.metadata.labels) +
        deployment.mixin.spec.template.metadata.withLabels(redisDeployment1.metadata.labels),

      redisService():

        local redisService = std.filter(getRedisService, seldonTemplate.items)[0];

        local labels = { "app.kubernetes.io/name": name };

        redisService +
        service.metadata.withName(name + "-redis") +
        service.metadata.withNamespace(namespace) +
        service.metadata.withLabelsMixin(labels) +
        service.spec.withSelector({ app: name + "-redis-app" }),

      rbacServiceAccount():

        local rbacServiceAccount = std.filter(getServiceAccount, seldonTemplate.items)[0];

        rbacServiceAccount +
        serviceAccountMixin.metadata.withNamespace(namespace),


      rbacCRDClusterRole():

        local clusterRole = std.filter(getCRDClusterRole, seldonTemplate.items)[0];

        clusterRole,

      rbacClusterRole():

        local clusterRole = std.filter(getClusterRole, seldonTemplate.items)[0];

        clusterRole,

      rbacRole():

        local role = std.filter(getSeldonRole, seldonTemplate.items)[0];

        role +
        roleMixin.metadata.withNamespace(namespace),


      rbacAmbassadorRole():

        local role = std.filter(getAmbassadorRole, seldonTemplate.items)[0];

        role +
        roleMixin.metadata.withNamespace(namespace),

      rbacAmbassadorClusterRole():

        local clusterRole = std.filter(getAmbassadorClusterRole, seldonTemplate.items)[0];

	clusterRole,


      rbacCRDClusterRoleBinding():

        local rbacClusterRoleBinding = std.filter(getCRDClusterRoleBinding, seldonTemplate.items)[0];

        local subject = rbacClusterRoleBinding.subjects[0]
                        { namespace: namespace };

        rbacClusterRoleBinding +
        clusterRoleBindingMixin.metadata.withNamespace(namespace) +
        clusterRoleBinding.withSubjects([subject]),

      rbacClusterRoleBinding():

        local rbacClusterRoleBinding = std.filter(getClusterRoleBinding, seldonTemplate.items)[0];

        local subject = rbacClusterRoleBinding.subjects[0]
                        { namespace: namespace };

        rbacClusterRoleBinding +
        clusterRoleBindingMixin.metadata.withNamespace(namespace) +
        clusterRoleBinding.withSubjects([subject]),

      rbacRoleBinding():

        local rbacRoleBinding = std.filter(getRoleBinding, seldonTemplate.items)[0];

        local subject = rbacRoleBinding.subjects[0]
                        { namespace: namespace };

        rbacRoleBinding +
        roleBindingMixin.metadata.withNamespace(namespace) +
        roleBinding.withSubjects([subject]),

      rbacAmbassadorRoleBinding():

        local rbacRoleBinding = std.filter(getAmbassadorRoleBinding, seldonTemplate.items)[0];

        local subject = rbacRoleBinding.subjects[0]
                        { namespace: namespace };

        rbacRoleBinding +
        roleBindingMixin.metadata.withNamespace(namespace) +
        roleBinding.withSubjects([subject]),

      rbacAmbassadorClusterRoleBinding():

        local rbacClusterRoleBinding = std.filter(getAmbassadorClusterRoleBinding, seldonTemplate.items)[0];

        local subject = rbacClusterRoleBinding.subjects[0]
                        { namespace: namespace };

        rbacClusterRoleBinding +
        clusterRoleBindingMixin.metadata.withNamespace(namespace) +
        clusterRoleBinding.withSubjects([subject]),

      ambassadorDeployment():

        local ambassadorDeployment = std.filter(getAmbassadorDeployment, seldonTemplate.items)[0];

        ambassadorDeployment +
        deployment.mixin.metadata.withName(name + "-ambassador") +
        deployment.mixin.metadata.withNamespace(namespace),


      ambassadorService():

        local ambassadorService = std.filter(getAmbassadorService, seldonTemplate.items)[0];

        ambassadorService +
        service.metadata.withName(name + "-ambassador") +
        service.metadata.withNamespace(namespace),

      crd():

        if std.startsWith(seldonVersion, "0.1") then crdDefn.crd1() else crdDefn.crd2(),

    },  // parts
}
