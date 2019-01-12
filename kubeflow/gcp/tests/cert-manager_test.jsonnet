local certManager = import "kubeflow/gcp/cert-manager.libsonnet";

local params = {
  name: "cert-manager",
  acmeEmail: "joe@acme.com",
  acmeUrl: "https://acme-v02.api.letsencrypt.org/directory",
  certManagerImage: "quay.io/jetstack/cert-manager-controller:v0.4.0",
};
local env = {
  namespace: "kf-001",
};

local instance = certManager.new(env, params);

std.assertEqual(
  instance.parts.certificateCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "certificates.certmanager.k8s.io",
    },
    spec: {
      group: "certmanager.k8s.io",
      names: {
        kind: "Certificate",
        plural: "certificates",
      },
      scope: "Namespaced",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.clusterIssuerCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "clusterissuers.certmanager.k8s.io",
    },
    spec: {
      group: "certmanager.k8s.io",
      names: {
        kind: "ClusterIssuer",
        plural: "clusterissuers",
      },
      scope: "Cluster",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.issuerCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "issuers.certmanager.k8s.io",
    },
    spec: {
      group: "certmanager.k8s.io",
      names: {
        kind: "Issuer",
        plural: "issuers",
      },
      scope: "Namespaced",
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.serviceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "cert-manager",
      namespace: "kf-001",
    },
  }
) &&

std.assertEqual(
  instance.parts.clusterRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      name: "cert-manager",
    },
    rules: [
      {
        apiGroups: [
          "certmanager.k8s.io",
        ],
        resources: [
          "certificates",
          "issuers",
          "clusterissuers",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "secrets",
          "events",
          "endpoints",
          "services",
          "pods",
          "configmaps",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "extensions",
        ],
        resources: [
          "ingresses",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.clusterRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      name: "cert-manager",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "cert-manager",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "cert-manager",
        namespace: "kf-001",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.deploy,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        app: "cert-manager",
      },
      name: "cert-manager",
      namespace: "kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: "cert-manager",
          },
        },
        spec: {
          containers: [
            {
              args: [
                "--cluster-resource-namespace=kf-001",
                "--leader-election-namespace=kf-001",
              ],
              image: "quay.io/jetstack/cert-manager-controller:v0.4.0",
              imagePullPolicy: "IfNotPresent",
              name: "cert-manager",
            },
          ],
          serviceAccountName: "cert-manager",
        },
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.issuerLEProd,
  {
    apiVersion: "certmanager.k8s.io/v1alpha1",
    kind: "Issuer",
    metadata: {
      name: "letsencrypt-prod",
      namespace: "kf-001",
    },
    spec: {
      acme: {
        email: "joe@acme.com",
        http01: {},
        privateKeySecretRef: {
          name: "letsencrypt-prod-secret",
        },
        server: "https://acme-v02.api.letsencrypt.org/directory",
      },
    },
  }
)
