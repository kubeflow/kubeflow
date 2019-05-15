{
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local ui_name = params.name + "-login",

    local authService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  AuthService",
              "name: " + params.name,
              "auth_service: " + params.name + "." + params.namespace + ":8085",
              'allowed_headers:\n- "x-from-login"',
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 8085,
            targetPort: 8085,
          },
        ],
        selector: {
          app: params.name,
        },
        type: "ClusterIP",
      },
    },
    authService:: authService,

    local authDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: params.name,
        namespace: params.namespace,

      },
      spec: {
        // replicas here should always be 1:
        // we store auth cookies in memory and we don't support share them among pods.
        replicas: 1,
        strategy: {
          type: "RollingUpdate",
        },
        template: {
          metadata: {
            labels: {
              app: params.name,
            },
          },
          spec: {
            containers: [
              {
                image: params.image,
                name: "app",
                workingDir: "/opt/kubeflow",
                env: [
                  {
                    name: "USERNAME",
                    valueFrom: {
                      secretKeyRef: {
                        name: params.authSecretName,
                        key: "username",
                      },
                    },
                  },
                  {
                    name: "PASSWORDHASH",
                    valueFrom: {
                      secretKeyRef: {
                        name: params.authSecretName,
                        key: "passwordhash",
                      },
                    },
                  },
                ],
                command: [
                  "/opt/kubeflow/gatekeeper",
                ],
                args: [
                  "--username=$(USERNAME)",
                  "--pwhash=$(PASSWORDHASH)",
                ],
                ports: [
                  {
                    containerPort: 8085,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    authDeployment:: authDeployment,

    local loginService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: ui_name,
        },
        name: ui_name,
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: kflogin-mapping",
              "prefix: /kflogin",
              "rewrite: /kflogin",
              "timeout_ms: 300000",
              "service: " + ui_name + "." + params.namespace,
              "use_websocket: true",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 5000,
          },
        ],
        selector: {
          app: ui_name,
        },
        type: "ClusterIP",
      },
    },
    loginService:: loginService,

    local loginIstioVirtualService = {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "VirtualService",
      metadata: {
        name: ui_name,
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
            match: [
              {
                uri: {
                  prefix: "/kflogin",
                },
              },
            ],
            rewrite: {
              uri: "/kflogin",
            },
            route: [
              {
                destination: {
                  host: std.join(".", [
                    ui_name,
                    params.namespace,
                    "svc",
                    params.clusterDomain,
                  ]),
                  port: {
                    number: 80,
                  },
                },
              },
            ],
            timeout: "300s",
          },
        ],
      },
    },
    loginIstioVirtualService:: loginIstioVirtualService,

    local loginDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: ui_name,
        namespace: params.namespace,

      },
      spec: {
        replicas: 1,
        strategy: {
          type: "RollingUpdate",
        },
        template: {
          metadata: {
            labels: {
              app: ui_name,
            },
          },
          spec: {
            containers: [
              {
                image: params.imageui,
                name: "app",
                ports: [
                  {
                    containerPort: 5000,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    loginDeployment:: loginDeployment,

    parts:: self,
    all:: [
      self.authService,
      self.authDeployment,
      self.loginService,
      self.loginDeployment,
    ] + if util.toBool(params.injectIstio) then [
      self.loginIstioVirtualService,
    ] else [],

    list(obj=self.all):: util.list(obj),
  },
}
