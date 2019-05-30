{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      enableJwtChecking: util.toBool(_params.enableJwtChecking),
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
      authType: if util.toBool(_params.enableCognito) then "cognito" else if util.toBool(_params.enableOidc) then "oidc" else "null",
    },

    local kubeflowGateway = {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "Gateway",
      metadata: {
        name: "kubeflow-gateway",
        namespace: params.namespace,
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
    }, // kubeflowGateway
    gateway:: kubeflowGateway,

    local kubeflowRoutes = {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "VirtualService",
      metadata: {
        name: "kubeflow-routes",
        namespace: params.namespace,
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
    }, // kubeflowRoutes
    virtualService:: kubeflowRoutes,

    local jwtCheckingPolicy = if params.enableJwtChecking then {
      assert params.CognitoAppClientId != "null" : "Parameter 'CognitoAppClientId' required for auth-type 'cognito'",
      assert params.CoginitoRegion != "null" : "Parameter 'CoginitoRegion' required for auth-type 'cognito'",
      assert params.CognitoUserPoolId != "null" : "Parameter 'CognitoUserPoolId' required for auth-type 'cognito'",

      apiVersion: "authentication.istio.io/v1alpha1",
      kind: "Policy",
      metadata: {
        name: "istio-jwt",
        namespace: params.istioNamespace,
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
                params.CognitoAppClientId,
              ],
              "issuer": "https://cognito-idp." + params.CoginitoRegion + ".amazonaws.com/" + params.CognitoUserPoolId,
              "jwksUri": "https://cognito-idp." + params.CoginitoRegion + ".amazonaws.com/" + params.CognitoUserPoolId + "/.well-known/jwks.json",
              "jwtHeaders": [
                // double confirm headers in documentation
                "x-amzn-cognito-jwt-assertion"
              ],
            }
          }
        ],
        "principalBinding": "USE_ORIGIN"
      },
    },
    jwtCheckingPolicy:: jwtCheckingPolicy,

    local oidcSecret = if params.authType == "oidc" then {
      assert params.OidcClientId != "null" : "Parameter 'OidcClientId' required for auth-type 'oidc'",
      assert params.OidcClientSecret != "null" : "Parameter 'OidcClientSecret' required for auth-type 'oidc'",

      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: "istio-oidc-secret",
        namespace: params.istioNamespace
      },
      data: {
        clientId: std.base64(params.OidcClientId),
        clientSecret: std.base64(params.OidcClientSecret)
      }
    },
    oidcSecret:: oidcSecret,

    local ingress = {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "istio-ingress",
        namespace: params.istioNamespace,
        annotations: {
          "kubernetes.io/ingress.class": "alb",
          "alb.ingress.kubernetes.io/scheme": "internet-facing",
        } + (if params.authType == "cognito" then {
          assert params.CognitoUserPoolArn != "null" : "Parameter 'CognitoUserPoolArn' required for auth-type 'cognito'",
          assert params.CognitoAppClientId != "null" : "Parameter 'CognitoAppClientId' required for auth-type 'cognito'",
          assert params.CognitoUserPoolDomain != "null" : "Parameter 'CognitoUserPoolDomain' required for auth-type 'cognito'",

          "alb.ingress.kubernetes.io/auth-type": "cognito",
          "alb.ingress.kubernetes.io/auth-idp-cognito": '{"UserPoolArn":"'+ params.CognitoUserPoolArn +'", "UserPoolClientId":"'+ params.CognitoAppClientId +'", "UserPoolDomain":"'+params.CognitoUserPoolDomain +'"}',
        } else if params.authType == "oidc" then {
          assert params.OidcIssuer != "null" : "Parameter 'OidcIssuer' required for auth-type 'oidc'",
          assert params.OidcAuthorizationEndpoint != "null" : "Parameter 'OidcAuthorizationEndpoint' required for auth-type 'oidc'",
          assert params.OidcTokenEndpoint != "null" : "Parameter 'OidcTokenEndpoint' required for auth-type 'oidc'",
          assert params.OidcUserInfoEndpoint != "null" : "Parameter 'OidcUserInfoEndpoint' required for auth-type 'oidc'",

          "alb.ingress.kubernetes.io/auth-type": "oidc",
          "alb.ingress.kubernetes.io/auth-idp-oidc": '{"Issuer":"'+ params.OidcIssuer + '","AuthorizationEndpoint":"'+ params.OidcAuthorizationEndpoint + '","TokenEndpoint":"'+ params.OidcTokenEndpoint +'","UserInfoEndpoint":"'+ params.OidcUserInfoEndpoint + '","SecretName":"istio-oidc-secret"}'
        } else {
        }) + (if params.authType != "null" || params.certArn != "null" then {
          assert params.certArn != "null" : "Parameter 'certArn' required for auth-type '" + params.authType + "'",

          "alb.ingress.kubernetes.io/certificate-arn": params.certArn,
          "alb.ingress.kubernetes.io/listen-ports": '[{"HTTPS":443}]',
        } else {
          "alb.ingress.kubernetes.io/listen-ports": '[{"HTTP": 80}]',
        }),
      },
      spec: {
        rules: [
          {
            [if params.hostname != "null" then "host"]: params.hostname,
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
    },  // ingress
    ingress:: ingress,


    parts:: self,
    all:: [
      self.gateway,
      self.virtualService,
      self.ingress,
    ] + if params.enableJwtChecking then [
      self.jwtCheckingPolicy,
    ] else [
    ] + if params.authType == "oidc" then [
      self.oidcSecret
    ] else [],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
