local iap = import "../iap.libsonnet";

std.assertEqual(iap.parts("namespace").service, {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    labels: {
      service: "envoy",
    },
    name: "envoy",
    namespace: "namespace",
  },
  spec: {
    ports: [
      {
        name: "envoy",
        port: 8080,
        targetPort: 8080,
      },
    ],
    selector: {
      service: "envoy",
    },
    // NodePort because this will be the backend for our ingress.
    type: "NodePort",
  },
}) &&

std.assertEqual(iap.parts("namespace").ingress("secretName", "ipName", "hostname"), {
  apiVersion: "extensions/v1beta1",
  kind: "Ingress",
  metadata: {
    name: "envoy-ingress",
    namespace: "namespace",
    annotations: {
      "kubernetes.io/ingress.global-static-ip-name": "ipName",
    },
  },
  spec: {
    rules: [
      {
        host: "hostname",
        http: {
          paths: [
            {
              backend: {
                serviceName: "envoy",
                servicePort: 8080,
              },
              path: "/*",
            },
          ],
        },
      },
    ],
    tls: [
      {
        secretName: "secretName",
      },
    ],
  },
}) &&

std.assertEqual(iap.parts("namespace").ingress("secretName", "ipName", "null"), {
  apiVersion: "extensions/v1beta1",
  kind: "Ingress",
  metadata: {
    name: "envoy-ingress",
    namespace: "namespace",
    annotations: {
      "kubernetes.io/ingress.global-static-ip-name": "ipName",
    },
  },
  spec: {
    rules: [
      {
        http: {
          paths: [
            {
              backend: {
                serviceName: "envoy",
                servicePort: 8080,
              },
              path: "/*",
            },
          ],
        },
      },
    ],
    tls: [
      {
        secretName: "secretName",
      },
    ],
  },
})
