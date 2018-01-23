{
  parts(namespace):: {
    local k = import 'k.libsonnet',
    all(envoyImage, secretName, ipName)::std.prune(k.core.v1.list.new([  
        $.parts(namespace).service,
        $.parts(namespace).deploy(envoyImage),
        $.parts(namespace).configMap,
        $.parts(namespace).sampleService,
        $.parts(namespace).sampleApp,

        $.parts(namespace).ingress(secretName, ipName),
    ])),

    service:: {
      "apiVersion": "v1", 
      "kind": "Service", 
      "metadata": {
        "labels": {
          "service": "envoy"
        }, 
        "name": "envoy",
        "namespace": namespace,
      }, 
      "spec": {
        "ports": [
          {
            "name": "envoy", 
            "port": healthEnvoyPort, 
            "targetPort": healthEnvoyPort,
          }
        ], 
        "selector": {
          "service": "envoy"
        }, 
        // NodePort because this will be the backend for our ingress.
        "type": "NodePort",
      }
    }, // service 
   
    envoyContainer(params):: {
      "image": params.image, 
      "command": [                  
        "/usr/local/bin/envoy",
        "-c", params.configPath,
        "--log-level", "info",
        // Since we are running multiple instances of envoy on the same host we need to set a unique baseId                
        "--base-id", params.baseId,
      ],
      "imagePullPolicy": "Always", 
      "name": params.name,
      "livenessProbe": {
        "httpGet": {
          "path": params.healthPath, 
          "port": params.healthPort
        }, 
        "initialDelaySeconds": 30, 
        "periodSeconds": 30
      },                 
      "readinessProbe": {
        "httpGet": {
          "path": params.healthPath, 
          "port": params.healthPort
        }, 
        "initialDelaySeconds": 30, 
        "periodSeconds": 30
      }, 
      "ports": std.map(function(p) 
        {
          "containerPort": p,
        }
        , params.ports),        
      "resources": {
        "limits": {
          "cpu": 1, 
          "memory": "400Mi"
        }, 
        "requests": {
          "cpu": "200m", 
          "memory": "100Mi"
        }
      },
      "volumeMounts": [
        {
          "mountPath": "/etc/envoy", 
          "name": "config-volume"
        }
      ],
    }, // envoyContainer

    deploy(image):: {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Deployment", 
      "metadata": {
        "name": "envoy",
        "namespace": namespace,
      }, 
      "spec": {
        # TODO(jlewi): Might want to increase this. We set it to 1 just to facilitate debugging/troubleshooting because
        # this way we know which replica handles a request.
        "replicas": 1, 
        "template": {
          "metadata": {
            "labels": {
              "service": "envoy"
            }
          }, 
          "spec": {
            "containers": [
                $.parts(namespace).envoyContainer({
                  "image": image,
                  "name": "envoy-health",
                  "healthPath": "/healthz",
                  "healthPort": healthEnvoyPort,
                  "configPath": "/etc/envoy/envoy-health-config.json",
                  "baseId": "1",
                  "ports": [healthEnvoyPort, healthEnvoyAdminPort, healthEnvoyStatsPort],
                }),
                $.parts(namespace).envoyContainer({
                  "image": image,
                  "name": "envoy-jwt",
                  // We use the admin port for the health, readiness check because the main port will require a valid JWT.
                  "healthPath": "/server_info",
                  "healthPort": jwtEnvoyAdminPort,
                  "configPath": "/etc/envoy/envoy-jwt-config.json",
                  "baseId": "27000",
                  "ports": [jwtEnvoyPort, jwtEnvoyAdminPort, jwtEnvoyStatsPort],
                }), 
            ], 
            "restartPolicy": "Always",
            "volumes": [
              {
                "configMap": {
                  "name": "envoy-config"
                }, 
                "name": "config-volume"
              }
            ],
          }
        }
      }
    },  // deploy

    configMap:: {
      "apiVersion": "v1",     
      "kind": "ConfigMap", 
      "metadata": {
        "name": "envoy-config",
        namespace: namespace,
      },
      "data": {
        "envoy-jwt-config.json": std.manifestJson($.parts(namespace).jwtConfig),
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
    jwtConfig:: {
      "listeners": [
        {
          "address": "tcp://0.0.0.0:" + jwtEnvoyPort,
          "filters": [
            {
              "type": "read",
              "name": "http_connection_manager",
              "config": {
                "codec_type": "auto",
                "stat_prefix": "ingress_http",
                "access_log": [
                  {
                    "format": "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                    "path": "/dev/fd/1"
                  }
                ],
                "route_config": {
                  "virtual_hosts": [
                    {
                      "name": "backend",
                      "domains": ["*"],
                      "routes": [                        
                        {
                          "timeout_ms": 10000,
                          "prefix": "/whoami",
                          "prefix_rewrite": "/",                          
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_iap_app", "weight": 100.0 }
                                  
                              ]
                          }                          
                        },
                        // Jupyter uses the prefixes /hub & /user
                        {
                          // JupyterHub requires the prefix /hub
                          "timeout_ms": 10000,
                          "prefix": "/hub",
                          "prefix_rewrite": "/hub",
                          "use_websocket": true,
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_jupyterhub", "weight": 100.0 }
                                  
                              ]
                          }                          
                        },                        
                        {
                          // JupyterHub requires the prefix /user
                          "timeout_ms": 10000,
                          "prefix":  "/user",
                          "prefix_rewrite": "/user",
                          "use_websocket": true,
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_jupyterhub", "weight": 100.0 }
                                  
                              ]
                          }                          
                        },
                      ]
                    }
                  ]
                },
                "filters": [
                  {
                    "type": "decoder",
                    "name": "jwt-auth",
                    "config": {                  
                      "issuers": [
                        {
                          "name": "https://cloud.google.com/iap",
                          // TODO(jlewi): This audience is not correct; it should not be hardcoded it needs to be a parameter
                          // because it depends on the backend.
                          "audiences": [
                            "/projects/991277910492/global/backendServices/31"
                          ],
                          "pubkey": {
                            "type": "jwks",
                            "uri": "https://www.gstatic.com/iap/verify/public_key-jwk",
                            "cluster": "iap_issuer"
                          }
                        }
                      ]
                    }
                  },
                  { 
                    "type": "decoder",
                    "name": "router",
                    "config": {}
                  }
                ]
              }
            }
          ]
        },
      ],
      "admin": {
        // We use 0.0.0.0 and not 127.0.0.1 because we want the admin server to be available on all devices
        // so that it can be used for health checking.
        "address": "tcp://0.0.0.0:" + jwtEnvoyAdminPort,
        "access_log_path": "/tmp/admin_access_log"
      },
      "cluster_manager": {
        "clusters": [
          {
            "name": "https://cloud.google.com/iap",
            "connect_timeout_ms": 5000,
            "type": "strict_dns",
            "circuit_breakers": {
             "default": {
              "max_pending_requests": 10000,
              "max_requests": 10000
             }
            },
            "lb_type": "round_robin",
            "hosts": [
              {
                "url": "tcp://www.gstatic.com:80"
              }
            ]
          },
          // Example route to test things.
          {
          "name": "cluster_iap_app",
          "connect_timeout_ms": 3000,
          "type": "strict_dns",
          "lb_type": "round_robin",        
          "hosts": [
            {
              "url": "tcp://iap-sample-app." + namespace + ":80"
            }
            
          ]},
          {
          "name": "cluster_jupyterhub",
          "connect_timeout_ms": 3000,
          "type": "strict_dns",
          "lb_type": "round_robin",        
          "hosts": [
            {
              "url": "tcp://tf-hub-lb." + namespace + ":80"
            }
            
          ]},
        ]
      },
      "statsd_udp_ip_address": "127.0.0.1:" + jwtEnvoyStatsPort,
      "stats_flush_interval_ms": 1000
    }, // config

    // This is the config used for the first proxy that serves as a backend for the GCP 
    // loadbalncer. Its solely purpose is to route requests that shouldn't go through IAP
    // e.g. the http health check and mayb kube lego.    
    healthConfig:: {
      "listeners": [
        {
          "address": "tcp://0.0.0.0:" + healthEnvoyPort,
          "filters": [
            {
              "type": "read",
              "name": "http_connection_manager",
              "config": {
                "codec_type": "auto",
                "stat_prefix": "ingress_http",
                "access_log": [
                  {
                    "format": "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                    "path": "/dev/fd/1"
                  }
                ],
                "route_config": {
                  "virtual_hosts": [
                    {
                      "name": "backend",
                      "domains": ["*"],
                      "routes": [
                        // First route that matches is picked.
                        {
                          "timeout_ms": 10000,
                          "path": "/healthz",
                          "prefix_rewrite": "/server_info",
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_healthz", "weight": 100.0 }
                                  
                              ]
                          }                          
                        },
                        // Route all remaining paths to the envoy proxy for JWT verification.
                        {
                          // JupyterHub requires the prefix /hub
                          "timeout_ms": 10000,
                          "prefix": "/",
                          "use_websocket": true,
                          "weighted_clusters": {
                              "clusters": [
                                  { "name": "cluster_default", 
                                    "weight": 100.0 }
                              ]
                          }                          
                        },
                      ]
                    }
                  ]
                },
                "filters": [                  
                  { 
                    "type": "decoder",
                    "name": "router",
                    "config": {}
                  }
                ]
              }
            }
          ]
        },
      ],
      "admin": {
        "address": "tcp://127.0.0.1:" + healthEnvoyAdminPort,
        "access_log_path": "/tmp/admin_access_log"
      },
      "cluster_manager": {
        "clusters": [
          // Example route to test things.
          {
          "name": "cluster_healthz",
          "connect_timeout_ms": 3000,
          "type": "strict_dns",
          "lb_type": "round_robin",        
          "hosts": [
            {
              // We just use the admin server for the health check
              "url": "tcp://127.0.0.1:" + healthEnvoyAdminPort, 
            }
            
          ]},
          {
          "name": "cluster_default",
          "connect_timeout_ms": 3000,
          "type": "strict_dns",
          "lb_type": "round_robin",        
          "hosts": [
            {
              // Route to the colocated envoy host for JWT validation.
              "url": "tcp://127.0.0.1:" + jwtEnvoyPort,
            }            
          ]},
        ]
      },
      "statsd_udp_ip_address": "127.0.0.1:" + healthEnvoyStatsPort,
      "stats_flush_interval_ms": 1000
    }, // healthConfig

    sampleService:: {
      "apiVersion": "v1", 
      "kind": "Service", 
      "metadata": {
        "labels": {
          "app": "iap-sample"
        }, 
        "name": "iap-sample-app",
        "namespace": namespace,
      }, 
      "spec": {
        "ports": [
          {
            "port": 80, 
            "targetPort": 8081
          }
        ], 
        "selector": {
          "app": "iap-sample"
        }, 
        "type": "ClusterIP"
      }
    },  // sampleService

    sampleApp:: {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Deployment", 
      "metadata": {
        "name": "iap-sample-app",
        "namespace": namespace,
      }, 
      "spec": {        
        "replicas": 1, 
        "template": {
          "metadata": {
            "labels": {
              "app": "iap-sample"
            }
          }, 
          "spec": {
            "containers": [
              {
                "env": [
                  {
                    "name": "PORT", 
                    "value": "8081"
                  }
                ], 
                "image": "gcr.io/cloud-solutions-group/esp-sample-app:1.0.0", 
                "name": "app", 
                "ports": [
                  {
                    "containerPort": 8081
                  }
                ], 
                "readinessProbe": {
                  "failureThreshold": 2, 
                  "httpGet": {
                    "path": "/healthz", 
                    "port": 8081, 
                    "scheme": "HTTP"
                  }, 
                  "periodSeconds": 10, 
                  "successThreshold": 1, 
                  "timeoutSeconds": 5
                }
              }
            ]
          }
        }
      }
    }, 

    ingress(secretName, ipName):: {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Ingress", 
      "metadata": {
        "name": "envoy-ingress",
        "namespace": namespace,
        "annotations": {
          "kubernetes.io/ingress.global-static-ip-name": ipName,
        }
      }, 
      "spec": {
        "rules": [
          {
            "http": {
              "paths": [
                 {
                  "backend": {
                   # Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
                   # Keep port the servicePort the same as the port we are targetting on the backend so that servicePort will be the same as targetPort for the purpose of
                   # health checking.
                    "serviceName": "envoy", 
                    "servicePort": healthEnvoyPort,
                  }, 
                  "path": "/*"
                },
              ]
            }
          }
        ], 
        "tls": [
          {
            "secretName": secretName,
          }
        ]
      }
    }, // iapIngress
  }, // parts
}