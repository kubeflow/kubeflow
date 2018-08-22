{
  parts(params):: {
    local namespace = params.namespace,
    local k = import "k.libsonnet",

    // Note, not using std.prune to preserve required empty http01 map in the Issuer spec.
    certManagerParts():: k.core.v1.list.new([
      $.parts(params).certificateCRD,
      $.parts(params).clusterIssuerCRD,
      $.parts(params).issuerCRD,
      $.parts(params).serviceAccount,
      $.parts(params).clusterRole,
      $.parts(params).clusterRoleBinding,
      $.parts(params).deploy(params.certManagerImage),
      $.parts(params).issuerLEProd(params.acmeEmail, params.acmeUrl),
    ]),

    certificateCRD:: {
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

    clusterIssuerCRD:: {
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

    issuerCRD:: {
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

    serviceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cert-manager",
        namespace: namespace,
      },
    },

    clusterRole:: {
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

    clusterRoleBinding:: {
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
          namespace: namespace,
          kind: "ServiceAccount",
        },
      ],
    },

    deploy(certManagerImage):: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "cert-manager",
        namespace: namespace,
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
                image: certManagerImage,
                imagePullPolicy: "IfNotPresent",
                args: [
                  "--cluster-resource-namespace=" + namespace,
                  "--leader-election-namespace=" + namespace,
                ],
              },
            ],
          },
        },
      },
    },

    issuerLEProd(acmeEmail, acmeUrl):: {
      apiVersion: "certmanager.k8s.io/v1alpha1",
      kind: "Issuer",
      metadata: {
        name: "letsencrypt-prod",
        namespace: namespace,
      },
      spec: {
        acme: {
          server: acmeUrl,
          email: acmeEmail,
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
