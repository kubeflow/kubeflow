{
  local util = import "kubeflow/core/util.libsonnet",
  new(_env, _params):: self + {
    local params = _env + _params + {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },
    list:: util.list(self),

    CertificateCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "certificates.certmanager.k8s.io",
      },
      spec: {
        group: "certmanager.k8s.io",
        version: "v1alpha1",
        names: {
          kind: "Certificate",
          plural: "certificates",
        },
        scope: "Namespaced",
      },
    },

    ClusterIssuerCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "clusterissuers.certmanager.k8s.io",
      },

      spec: {
        group: "certmanager.k8s.io",
        version: "v1alpha1",
        names: {
          kind: "ClusterIssuer",
          plural: "clusterissuers",
        },
        scope: "Cluster",
      },
    },

    IssuerCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "issuers.certmanager.k8s.io",
      },
      spec: {
        group: "certmanager.k8s.io",
        version: "v1alpha1",
        names: {
          kind: "Issuer",
          plural: "issuers",
        },
        scope: "Namespaced",
      },
    },

    ServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cert-manager",
        namespace: params.namespace,
      },
    },

    ClusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "cert-manager",
      },
      rules: [
        {
          apiGroups: ["certmanager.k8s.io"],
          resources: ["certificates", "issuers", "clusterissuers"],
          verbs: ["*"],
        },
        {
          apiGroups: [""],
          resources: ["secrets", "events", "endpoints", "services", "pods", "configmaps"],
          verbs: ["*"],
        },
        {
          apiGroups: ["extensions"],
          resources: ["ingresses"],
          verbs: ["*"],
        },
      ],
    },

    ClusterRoleBinding:: {
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
          name: "cert-manager",
          namespace: params.namespace,
          kind: "ServiceAccount",
        },
      ],
    },

    Deploy:: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "cert-manager",
        namespace: params.namespace,
        labels: {
          app: "cert-manager",
        },
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
            serviceAccountName: "cert-manager",
            containers: [
              {
                name: "cert-manager",
                image: params.certManagerImage,
                imagePullPolicy: "IfNotPresent",
                args: [
                  "--cluster-resource-namespace=" + params.namespace,
                  "--leader-election-namespace=" + params.namespace,
                ],
              },
            ],
          },
        },
      },
    },

    IssuerLEProd:: {
      apiVersion: "certmanager.k8s.io/v1alpha1",
      kind: "Issuer",
      metadata: {
        name: "letsencrypt-prod",
        namespace: params.namespace,
      },
      spec: {
        acme: {
          server: params.acmeUrl,
          email: params.acmeEmail,
          privateKeySecretRef: {
            name: "letsencrypt-prod-secret",
          },
          http01: {
          },
        },
      },
    },
  },
}
