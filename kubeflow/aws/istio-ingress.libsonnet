{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      enableJwtChecking: util.toBool(_params.enableJwtChecking),
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
      enableAuth: util.toBool(_params.enableCognito),
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

    local policy = {
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
    policy:: policy,

    local ingress = {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "istio-ingress",
        namespace: params.istioNamespace,
        annotations: {
          "kubernetes.io/ingress.class": "alb",
          "alb.ingress.kubernetes.io/scheme": "internet-facing",
        } + if params.enableAuth then {
          "alb.ingress.kubernetes.io/auth-type": "cognito",
          "alb.ingress.kubernetes.io/auth-idp-cognito": '{"UserPoolArn":"'+ params.CognitoUserPoolArn +'", "UserPoolClientId":"'+ params.CognitoAppClientId +'", "UserPoolDomain":"'+params.CognitoUserPoolDomain +'"}',
          "alb.ingress.kubernetes.io/certificate-arn": params.certArn,
          "alb.ingress.kubernetes.io/listen-ports":  '[{"HTTPS":443}]',
        } else {
          "alb.ingress.kubernetes.io/listen-ports":  '[{"HTTP": 80}]',
        },
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
      self.policy,
    ] else [],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
