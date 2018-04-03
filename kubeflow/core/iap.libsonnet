{
  parts(namespace):: {
    local k = import "k.libsonnet",

    ingressParts(secretName, ipName, hostname, issuer, envoyImage, disableJwt, oauthSecretName):: std.prune(k.core.v1.list.new([
      $.parts(namespace).service,
      $.parts(namespace).ingress(secretName, ipName, hostname),
      $.parts(namespace).certificate(secretName, hostname, issuer),
      $.parts(namespace).initServiceAcount,
      $.parts(namespace).initClusterRoleBinding,
      $.parts(namespace).initClusterRole,
      $.parts(namespace).deploy(envoyImage, oauthSecretName),
      $.parts(namespace).configMap(disableJwt),
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
            port: envoyPort,
            targetPort: envoyPort,
          },
        ],
        selector: {
          service: "envoy",
        },
        // NodePort because this will be the backend for our ingress.
        type: "NodePort",
      },
    },  // service

    initServiceAcount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "envoy",
        namespace: namespace,
      },
    },  // initServiceAccount

    initClusterRoleBinding:: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "envoy",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "envoy",
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "envoy",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // initClusterRoleBinding

    initClusterRole:: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "envoy",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["services", "configmaps"],
          verbs: ["get", "list", "patch", "update"],
        },
      ],
    },  // initClusterRoleBinding

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

    deploy(image, oauthSecretName):: {
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
            serviceAccountName: "envoy",
            initContainers: [
              {
                name: "iap",
                image: "google/cloud-sdk:alpine",
                command: [
                  "sh",
                  "/var/envoy-config/iap-init.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: namespace,
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_ID",
                      },
                    },
                  },
                  {
                    name: "CLIENT_SECRET",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_SECRET",
                      },
                    },
                  },
                  {
                    name: "SERVICE",
                    value: "envoy",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/var/envoy-config/",
                    name: "config-volume",
                  },
                ],
              },
            ],
            containers: [
              $.parts(namespace).envoyContainer({
                image: image,
                name: "envoy",
                // We use the admin port for the health, readiness check because the main port will require a valid JWT.
                healthPath: "/server_info",
                healthPort: envoyAdminPort,
                configPath: "/etc/envoy/envoy-config.json",
                baseId: "27000",
                ports: [envoyPort, envoyAdminPort, envoyStatsPort],
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

    configMap(disableJwt):: {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: namespace,
      },
      data: {
        "envoy-config.json": std.manifestJson($.parts(namespace).envoyConfig(disableJwt)),
        // Script executed by init container to enable IAP. When finished, the configmap is patched with the JWT audience.
        "iap-init.sh": |||
          [ -z ${CLIENT_ID} ] && echo Error CLIENT_ID must be set && exit 1
          [ -z ${CLIENT_SECRET} ] && echo Error CLIENT_SECRET must be set && exit 1
          [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
          [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

          apk add --update jq
          curl https://storage.googleapis.com/kubernetes-release/release/v1.9.4/bin/linux/amd64/kubectl > /usr/local/bin/kubectl && chmod +x /usr/local/bin/kubectl

          # Stagger init of replicas when acquiring lock
          sleep $(( $RANDOM % 5 + 1 ))

          kubectl get svc ${SERVICE} -o json > service.json
          LOCK=$(jq -r ".metadata.annotations.iaplock" service.json)

          NOW=$(date -u +'%s')
          if [[ -z "${LOCK}" || "${LOCK}" == "null" ]]; then
            LOCK_T=$NOW
          else
            LOCK_T=$(echo "${LOCK}" | cut -d' ' -f2)
          fi
          LOCK_AGE=$(( $NOW - $LOCK_T ))
          LOCK_TTL=120
          if [[ -z "${LOCK}" || "${LOCK}" == "null" || "${LOCK_AGE}" -gt "${LOCK_TTL}" ]]; then
            jq -r ".metadata.annotations.iaplock=\"$(hostname -s) ${NOW}\"" service.json > service_lock.json
            kubectl apply -f service_lock.json 2>/dev/null
            if [[ $? -eq 0 ]]; then
              echo "Acquired lock on service annotation to update IAP."
            else
              echo "WARN: Failed to acquire lock on service annotation."
              exit 1
            fi
          else
            echo "WARN: Lock on service annotation already acquired by: $LOCK, age: $LOCK_AGE, TTL: $LOCK_TTL"
            sleep 20
            exit 1
          fi

          PROJECT=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/project-id)
          if [ -z ${PROJECT} ]; then
            echo Error unable to fetch PROJECT from compute metadata
            exit 1
          fi

          PROJECT_NUM=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/numeric-project-id)
          if [ -z ${PROJECT_NUM} ]; then
            echo Error unable to fetch PROJECT_NUM from compute metadata
            exit 1
          fi

          NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
          while [[ -z ${BACKEND_ID} ]];
          do BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)');
          echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE}...";
          sleep 2;
          done
          echo BACKEND_ID=${BACKEND_ID}

          NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
          BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri)
          # Enable IAP on the backend service:
          gcloud --project=${PROJECT} compute backend-services update ${BACKEND_SERVICE} \
                --global \
                --iap=enabled,oauth2-client-id=${CLIENT_ID},oauth2-client-secret=${CLIENT_SECRET}

          while [[ -z ${HEALTH_CHECK_URI} ]];
            do HEALTH_CHECK_URI=$(gcloud compute --project=${PROJECT} health-checks list --filter=name~k8s-be-${NODE_PORT}- --uri);
            echo "Waiting for the healthcheck resource PROJECT=${PROJECT} NODEPORT=${NODE_PORT} SERVICE=${SERVICE}...";
            sleep 2;
          done

          # Since we create the envoy-ingress ingress object before creating the envoy
          # deployment object, healthcheck will not be configured correctly in the GCP
          # load balancer. It will default the healthcheck request path to a value of
          # / instead of the intended /healthz.
          # Manually update the healthcheck request path to /healthz
          gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=/healthz

          # Since JupyterHub uses websockets we want to increase the backend timeout
          echo Increasing backend timeout for JupyterHub
          gcloud --project=${PROJECT} compute backend-services update --global ${BACKEND_SERVICE} --timeout=3600

          JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

          echo JWT_AUDIENCE=${JWT_AUDIENCE}

          kubectl get configmap -n ${NAMESPACE} envoy-config -o json | \
            sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" | kubectl apply -f -

          echo "Clearing lock on service annotation"
          kubectl patch svc "${SERVICE}" -p "{\"metadata\": { \"annotations\": {\"iaplock\": \"\" }}}"
        |||,
      },
    },

    local envoyPort = 8080,
    local envoyAdminPort = 8001,
    local envoyStatsPort = 8025,

    // This is the config for the secondary envoy proxy which does JWT verification
    // and actually routes requests to the appropriate backend.
    envoyConfig(disableJwt):: {
      listeners: [
        {
          address: "tcp://0.0.0.0:" + envoyPort,
          filters: [
            {
              type: "read",
              name: "http_connection_manager",
              config: {
                codec_type: "auto",
                stat_prefix: "ingress_http",
                access_log: [
                  {
                    format: 'ACCESS [%START_TIME%] "%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% "%REQ(X-FORWARDED-FOR)%" "%REQ(USER-AGENT)%" "%REQ(X-REQUEST-ID)%" "%REQ(:AUTHORITY)%" "%UPSTREAM_HOST%"\n',
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
                          // Use a 10 minute timeout because downloading
                          // images for jupyter notebook can take a while
                          timeout_ms: 600000,
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
                          // Use a 10 minute timeout because downloading
                          // images for jupyter notebook can take a while
                          timeout_ms: 600000,
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
                          timeout_ms: 600000,
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
                    jwts: [
                      {
                        issuer: "https://cloud.google.com/iap",
                        audiences: "{{JWT_AUDIENCE}}",
                        jwks_uri: "https://www.gstatic.com/iap/verify/public_key-jwk",
                        jwks_uri_envoy_cluster: "iap_issuer",
                        jwt_headers: ["x-goog-iap-jwt-assertion"],
                      },
                    ],
                    bypass_jwt: [
                      {
                        http_method: "GET",
                        path_exact: "/healthz",
                      },
                      {
                        http_method: "GET",
                        path_exact: "/noiap/whoami",
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
        address: "tcp://0.0.0.0:" + envoyAdminPort,
        access_log_path: "/tmp/admin_access_log",
      },
      cluster_manager: {
        clusters: [
          {
            name: "cluster_healthz",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                // We just use the admin server for the health check
                url: "tcp://127.0.0.1:" + envoyAdminPort,
              },

            ],
          },
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
      statsd_udp_ip_address: "127.0.0.1:" + envoyStatsPort,
      stats_flush_interval_ms: 1000,
    },  // envoyConfig

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

    ingress(secretName, ipName, hostname):: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "envoy-ingress",
        namespace: namespace,
        annotations: {
          "kubernetes.io/tls-acme": "true",
          "ingress.kubernetes.io/ssl-redirect": "true",
          "kubernetes.io/ingress.global-static-ip-name": ipName,
        },
      },
      spec: {
        rules: [
          {
            [if hostname != "null" then "host"]: hostname,
            http: {
              paths: [
                {
                  backend: {
                    // Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
                    // Keep port the servicePort the same as the port we are targetting on the backend so that servicePort will be the same as targetPort for the purpose of
                    // health checking.
                    serviceName: "envoy",
                    servicePort: envoyPort,
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

    certificate(secretName, hostname, issuer):: {
      apiVersion: "certmanager.k8s.io/v1alpha1",
      kind: "Certificate",
      metadata: {
        name: secretName,
        namespace: namespace,
      },

      spec: {
        secretName: secretName,
        issuerRef: {
          name: issuer,
        },
        commonName: hostname,
        dnsNames: [
          hostname,
        ],
        acme: {
          config: [
            {
              http01: {
                ingress: "envoy-ingress",
              },
              domains: [
                hostname,
              ],
            },
          ],
        },
      },
    },  // certificate
  },  // parts
}
