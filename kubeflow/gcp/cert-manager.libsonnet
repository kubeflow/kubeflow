{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local certificateCRD = {
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
    certificateCRD:: certificateCRD,

    local clusterIssuerCRD = {
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
    clusterIssuerCRD:: clusterIssuerCRD,

    local issuerCRD = {
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
    issuerCRD:: issuerCRD,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cert-manager",
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    local clusterRole = {
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
    clusterRole:: clusterRole,

    local clusterRoleBinding = {
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
    clusterRoleBinding:: clusterRoleBinding,

    local deploy = {
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
    deploy:: deploy,

    local issuerLEProd = {
      apiVersion: "certmanager.k8s.io/v1alpha1",
      kind: "ClusterIssuer",
      metadata: {
        name: "letsencrypt-prod",
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
    issuerLEProd:: issuerLEProd,

    parts:: self,
    all:: [
      self.certificateCRD,
      self.clusterIssuerCRD,
      self.issuerCRD,
      self.serviceAccount,
      self.clusterRole,
      self.clusterRoleBinding,
      self.deploy,
      self.issuerLEProd,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
