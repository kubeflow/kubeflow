{
  parts(namespace):: {

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
            "port": 80, 
            "targetPort": 80
          }
        ], 
        "selector": {
          "service": "envoy"
        }, 
        "type": "ClusterIP",
      }
    }, // service 
   
    deploy(image):: {
      "apiVersion": "extensions/v1beta1", 
      "kind": "Deployment", 
      "metadata": {
        "name": "envoy",
        "namespace": namespace,
      }, 
      "spec": {
        "replicas": 3, 
        "template": {
          "metadata": {
            "labels": {
              "service": "envoy"
            }
          }, 
          "spec": {
            "containers": [
              {
                "image": image, 
                "command": [                  
                  //"tail", "-f", "/dev/null",
                  "/usr/local/bin/envoy",
                  "-c", "/etc/envoy/envoy-config.json",
                  "--log-level", "info",
                ],
                "imagePullPolicy": "Always", 
                "name": "envoy",
                // TODO(jlewi): Need to uncomment the liveness and readiness probes once its working
                // TODO(jlewi): 8001 is the envoy admin service. Not sure if that's really the right thing to use as a health and readiness
                // check.
                //"livenessProbe": {
                //  "httpGet": {
                //    "path": "/", 
                //    "port": 8001
                //  }, 
                //  "initialDelaySeconds": 30, 
                //  "periodSeconds": 30
                //},                 
                //"readinessProbe": {
                //  "httpGet": {
                //    "path": "/", 
                //    "port": 8001
                //  }, 
                //  "initialDelaySeconds": 30, 
                //  "periodSeconds": 30
                //}, 
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
              }, 
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
        "envoy-config.json": std.manifestJson($.parts(namespace).config),
      },
    },

    config:: {
      "listeners": [
        {
          "address": "tcp://0.0.0.0:80",
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
                          "timeout_ms": 10000,"prefix": "/ambassador/v0/check_ready","prefix_rewrite": "/ambassador/v0/check_ready",
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_127_0_0_1_8877", "weight": 100.0 }
                                  
                              ]
                          }
                          
                        }
                        ,
                        
                        {
                          "timeout_ms": 10000,"prefix": "/ambassador/v0/check_alive","prefix_rewrite": "/ambassador/v0/check_alive",
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_127_0_0_1_8877", "weight": 100.0 }
                                  
                              ]
                          }
                          
                        }
                        ,
                        
                        {
                          "timeout_ms": 10000,"prefix": "/ambassador/v0/","prefix_rewrite": "/ambassador/v0/",
                          "weighted_clusters": {
                              "clusters": [
                                  
                                     { "name": "cluster_127_0_0_1_8877", "weight": 100.0 }
                                  
                              ]
                          }
                          
                        }
                        
                        
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
        }    
      ],
      "admin": {
        "address": "tcp://127.0.0.1:8001",
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
          {
            "name": "cluster_127_0_0_1_8877",
            "connect_timeout_ms": 3000,
            "type": "strict_dns",
            "lb_type": "round_robin",        
            "hosts": [
              {
                "url": "tcp://127.0.0.1:8877"
              }
              
            ]}
          
        ]
      },
      "statsd_udp_ip_address": "127.0.0.1:8125",
      "stats_flush_interval_ms": 1000
    } // config
  }, // parts
}