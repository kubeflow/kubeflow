{
  parts(namespace):: {
    local k = import "k.libsonnet",
    local certManagerImage = "quay.io/jetstack/cert-manager-controller:v0.2.4",
    local certManagerIngressShimImage = "quay.io/jetstack/cert-manager-ingress-shim:v0.2.4",

    // Note, not using std.prune to preserve required empty http01 map in the Issuer spec.
    certManagerParts(acmeEmail, acmeUrl):: k.core.v1.list.new([
      $.parts(namespace).certificateCRD,
      $.parts(namespace).clusterIssuerCRD,
      $.parts(namespace).issuerCRD,
      $.parts(namespace).serviceAccount,
      $.parts(namespace).clusterRole,
      $.parts(namespace).clusterRoleBinding,
      $.parts(namespace).deploy,
      $.parts(namespace).issuerLEProd(acmeEmail, acmeUrl),
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
          resources: ["secrets", "events", "endpoints", "services", "pods"],
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

    deploy:: {
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
              },
              {
                name: "ingress-shim",
                image: certManagerIngressShimImage,
                imagePullPolicy: "IfNotPresent",
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
