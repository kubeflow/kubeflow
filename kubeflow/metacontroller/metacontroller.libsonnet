{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env,

    local compositeControllerCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "compositecontrollers.metacontroller.k8s.io",
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "compositecontrollers",
          singular: "compositecontroller",
          kind: "CompositeController",
          shortNames: [
            "cc",
            "cctl",
          ],
        },
      },
    },
    compositeControllerCRD:: compositeControllerCRD,

    local decoratorControllerCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "decoratorcontrollers.metacontroller.k8s.io",
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "decoratorcontrollers",
          singular: "decoratorcontroller",
          kind: "DecoratorController",
          shortNames: [
            "dec",
            "decorators",
          ],
        },
      },
    },
    decoratorControllerCRD:: decoratorControllerCRD,

    local controllerRevisionsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "controllerrevisions.metacontroller.k8s.io",
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "controllerrevisions",
          singular: "controllerrevision",
          kind: "ControllerRevision",
        },
      },
    },
    controllerRevisionsCRD:: controllerRevisionsCRD,

    local metaControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "meta-controller-service",
        namespace: params.namespace,
      },
    },
    metaControllerServiceAccount:: metaControllerServiceAccount,

    local metaControllerClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "meta-controller-cluster-role-binding",
      },
      roleRef: {
        kind: "ClusterRole",
        name: "cluster-admin",
        apiGroup: "rbac.authorization.k8s.io",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "meta-controller-service",
          namespace: params.namespace,
        },
      ],
    },
    metaControllerClusterRoleBinding:: metaControllerClusterRoleBinding,

    local metaControllerStatefulSet = {
      apiVersion: "apps/v1beta2",
      kind: "StatefulSet",
      metadata: {
        name: "metacontroller",
        namespace: params.namespace,
        labels: {
          app: "metacontroller",
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "metacontroller",
          },
        },
        serviceName: "",
        template: {
          metadata: {
            labels: {
              app: "metacontroller",
            },
          },
          spec: {
            serviceAccountName: "meta-controller-service",
            containers: [
              {
                name: "metacontroller",
                command: [
                  "/usr/bin/metacontroller",
                  "--logtostderr",
                  "-v=4",
                  "--discovery-interval=20s",
                ],
                image: params.image,
                ports: [
                  {
                    containerPort: 2345,
                  },
                ],
                imagePullPolicy: "Always",
                resources: {
                  limits: {
                    cpu: "4",
                    memory: "4Gi",
                  },
                  requests: {
                    cpu: "500m",
                    memory: "1Gi",
                  },
                },
                securityContext: {
                  privileged: true,
                  allowPrivilegeEscalation: true,
                },
              },
            ],
          },
        },
      },
    },
    metaControllerStatefulSet:: metaControllerStatefulSet,

    parts:: self,
    all:: [
      self.compositeControllerCRD,
      self.controllerRevisionsCRD,
      self.decoratorControllerCRD,
      self.metaControllerServiceAccount,
      self.metaControllerClusterRoleBinding,
      self.metaControllerStatefulSet,
    ],

    list(obj=self.all):: util.list(obj),
  },
}
