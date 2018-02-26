local k = import "k.libsonnet";
local deployment = k.extensions.v1beta1.deployment;
local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;
local service = k.core.v1.service.mixin;
local serviceAccountMixin = k.core.v1.serviceAccount.mixin;
local clusterRoleBindingMixin = k.rbac.v1beta1.clusterRoleBinding.mixin;
local clusterRoleBinding = k.rbac.v1beta1.clusterRoleBinding;
local serviceAccount = k.core.v1.serviceAccount;
local baseApife = import "json/apife-deployment.json";
local apifeService = import "json/apife-service.json";
local operatorDeployment = import "json/operator-deployment.json";
local redisDeployment = import "json/redis-deployment.json";
local redisService = import "json/redis-service.json";
local rbacServiceAccount = import "json/rbac-service-account.json";
local rbacClusterRoleBinding = import "json/rbac-cluster-binding.json";
local crdDefn = import "crd.libsonnet";

{
  parts(namespace):: {

    apife(apifeImage, withRbac)::

      local c = baseApife.spec.template.spec.containers[0] +
                container.withImage(apifeImage) +
                container.withImagePullPolicy("IfNotPresent");

      local apiFeBase =
        baseApife +
        deployment.mixin.metadata.withNamespace(namespace) +
        deployment.mixin.spec.template.spec.withContainers([c]);

      if withRbac == "true" then
        apiFeBase +
        deployment.mixin.spec.template.spec.withServiceAccountName("seldon")
      else
        apiFeBase,


    apifeService(serviceType)::

      apifeService +
      service.metadata.withNamespace(namespace) +
      service.spec.withType(serviceType),

    deploymentOperator(engineImage, clusterManagerImage, springOpts, javaOpts, withRbac):
      local env = [
        { name: "JAVA_OPTS", value: javaOpts },
        { name: "SPRING_OPTS", value: springOpts },
        { name: "ENGINE_CONTAINER_IMAGE_AND_VERSION", value: engineImage },
      ];

      local c = operatorDeployment.spec.template.spec.containers[0] +
                container.withImage(clusterManagerImage) +
                container.withEnvMixin(env) +
                container.withImagePullPolicy("IfNotPresent");

      local depOp = operatorDeployment +
                    deployment.mixin.metadata.withNamespace(namespace) +
                    deployment.mixin.spec.template.spec.withContainers([c]);

      if withRbac == "true" then
        depOp +
        deployment.mixin.spec.template.spec.withServiceAccountName("seldon")
      else
        depOp,

    redisDeployment():

      redisDeployment +
      deployment.mixin.metadata.withNamespace(namespace),

    redisService():

      redisService +
      service.metadata.withNamespace(namespace),

    rbacServiceAccount():

      rbacServiceAccount +
      serviceAccountMixin.metadata.withNamespace(namespace),

    rbacClusterRoleBinding():

      local subject = rbacClusterRoleBinding.subjects[0]
                      { namespace: namespace };

      rbacClusterRoleBinding +
      clusterRoleBindingMixin.metadata.withNamespace(namespace) +
      clusterRoleBinding.withSubjects([subject]),

    crd():

      crdDefn.crd(),

  },  // parts
}
