local metacontroller = import "kubeflow/metacontroller/metacontroller.libsonnet";

local params = {
  name: "metacontroller",
  image: "metacontroller/metacontroller:v0.3.0",
};
local env = {
  namespace: "kf-001",
};

local instance = metacontroller.new(env, params);

std.assertEqual(
  instance.parts.compositeControllerCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "compositecontrollers.metacontroller.k8s.io",
    },
    spec: {
      group: "metacontroller.k8s.io",
      names: {
        kind: "CompositeController",
        plural: "compositecontrollers",
        shortNames: [
          "cc",
          "cctl",
        ],
        singular: "compositecontroller",
      },
      scope: "Cluster",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.controllerRevisionsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "controllerrevisions.metacontroller.k8s.io",
    },
    spec: {
      group: "metacontroller.k8s.io",
      names: {
        kind: "ControllerRevision",
        plural: "controllerrevisions",
        singular: "controllerrevision",
      },
      scope: "Namespaced",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.decoratorControllerCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "decoratorcontrollers.metacontroller.k8s.io",
    },
    spec: {
      group: "metacontroller.k8s.io",
      names: {
        kind: "DecoratorController",
        plural: "decoratorcontrollers",
        shortNames: [
          "dec",
          "decorators",
        ],
        singular: "decoratorcontroller",
      },
      scope: "Cluster",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.metaControllerServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "meta-controller-service",
      namespace: "kf-001",
    },
  }
) &&

std.assertEqual(
  instance.parts.metaControllerClusterRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "ClusterRoleBinding",
    metadata: {
      name: "meta-controller-cluster-role-binding",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "cluster-admin",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "meta-controller-service",
        namespace: "kf-001",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.metaControllerStatefulSet,
  {
    apiVersion: "apps/v1beta2",
    kind: "StatefulSet",
    metadata: {
      labels: {
        app: "metacontroller",
      },
      name: "metacontroller",
      namespace: "kf-001",
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
          containers: [
            {
              command: [
                "/usr/bin/metacontroller",
                "--logtostderr",
                "-v=4",
                "--discovery-interval=20s",
              ],
              image: "metacontroller/metacontroller:v0.3.0",
              imagePullPolicy: "Always",
              name: "metacontroller",
              ports: [
                {
                  containerPort: 2345,
                },
              ],
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
                allowPrivilegeEscalation: true,
                privileged: true,
              },
            },
          ],
          serviceAccountName: "meta-controller-service",
        },
      },
    },
  }
)
