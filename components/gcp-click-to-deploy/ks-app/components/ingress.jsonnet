local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components.ingress;

local k = import "k.libsonnet";
local argo = import "argo.libsonnet";
local namespace = env.namespace;

local fqdn = "deploy-gcp.kubeflow.dev";
local tlsSecretName = "gcp-deploy-tls";
local issuerName = "letsencrypt";

// see
// https://cert-manager.readthedocs.io/en/latest/reference/api-docs/index.html#certificatespec-v1alpha1

local issuer = {
  apiVersion: "certmanager.k8s.io/v1alpha1",
  kind: "Issuer",
  metadata: {
    name: issuerName,
    namespace: "gcp-deploy",
  },
  spec: {
    acme: {
      server: "https://acme-v01.api.letsencrypt.org/directory",
      email: "jlewi@google.com",

      // Name of a secret used to store the ACME account private key
      // I think this key is created by the cert manager.
      privateKeySecretRef: {
        name: "letsencrypt-issuer",
      },

      // ACME DNS-01 provider configurations
      dns01: {

        // Here we define a list of DNS-01 providers that can solve DNS challenges
        providers:
          [
            {
              name: "prod-dns",
              clouddns: {
                // A secretKeyRef to a google cloud json service account
                serviceAccountSecretRef: {
                  name: "gcp-sa",
                  key: "gcp-sa.json",
                },
                // The project in which to update the DNS zone
                project: "kubeflow-dns",
              },
            },
          ],
      },
    },
  },
};

local certificate = {
  apiVersion: "certmanager.k8s.io/v1alpha1",
  kind: "Certificate",
  metadata: {
    name: tlsSecretName,
    namespace: namespace,
  },

  spec: {
    secretName: tlsSecretName,
    issuerRef: {
      name: issuerName,
    },
    commonName: fqdn,
    dnsNames: [
      fqdn,
    ],
    acme: {
      config: [
        {
          dns01: {
            provider: "prod-dns",
          },
          domains: [
            fqdn,
          ],
        },
      ],
    },
  },
};  // certificate

local ingress = {
  apiVersion: "extensions/v1beta1",
  kind: "Ingress",
  metadata: {
    name: "gcp-deploy",
    namespace: namespace,
    annotations: {
      "external-dns.alpha.kubernetes.io/hostname": fqdn,
      "kubernetes.io/tls-acme": "true",
      // TODO(jlewi): We should automatically redirect users
      // to the https site. We could do this by using a custom default
      // backend.
    },
  },
  spec: {
    backend: {
      serviceName: "gcp-deploy",
      servicePort: 80,
    },
    tls: [
      {
        hosts: [
          fqdn,
        ],
        secretName: tlsSecretName,
      },
    ],
  },
};  // ingress;

std.prune(k.core.v1.list.new([
  issuer,
  certificate,
  ingress,
]))
