local testSuite = import "kubeflow/common/testsuite.libsonnet";
local istioIngress = import "kubeflow/aws/istio-ingress.libsonnet";

local params = {
  name: "isto-ingress",
  istioNamespace: "istio-system",
  enableJwtChecking: "false",
  istioTls: "false",
  hostname: "null",
  enableCognito: "false"
};

local tlsEnabledParams = {
  name: "isto-ingress",
  istioNamespace: "istio-system",
  enableJwtChecking: "false",
  istioTls: "true",
  hostname: "example.com",
  certArn: "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
  enableCognito: "true",
  CognitoAppClientId: "cognito_app_client_id",
  CognitoUserPoolArn: "poolArn",
  CognitoUserPoolDomain: "poolDomain"
};

local authEnabledParams = {
  name: "isto-ingress",
  istioNamespace: "istio-system",
  enableJwtChecking: "true",
  istioTls: "true",
  hostname: "example.com",
  certArn: "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
  CognitoAppClientId: "cognito_app_client_id",
  CoginitoRegion: "us-west-2",
  CognitoUserPoolId: "kubeflow-user-pool",
  enableCognito: "false",
};

local env = {
  namespace: "kf-001",
};

local instance = istioIngress.new(env, params);

local testCases = [
  {
    actual: instance.parts.gateway,
    expected: {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "Gateway",
      metadata: {
        name: "kubeflow-gateway",
        namespace: "kf-001",
      },
      spec: {
        selector: {
          istio: "ingressgateway"
        },
        servers: [
          {
            port: {
              number: 80,
              name: "http",
              protocol: "HTTP"
            },
            hosts: [
              "*"
            ],
          },
        ],
      },
    },
  },
  {
    actual: instance.parts.virtualService,
    expected: {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "VirtualService",
      metadata: {
        name: "kubeflow-routes",
        namespace: "kf-001",
      },
      spec: {
        hosts: [
          "*",
        ],
        gateways: [
          "kubeflow-gateway",
        ],
        http: [
          {
            "match": [
              {
                "uri": {
                  "prefix": "/"
                }
              }
            ],
            "route": [
              {
                "destination": {
                  "host": "ambassador",
                  "port": {
                    "number": 80
                  }
                }
              }
            ]
          }
        ],
      },
    },
  },
  {
    actual: instance.parts.ingress,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "istio-ingress",
        namespace: "istio-system",
        annotations: {
          "kubernetes.io/ingress.class": "alb",
          "alb.ingress.kubernetes.io/scheme": "internet-facing",
          "alb.ingress.kubernetes.io/listen-ports":  '[{"HTTP": 80}]'
        },
      },
      spec: {
        rules: [
          {
            http: {
              paths: [
                {
                  backend: {
                    serviceName: "istio-ingressgateway",
                    servicePort: 80,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
      },
    },
  },
  {
    actual: istioIngress.new(env, tlsEnabledParams).parts.ingress,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "istio-ingress",
        namespace: "istio-system",
        annotations: {
          "kubernetes.io/ingress.class": "alb",
          "alb.ingress.kubernetes.io/scheme": "internet-facing",
          "alb.ingress.kubernetes.io/auth-type": "cognito",
          "alb.ingress.kubernetes.io/auth-idp-cognito": '{"UserPoolArn":"poolArn", "UserPoolClientId":"cognito_app_client_id", "UserPoolDomain":"poolDomain"}',
          "alb.ingress.kubernetes.io/certificate-arn": "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
          "alb.ingress.kubernetes.io/listen-ports":  '[{"HTTPS":443}]',
        },
      },
      spec: {
        rules: [
          {
            host: "example.com",
            http: {
              paths: [
                {
                  backend: {
                    serviceName: "istio-ingressgateway",
                    servicePort: 80,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
      },
    },
  },
  {
    actual: istioIngress.new(env, authEnabledParams).parts.policy,
    expected: {
      apiVersion: "authentication.istio.io/v1alpha1",
      kind: "Policy",
      metadata: {
        name: "istio-jwt",
        namespace: "istio-system",
      },
      spec: {
        "targets": [
          {
            "name": "istio-ingressgateway",
            "ports": [
              {
                "number": 80
              }
            ]
          }
        ],
        "origins": [
          {
            "jwt": {
              "audiences": [
                "cognito_app_client_id",
              ],
              "issuer": "https://cognito-idp.us-west-2.amazonaws.com/kubeflow-user-pool",
              "jwksUri": "https://cognito-idp.us-west-2.amazonaws.com/kubeflow-user-pool/.well-known/jwks.json",
              "jwtHeaders": [
                "x-amzn-cognito-jwt-assertion"
              ],
            }
          }
        ],
        "principalBinding": "USE_ORIGIN"
      },
    },
  },
];

testSuite.run(testCases)