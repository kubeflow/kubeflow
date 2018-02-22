{
  parts(namespace):: {
    local k = import 'k.libsonnet',

    // We split the components into two protoypes.
    // 1. Prototype contains the ingress and servcie
    // 2. Deployment for Envoy which is the backend for the ingress and related apps.
    //
    // We do this because updating the ingress causes the backend service to change which disables IAP
    // and changes the backend service which is used for the JWT audience.
    // So we want to avoid updating the ingress when updating the Envoy pods or other backend services.
    ingressParts(secretName, ipName):: std.prune(k.core.v1.list.new([
      $.parts(namespace).service,
      $.parts(namespace).ingress(secretName, ipName),
    ])),

    envoy(envoyImage, audiences, disableJwt):: std.prune(k.core.v1.list.new([
      $.parts(namespace).deploy(envoyImage),
      $.parts(namespace).configMap(audiences, disableJwt),
      $.parts(namespace).whoamiService,
      $.parts(namespace).whoamiApp,
    ])),

    service:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "envoy",
        },
        name: "envoy",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "envoy",
            port: healthEnvoyPort,
            targetPort: healthEnvoyPort,
          },
        ],
        selector: {
          service: "envoy",
        },
        // NodePort because this will be the backend for our ingress.
        type: "NodePort",
      },
    },  // service

    envoyContainer(params):: {
      image: params.image,
      command: [
        "/usr/local/bin/envoy",
        "-c",
        params.configPath,
        "--log-level",
        "info",
        // Since we are running multiple instances of envoy on the same host we need to set a unique baseId
        "--base-id",
        params.baseId,
      ],
      imagePullPolicy: "Always",
      name: params.name,
      livenessProbe: {
        httpGet: {
          path: params.healthPath,
          port: params.healthPort,
        },
        initialDelaySeconds: 30,
        periodSeconds: 30,
      },
      readinessProbe: {
        httpGet: {
          path: params.healthPath,
          port: params.healthPort,
        },
        initialDelaySeconds: 30,
        periodSeconds: 30,
      },
      ports: std.map(function(p)
        {
          containerPort: p,
        }
                     , params.ports),
      resources: {
        limits: {
          cpu: 1,
          memory: "400Mi",
        },
        requests: {
          cpu: "200m",
          memory: "100Mi",
        },
      },
      volumeMounts: [
        {
          mountPath: "/etc/envoy",
          name: "config-volume",
        },
      ],
    },  // envoyContainer

    deploy(image):: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "envoy",
        namespace: namespace,
      },
      spec: {
        replicas: 3,
        template: {
          metadata: {
            labels: {
              service: "envoy",
            },
          },
          spec: {
            containers: [
              $.parts(namespace).envoyContainer({
                image: image,
                name: "envoy-health",
                healthPath: "/healthz",
                healthPort: healthEnvoyPort,
                configPath: "/etc/envoy/envoy-health-config.json",
                baseId: "1",
                ports: [healthEnvoyPort, healthEnvoyAdminPort, healthEnvoyStatsPort],
              }),
              $.parts(namespace).envoyContainer({
                image: image,
                name: "envoy-jwt",
                // We use the admin port for the health, readiness check because the main port will require a valid JWT.
                healthPath: "/server_info",
                healthPort: jwtEnvoyAdminPort,
                configPath: "/etc/envoy/envoy-jwt-config.json",
                baseId: "27000",
                ports: [jwtEnvoyPort, jwtEnvoyAdminPort, jwtEnvoyStatsPort],
              }),
            ],
            restartPolicy: "Always",
            volumes: [
              {
                configMap: {
                  name: "envoy-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // deploy

    configMap(audiences, disableJwt):: {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: namespace,
      },
      data: {
        "envoy-jwt-config.json": std.manifestJson($.parts(namespace).jwtConfig(audiences, disableJwt)),
        "envoy-health-config.json": std.manifestJson($.parts(namespace).healthConfig),
      },
    },

    local jwtEnvoyPort = 9080,
    local jwtEnvoyAdminPort = 9001,
    local jwtEnvoyStatsPort = 9025,
    local healthEnvoyPort = 8080,
    local healthEnvoyAdminPort = 8001,
    local healthEnvoyStatsPort = 8025,

    // This is the config for the secondary envoy proxy which does JWT verification
    // and actually routes requests to the appropriate backend.
    jwtConfig(audiences, disableJwt):: {
      listeners: [
        {
          address: "tcp://0.0.0.0:" + jwtEnvoyPort,
          filters: [
            {
              type: "read",
              name: "http_connection_manager",
              config: {
                codec_type: "auto",
                stat_prefix: "ingress_http",
                access_log: [
                  {
                    format: "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                    path: "/dev/fd/1",
                  },
                ],
                route_config: {
                  virtual_hosts: [
                    {
                      name: "backend",
                      domains: ["*"],
                      routes: [
                        {
                          timeout_ms: 10000,
                          prefix: "/whoami",
                          prefix_rewrite: "/",
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_iap_app",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        // Jupyter uses the prefixes /hub & /user
                        {
                          // JupyterHub requires the prefix /hub
                          timeout_ms: 10000,
                          prefix: "/hub",
                          prefix_rewrite: "/hub",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_jupyterhub",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        {
                          // JupyterHub requires the prefix /user
                          timeout_ms: 10000,
                          prefix: "/user",
                          prefix_rewrite: "/user",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_jupyterhub",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        // TODO(ankushagarwal): We should eventually
                        // redirect to the central UI once its ready
                        // See https://github.com/kubeflow/kubeflow/pull/146
                        // Redirect to jupyterhub when visiting /
                        {
                          timeout_ms: 10000,
                          path: "/",
                          prefix_rewrite: "/hub",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_jupyterhub",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        {
                          // Route remaining traffic to Ambassador which supports dynamically adding
                          // routes based on service annotations.
                          timeout_ms: 10000,
                          prefix: "/",
                          prefix_rewrite: "/",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_ambassador",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
                local authFilter = if disableJwt then
                  []
                else [{
                  type: "decoder",
                  name: "jwt-auth",
                  config: {
                    issuers: [
                      {
                        name: "https://cloud.google.com/iap",
                        audiences: audiences,
                        pubkey: {
                          type: "jwks",
                          uri: "https://www.gstatic.com/iap/verify/public_key-jwk",
                          cluster: "iap_issuer",
                        },
                      },
                    ],
                  },
                }],
                filters:
                  authFilter +
                  [
                    {
                      type: "decoder",
                      name: "router",
                      config: {},
                    },
                  ],
              },
            },
          ],
        },
      ],
      admin: {
        // We use 0.0.0.0 and not 127.0.0.1 because we want the admin server to be available on all devices
        // so that it can be used for health checking.
        address: "tcp://0.0.0.0:" + jwtEnvoyAdminPort,
        access_log_path: "/tmp/admin_access_log",
      },
      cluster_manager: {
        clusters: [
          {
            name: "iap_issuer",
            connect_timeout_ms: 5000,
            type: "strict_dns",
            circuit_breakers: {
              default: {
                max_pending_requests: 10000,
                max_requests: 10000,
              },
            },
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://www.gstatic.com:80",
              },
            ],
          },
          {
            name: "cluster_iap_app",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://whoami-app." + namespace + ":80",
              },
            ],
          },
          {
            name: "cluster_jupyterhub",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://tf-hub-lb." + namespace + ":80",
              },

            ],
          },
          {
            name: "cluster_ambassador",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://ambassador." + namespace + ":80",
              },

            ],
          },
        ],
      },
      statsd_udp_ip_address: "127.0.0.1:" + jwtEnvoyStatsPort,
      stats_flush_interval_ms: 1000,
    },  // config

    // This is the config used for the first proxy that serves as a backend for the GCP
    // loadbalncer. Its solely purpose is to route requests that shouldn't go through IAP
    // e.g. the http health check and mayb kube lego.
    healthConfig:: {
      listeners: [
        {
          address: "tcp://0.0.0.0:" + healthEnvoyPort,
          filters: [
            {
              type: "read",
              name: "http_connection_manager",
              config: {
                codec_type: "auto",
                stat_prefix: "ingress_http",
                access_log: [
                  {
                    format: "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                    path: "/dev/fd/1",
                  },
                ],
                route_config: {
                  virtual_hosts: [
                    {
                      name: "backend",
                      domains: ["*"],
                      routes: [
                        // First route that matches is picked.
                        {
                          timeout_ms: 10000,
                          path: "/healthz",
                          prefix_rewrite: "/server_info",
                          weighted_clusters: {
                            clusters: [

                              { name: "cluster_healthz", weight: 100.0 },

                            ],
                          },
                        },
                        // Provide access to the whoami app skipping JWT verification.
                        // this is useful for debugging.
                        {
                          timeout_ms: 10000,
                          prefix: "/noiap/whoami",
                          prefix_rewrite: "/",
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_iap_app",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        // Route all remaining paths to the envoy proxy for JWT verification.
                        {
                          timeout_ms: 10000,
                          prefix: "/",
                          prefix_rewrite: "/",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_default",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
                filters: [
                  {
                    type: "decoder",
                    name: "router",
                    config: {},
                  },
                ],
              },
            },
          ],
        },
      ],
      admin: {
        address: "tcp://127.0.0.1:" + healthEnvoyAdminPort,
        access_log_path: "/tmp/admin_access_log",
      },
      cluster_manager: {
        clusters: [
          {
            name: "cluster_iap_app",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://whoami-app." + namespace + ":80",
              },
            ],
          },
          {
            name: "cluster_healthz",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                // We just use the admin server for the health check
                url: "tcp://127.0.0.1:" + healthEnvoyAdminPort,
              },

            ],
          },
          {
            name: "cluster_default",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                // Route to the colocated envoy host for JWT validation.
                url: "tcp://127.0.0.1:" + jwtEnvoyPort,
              },
            ],
          },
        ],
      },
      statsd_udp_ip_address: "127.0.0.1:" + healthEnvoyStatsPort,
      stats_flush_interval_ms: 1000,
    },  // healthConfig

    whoamiService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "whoami",
        },
        name: "whoami-app",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8081,
          },
        ],
        selector: {
          app: "whoami",
        },
        type: "ClusterIP",
      },
    },  // whoamiService

    whoamiApp:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "whoami-app",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "whoami",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "PORT",
                    value: "8081",
                  },
                ],
                image: "gcr.io/cloud-solutions-group/esp-sample-app:1.0.0",
                name: "app",
                ports: [
                  {
                    containerPort: 8081,
                  },
                ],
                readinessProbe: {
                  failureThreshold: 2,
                  httpGet: {
                    path: "/healthz",
                    port: 8081,
                    scheme: "HTTP",
                  },
                  periodSeconds: 10,
                  successThreshold: 1,
                  timeoutSeconds: 5,
                },
              },
            ],
          },
        },
      },
    },

    ingress(secretName, ipName):: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "envoy-ingress",
        namespace: namespace,
        annotations: {
          "kubernetes.io/ingress.global-static-ip-name": ipName,
        },
      },
      spec: {
        rules: [
          {
            http: {
              paths: [
                {
                  backend: {
                    # Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
                    # Keep port the servicePort the same as the port we are targetting on the backend so that servicePort will be the same as targetPort for the purpose of
                    # health checking.
                    serviceName: "envoy",
                    servicePort: healthEnvoyPort,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
        tls: [
          {
            secretName: secretName,
          },
        ],
      },
    },  // iapIngress
  },  // parts
}
