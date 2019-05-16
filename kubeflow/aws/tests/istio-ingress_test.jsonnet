local testSuite = import "kubeflow/common/testsuite.libsonnet";
local istioIngress = import "kubeflow/aws/istio-ingress.libsonnet";

local defaultParams = {
  namespace: "kubeflow",
  istioNamespace: "istio-system",
  hostname: "null",
  issuer: "letsencrypt-prod",
  enableCognito: "false",
  CognitoAppClientId: "null",
  CognitoUserPoolId: "null",
  CognitoUserPoolArn: "null",
  CognitoUserPoolDomain: "null",
  enableJwtChecking: "false",
  certArn: "null",
  enableOidc: "false",
  OidcIssuer: "null",
  OidcAuthorizationEndpoint: "null",
  OidcTokenEndpoint: "null",
  OidcUserInfoEndpoint: "null",
  OidcClientId: "null",
  OidcClientSecret: "null",
};

local params = defaultParams + {
  name: "istio-ingress",
};

local cognitoEnabledParams = defaultParams + {
  name: "istio-ingress",
  hostname: "example.com",
  certArn: "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
  enableCognito: "true",
  CognitoAppClientId: "cognito_app_client_id",
  CognitoUserPoolArn: "poolArn",
  CognitoUserPoolDomain: "poolDomain"
};

local jwtCheckingEnabledParams = defaultParams + {
  name: "istio-ingress",
  enableJwtChecking: "true",
  hostname: "example.com",
  certArn: "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
  CognitoAppClientId: "cognito_app_client_id",
  CoginitoRegion: "us-west-2",
  CognitoUserPoolId: "kubeflow-user-pool",
};

local oidcEnabledParams = defaultParams + {
  name: "istio-ingress",
  hostname: "example.com",
  enableOidc: "true",
  certArn: "arn:aws:acm:us-west-2:3482112113:certificate/eeeeeee-a759-40de-80e1-ef619eadae79",
  OidcIssuer: "issuer",
  OidcAuthorizationEndpoint: "authorization-endpoint",
  OidcTokenEndpoint: "token-endpoint",
  OidcUserInfoEndpoint: "user-info-endpoint",
  OidcClientId: "client-id",
  OidcClientSecret: "client-secret",
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
    actual: istioIngress.new(env, cognitoEnabledParams).parts.ingress,
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
    actual: istioIngress.new(env, jwtCheckingEnabledParams).parts.jwtCheckingPolicy,
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
  {
    actual: istioIngress.new(env, oidcEnabledParams).parts.ingress,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "istio-ingress",
        namespace: "istio-system",
        annotations: {
          "kubernetes.io/ingress.class": "alb",
          "alb.ingress.kubernetes.io/scheme": "internet-facing",
          "alb.ingress.kubernetes.io/auth-type": "oidc",
          "alb.ingress.kubernetes.io/auth-idp-oidc": "{\"Issuer\":\"issuer\",\"AuthorizationEndpoint\":\"authorization-endpoint\",\"TokenEndpoint\":\"token-endpoint\",\"UserInfoEndpoint\":\"user-info-endpoint\",\"SecretName\":\"istio-oidc-secret\"}",
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
    actual: istioIngress.new(env, oidcEnabledParams).parts.oidcSecret,
    expected: {
      "apiVersion": "v1",
      "data": {
       "clientId": "Y2xpZW50LWlk",
       "clientSecret": "Y2xpZW50LXNlY3JldA=="
      },
      "kind": "Secret",
      "metadata": {
       "name": "istio-oidc-secret",
       "namespace": "istio-system"
      }
    }
  }
];

testSuite.run(testCases)