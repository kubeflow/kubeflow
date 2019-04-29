package kustomize_test

import (
  "testing"
)

func writeIapIngress(th *KustTestHarness) {
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/backend-config.yaml", `
apiVersion: cloud.google.com/v1beta1
kind: BackendConfig
metadata:
  name: iap-backendconfig
spec:
  iap:
    enabled: true
    oauthclientCredentials:
      secretName: kubeflow-oauth
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/certificate.yaml", `
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: envoy-ingress-tls
spec:
  acme:
    config:
    - domains:
      - kubeflow.endpoints.constant-cubist-173123.cloud.goog
      http01:
        ingress: envoy-ingress
  commonName: kubeflow.endpoints.constant-cubist-173123.cloud.goog
  dnsNames:
  - kubeflow.endpoints.constant-cubist-173123.cloud.goog
  issuerRef:
    kind: ClusterIssuer
    name: letsencrypt-prod
  secretName: envoy-ingress-tls
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/cloud-endpoint.yaml", `
apiVersion: ctl.isla.solutions/v1
kind: CloudEndpoint
metadata:
  name: kubeflow
spec:
  project: constant-cubist-173123
  targetIngress:
    name: envoy-ingress
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: envoy
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: envoy
subjects:
- kind: ServiceAccount
  name: envoy
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: envoy
rules:
- apiGroups:
  - ""
  resources:
  - services
  - configmaps
  - secrets
  verbs:
  - get
  - list
  - patch
  - update
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - get
  - list
  - update
  - patch
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/config-map.yaml", `
---
apiVersion: v1
data:
  configure_envoy_for_iap.sh: |
    #!/usr/bin/env bash
    #
    # A script to modify envoy config to perform JWT validation
    # given the information for the service.
    # Script executed by the iap container to configure IAP. When finished, the envoy config is created with the JWT audience.

    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

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

    checkIAP() {
      # created by init container.
      . /var/shared/healthz.env

      # If node port or backend id change, so does the JWT audience.
      CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
      CURR_BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id)')
      [ "$BACKEND_ID" == "$CURR_BACKEND_ID" ]
    }

    # Activate the service account
    for i in $(seq 1 10); do
      gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10
    done

    # Print out the config for debugging
    gcloud config list

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    while [[ -z ${BACKEND_ID} ]]; do
      BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)')
      echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~k8s-be-${NODE_PORT}-..."
      sleep 2
    done
    echo BACKEND_ID=${BACKEND_ID}

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri)

    JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

    # For healthcheck compare.
    echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
    echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
    echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

    kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
      sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" >/var/shared/envoy-config.json

    echo "Restarting envoy"
    curl -s ${ENVOY_ADMIN}/quitquitquit

    # Verify IAP every 10 seconds.
    while true; do
      if ! checkIAP; then
        echo "$(date) WARN: IAP check failed, restarting container."
        exit 1
      fi
      sleep 10
    done
  envoy-config.json: |-
    {
        "admin": {
            "access_log_path": "/tmp/admin_access_log",
            "address": "tcp://0.0.0.0:8001"
        },
        "cluster_manager": {
            "clusters": [
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://127.0.0.1:8001"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_healthz",
                    "type": "strict_dns"
                },
                {
                    "circuit_breakers": {
                        "default": {
                            "max_pending_requests": 10000,
                            "max_requests": 10000
                        }
                    },
                    "connect_timeout_ms": 5000,
                    "hosts": [
                        {
                            "url": "tcp://www.gstatic.com:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "iap_issuer",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://whoami-app.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_iap_app",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://jupyter-lb.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_jupyter",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://tf-job-dashboard.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_tfjobs",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://istio-ingressgateway.istio-system:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_istiogateway",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://ambassador.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_ambassador",
                    "type": "strict_dns"
                }
            ]
        },
        "listeners": [
            {
                "address": "tcp://0.0.0.0:8080",
                "filters": [
                    {
                        "config": {
                            "access_log": [
                                {
                                    "format": "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                                    "path": "/dev/fd/1"
                                }
                            ],
                            "codec_type": "auto",
                            "filters": [
                                {
                                    "config": {
                                        "bypass_jwt": [
                                            {
                                                "http_method": "GET",
                                                "path_exact": "/healthz"
                                            },
                                            {
                                                "http_method": "GET",
                                                "path_exact": "/noiap/whoami"
                                            }
                                        ],
                                        "jwts": [
                                            {
                                                "audiences": "{{JWT_AUDIENCE}}",
                                                "issuer": "https://cloud.google.com/iap",
                                                "jwks_uri": "https://www.gstatic.com/iap/verify/public_key-jwk",
                                                "jwks_uri_envoy_cluster": "iap_issuer",
                                                "jwt_headers": [
                                                    "x-goog-iap-jwt-assertion"
                                                ]
                                            }
                                        ]
                                    },
                                    "name": "jwt-auth",
                                    "type": "decoder"
                                },
                                {
                                    "config": {

                                    },
                                    "name": "router",
                                    "type": "decoder"
                                }
                            ],
                            "route_config": {
                                "virtual_hosts": [
                                    {
                                        "domains": [
                                            "*"
                                        ],
                                        "name": "backend",
                                        "routes": [
                                            {
                                                "path": "/healthz",
                                                "prefix_rewrite": "/server_info",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_healthz",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/noiap/whoami",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_iap_app",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/whoami",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_iap_app",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/hub",
                                                "prefix_rewrite": "/hub",
                                                "timeout_ms": 600000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_jupyter",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/user",
                                                "prefix_rewrite": "/user",
                                                "timeout_ms": 600000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_jupyter",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/tfjobs",
                                                "prefix_rewrite": "/tfjobs",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_tfjobs",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/istio",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_istiogateway",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_ambassador",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            "stat_prefix": "ingress_http"
                        },
                        "name": "http_connection_manager",
                        "type": "read"
                    }
                ]
            }
        ],
        "stats_flush_interval_ms": 1000,
        "statsd_udp_ip_address": "127.0.0.1:8025"
    }
  setup_backend.sh: |
    #!/usr/bin/env bash
    #
    # A simple shell script to configure the backend timeouts and health checks by using gcloud.
    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1
    [ -z ${INGRESS_NAME} ] && echo Error INGRESS_NAME must be set && exit 1

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

    # Activate the service account
    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
    # Print out the config for debugging
    gcloud config list

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    echo "node port is ${NODE_PORT}"

    while [[ -z ${BACKEND_NAME} ]]; do
      BACKENDS=$(kubectl --namespace=${NAMESPACE} get ingress ${INGRESS_NAME} -o jsonpath='{.metadata.annotations.ingress\.kubernetes\.io/backends}')
      echo "fetching backends info with ${INGRESS_NAME}: ${BACKENDS}"
      BACKEND_NAME=$(echo $BACKENDS | grep -o "k8s-be-${NODE_PORT}--[0-9a-z]\+")
      echo "backend name is ${BACKEND_NAME}"
      sleep 2
    done

    while [[ -z ${BACKEND_ID} ]]; do
      BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~${BACKEND_NAME} --format='value(id)')
      echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~${BACKEND_NAME}"
      sleep 2
    done
    echo BACKEND_ID=${BACKEND_ID}

    JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

    # For healthcheck compare.
    mkdir -p /var/shared
    echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
    echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
    echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

    if [[ -z ${USE_ISTIO} ]]; then
      # TODO(https://github.com/kubeflow/kubeflow/issues/942): We should publish the modified envoy
      # config as a config map and use that in the envoy sidecars.
      kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
        sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/envoy-config.json
    else
      # Apply the jwt validation policy
      cat /var/envoy-config/jwt-policy-template.yaml | sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/jwt-policy.yaml
      kubectl apply -f /var/shared/jwt-policy.yaml
    fi

    echo "Clearing lock on service annotation"
    kubectl patch svc "${SERVICE}" -p "{\"metadata\": { \"annotations\": {\"backendlock\": \"\" }}}"

    checkBackend() {
      # created by init container.
      . /var/shared/healthz.env

      # If node port or backend id change, so does the JWT audience.
      CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
      read -ra toks <<<"$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id,timeoutSec)')"
      CURR_BACKEND_ID="${toks[0]}"
      CURR_BACKEND_TIMEOUT="${toks[1]}"
      [[ "$BACKEND_ID" == "$CURR_BACKEND_ID" && "${CURR_BACKEND_TIMEOUT}" -eq 3600 ]]
    }

    # Verify configuration every 10 seconds.
    while true; do
      if ! checkBackend; then
        echo "$(date) WARN: Backend check failed, restarting container."
        exit 1
      fi
      sleep 10
    done
  update_backend.sh: |
    #!/bin/bash
    #
    # A simple shell script to configure the backend timeouts and health checks by using gcloud.

    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

    PROJECT=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/project-id)
    if [ -z ${PROJECT} ]; then
      echo Error unable to fetch PROJECT from compute metadata
      exit 1
    fi

    # Activate the service account, allow 5 retries
    for i in {1..5}; do gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10; done

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    while [[ -z ${BACKEND_SERVICE} ]];
    do BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri);
    echo "Waiting for the backend-services resource PROJECT=${PROJECT} NODEPORT=${NODE_PORT} SERVICE=${SERVICE}...";
    sleep 2;
    done

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
    if [[ ${HEALTHCHECK_PATH} ]]; then
      gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=${HEALTHCHECK_PATH}
    else
      gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=/healthz
    fi

    if [[ ${USE_ISTIO} ]]; then
      # Create the route so healthcheck can pass
      kubectl apply -f /var/envoy-config/healthcheck_route.yaml
    fi

    # Since JupyterHub uses websockets we want to increase the backend timeout
    echo Increasing backend timeout for JupyterHub
    gcloud --project=${PROJECT} compute backend-services update --global ${BACKEND_SERVICE} --timeout=3600

    echo "Backend updated successfully. Waiting 1 hour before updating again."
    sleep 3600
kind: ConfigMap
metadata:
  name: envoy-config
---
apiVersion: v1
data:
  ingress_bootstrap.sh: |
    #!/usr/bin/env bash

    set -x
    set -e

    # This is a workaround until this is resolved: https://github.com/kubernetes/ingress-gce/pull/388
    # The long-term solution is to use a managed SSL certificate on GKE once the feature is GA.

    # The ingress is initially created without a tls spec.
    # Wait until cert-manager generates the certificate using the http-01 challenge on the GCLB ingress.
    # After the certificate is obtained, patch the ingress with the tls spec to enable SSL on the GCLB.

    # Wait for certificate.
    until kubectl -n ${NAMESPACE} get secret ${TLS_SECRET_NAME} 2>/dev/null; do
      echo "Waiting for certificate..."
      sleep 2
    done

    kubectl -n ${NAMESPACE} patch ingress ${INGRESS_NAME} --type='json' -p '[{"op": "add", "path": "/spec/tls", "value": [{"secretName": "'${TLS_SECRET_NAME}'", "hosts":["'${TLS_HOST_NAME}'"]}]}]'

    echo "Done"
kind: ConfigMap
metadata:
  name: ingress-bootstrap-config
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/deployment.yaml", `
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: envoy
spec:
  replicas: 3
  template:
    metadata:
      labels:
        service: envoy
    spec:
      containers:
      - command:
        - /usr/local/bin/envoy
        - -c
        - /etc/envoy/envoy-config.json
        - --log-level
        - info
        - --base-id
        - "27000"
        image: gcr.io/kubeflow-images-public/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738
        imagePullPolicy: Always
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 30
        name: envoy
        ports:
        - containerPort: 8080
        - containerPort: 8001
        - containerPort: 8025
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 30
        resources:
          limits:
            cpu: 1
            memory: 400Mi
          requests:
            cpu: 200m
            memory: 100Mi
        volumeMounts:
        - mountPath: /etc/envoy
          name: shared
      - command:
        - sh
        - /var/envoy-config/configure_envoy_for_iap.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: ENVOY_ADMIN
          value: http://localhost:8001
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: iap
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/shared/
          name: shared
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      restartPolicy: Always
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - emptyDir:
          medium: Memory
        name: shared
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: iap-enabler
spec:
  replicas: 1
  template:
    metadata:
      labels:
        service: iap-enabler
    spec:
      containers:
      - command:
        - bash
        - /var/envoy-config/setup_backend.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: INGRESS_NAME
          value: envoy-ingress
        - name: ENVOY_ADMIN
          value: http://localhost:8001
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: iap
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      restartPolicy: Always
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: whoami-app
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: whoami
    spec:
      containers:
      - env:
        - name: PORT
          value: "8081"
        image: gcr.io/cloud-solutions-group/esp-sample-app:1.0.0
        name: app
        ports:
        - containerPort: 8081
        readinessProbe:
          failureThreshold: 2
          httpGet:
            path: /healthz
            port: 8081
            scheme: HTTP
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 5
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/ingress.yaml", `
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    certmanager.k8s.io/issuer: letsencrypt-prod
    ingress.kubernetes.io/ssl-redirect: "true"
    kubernetes.io/ingress.global-static-ip-name: kubeflow-ip
    kubernetes.io/tls-acme: "true"
  name: envoy-ingress
spec:
  rules:
  - host: kubeflow.endpoints.constant-cubist-173123.cloud.goog
    http:
      paths:
      - backend:
          serviceName: envoy
          servicePort: 8080
        path: /*
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/job.yaml", `
apiVersion: batch/v1
kind: Job
metadata:
  name: ingress-bootstrap
spec:
  template:
    spec:
      containers:
      - command:
        - /var/ingress-config/ingress_bootstrap.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: TLS_SECRET_NAME
          value: envoy-ingress-tls
        - name: TLS_HOST_NAME
          value: kubeflow.endpoints.constant-cubist-173123.cloud.goog
        - name: INGRESS_NAME
          value: envoy-ingress
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: bootstrap
        volumeMounts:
        - mountPath: /var/ingress-config/
          name: ingress-config
      restartPolicy: OnFailure
      serviceAccountName: envoy
      volumes:
      - configMap:
          defaultMode: 493
          name: ingress-bootstrap-config
        name: ingress-config
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: envoy
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/service.yaml", `
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    beta.cloud.google.com/backend-config: '{"ports": {"envoy":"iap-backendconfig"}}'
  labels:
    service: envoy
  name: envoy
spec:
  ports:
  - name: envoy
    port: 8080
    targetPort: 8080
  selector:
    service: envoy
  type: NodePort
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: whoami
  name: whoami-app
spec:
  ports:
  - port: 80
    targetPort: 8081
  selector:
    app: whoami
  type: ClusterIP
`)
  th.writeF("/manifests/gcp/iap-ingress/overlays/gcp/stateful-set.yaml", `
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    service: backend-updater
  name: backend-updater
spec:
  serviceName: backend-updater
  selector:
    matchLabels:
      service: backend-updater
  template:
    metadata:
      labels:
        service: backend-updater
    spec:
      containers:
      - command:
        - bash
        - /var/envoy-config/update_backend.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: backend-updater
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
  # Workaround for https://github.com/kubernetes-sigs/kustomize/issues/677
  volumeClaimTemplates: []
`)
  th.writeK("/manifests/gcp/iap-ingress/overlays/gcp", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- backend-config.yaml
- certificate.yaml
- cloud-endpoint.yaml
- cluster-role-binding.yaml
- cluster-role.yaml
- config-map.yaml
- deployment.yaml
- ingress.yaml
- job.yaml
- service-account.yaml
- service.yaml
- stateful-set.yaml
commonLabels:
  kustomize.component: iap-ingress
images:
  - name: gcr.io/kubeflow-images-public/envoy
    newName: gcr.io/kubeflow-images-public/envoy
    newTag: v20180309-0fb4886b463698702b6a08955045731903a18738
  - name: gcr.io/kubeflow-images-public/ingress-setup
    newName: gcr.io/kubeflow-images-public/ingress-setup
    newTag: latest
  - name: gcr.io/cloud-solutions-group/esp-sample-app
    newName: gcr.io/cloud-solutions-group/esp-sample-app
    newTag: 1.0.0
`)
}

func TestIapIngress(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/gcp/iap-ingress/overlays/gcp")
  writeIapIngress(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy
rules:
- apiGroups:
  - ""
  resources:
  - services
  - configmaps
  - secrets
  verbs:
  - get
  - list
  - patch
  - update
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - get
  - list
  - update
  - patch
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: envoy
subjects:
- kind: ServiceAccount
  name: envoy
---
apiVersion: v1
data:
  configure_envoy_for_iap.sh: |
    #!/usr/bin/env bash
    #
    # A script to modify envoy config to perform JWT validation
    # given the information for the service.
    # Script executed by the iap container to configure IAP. When finished, the envoy config is created with the JWT audience.

    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

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

    checkIAP() {
      # created by init container.
      . /var/shared/healthz.env

      # If node port or backend id change, so does the JWT audience.
      CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
      CURR_BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id)')
      [ "$BACKEND_ID" == "$CURR_BACKEND_ID" ]
    }

    # Activate the service account
    for i in $(seq 1 10); do
      gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10
    done

    # Print out the config for debugging
    gcloud config list

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    while [[ -z ${BACKEND_ID} ]]; do
      BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)')
      echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~k8s-be-${NODE_PORT}-..."
      sleep 2
    done
    echo BACKEND_ID=${BACKEND_ID}

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri)

    JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

    # For healthcheck compare.
    echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
    echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
    echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

    kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
      sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" >/var/shared/envoy-config.json

    echo "Restarting envoy"
    curl -s ${ENVOY_ADMIN}/quitquitquit

    # Verify IAP every 10 seconds.
    while true; do
      if ! checkIAP; then
        echo "$(date) WARN: IAP check failed, restarting container."
        exit 1
      fi
      sleep 10
    done
  envoy-config.json: |-
    {
        "admin": {
            "access_log_path": "/tmp/admin_access_log",
            "address": "tcp://0.0.0.0:8001"
        },
        "cluster_manager": {
            "clusters": [
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://127.0.0.1:8001"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_healthz",
                    "type": "strict_dns"
                },
                {
                    "circuit_breakers": {
                        "default": {
                            "max_pending_requests": 10000,
                            "max_requests": 10000
                        }
                    },
                    "connect_timeout_ms": 5000,
                    "hosts": [
                        {
                            "url": "tcp://www.gstatic.com:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "iap_issuer",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://whoami-app.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_iap_app",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://jupyter-lb.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_jupyter",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://tf-job-dashboard.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_tfjobs",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://istio-ingressgateway.istio-system:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_istiogateway",
                    "type": "strict_dns"
                },
                {
                    "connect_timeout_ms": 3000,
                    "hosts": [
                        {
                            "url": "tcp://ambassador.kubeflow:80"
                        }
                    ],
                    "lb_type": "round_robin",
                    "name": "cluster_ambassador",
                    "type": "strict_dns"
                }
            ]
        },
        "listeners": [
            {
                "address": "tcp://0.0.0.0:8080",
                "filters": [
                    {
                        "config": {
                            "access_log": [
                                {
                                    "format": "ACCESS [%START_TIME%] \"%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%\" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% \"%REQ(X-FORWARDED-FOR)%\" \"%REQ(USER-AGENT)%\" \"%REQ(X-REQUEST-ID)%\" \"%REQ(:AUTHORITY)%\" \"%UPSTREAM_HOST%\"\n",
                                    "path": "/dev/fd/1"
                                }
                            ],
                            "codec_type": "auto",
                            "filters": [
                                {
                                    "config": {
                                        "bypass_jwt": [
                                            {
                                                "http_method": "GET",
                                                "path_exact": "/healthz"
                                            },
                                            {
                                                "http_method": "GET",
                                                "path_exact": "/noiap/whoami"
                                            }
                                        ],
                                        "jwts": [
                                            {
                                                "audiences": "{{JWT_AUDIENCE}}",
                                                "issuer": "https://cloud.google.com/iap",
                                                "jwks_uri": "https://www.gstatic.com/iap/verify/public_key-jwk",
                                                "jwks_uri_envoy_cluster": "iap_issuer",
                                                "jwt_headers": [
                                                    "x-goog-iap-jwt-assertion"
                                                ]
                                            }
                                        ]
                                    },
                                    "name": "jwt-auth",
                                    "type": "decoder"
                                },
                                {
                                    "config": {

                                    },
                                    "name": "router",
                                    "type": "decoder"
                                }
                            ],
                            "route_config": {
                                "virtual_hosts": [
                                    {
                                        "domains": [
                                            "*"
                                        ],
                                        "name": "backend",
                                        "routes": [
                                            {
                                                "path": "/healthz",
                                                "prefix_rewrite": "/server_info",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_healthz",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/noiap/whoami",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_iap_app",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/whoami",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_iap_app",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/hub",
                                                "prefix_rewrite": "/hub",
                                                "timeout_ms": 600000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_jupyter",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/user",
                                                "prefix_rewrite": "/user",
                                                "timeout_ms": 600000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_jupyter",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/tfjobs",
                                                "prefix_rewrite": "/tfjobs",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_tfjobs",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/istio",
                                                "timeout_ms": 10000,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_istiogateway",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "prefix": "/",
                                                "prefix_rewrite": "/",
                                                "timeout_ms": 10000,
                                                "use_websocket": true,
                                                "weighted_clusters": {
                                                    "clusters": [
                                                        {
                                                            "name": "cluster_ambassador",
                                                            "weight": 100
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            "stat_prefix": "ingress_http"
                        },
                        "name": "http_connection_manager",
                        "type": "read"
                    }
                ]
            }
        ],
        "stats_flush_interval_ms": 1000,
        "statsd_udp_ip_address": "127.0.0.1:8025"
    }
  setup_backend.sh: |
    #!/usr/bin/env bash
    #
    # A simple shell script to configure the backend timeouts and health checks by using gcloud.
    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1
    [ -z ${INGRESS_NAME} ] && echo Error INGRESS_NAME must be set && exit 1

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

    # Activate the service account
    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
    # Print out the config for debugging
    gcloud config list

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    echo "node port is ${NODE_PORT}"

    while [[ -z ${BACKEND_NAME} ]]; do
      BACKENDS=$(kubectl --namespace=${NAMESPACE} get ingress ${INGRESS_NAME} -o jsonpath='{.metadata.annotations.ingress\.kubernetes\.io/backends}')
      echo "fetching backends info with ${INGRESS_NAME}: ${BACKENDS}"
      BACKEND_NAME=$(echo $BACKENDS | grep -o "k8s-be-${NODE_PORT}--[0-9a-z]\+")
      echo "backend name is ${BACKEND_NAME}"
      sleep 2
    done

    while [[ -z ${BACKEND_ID} ]]; do
      BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~${BACKEND_NAME} --format='value(id)')
      echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~${BACKEND_NAME}"
      sleep 2
    done
    echo BACKEND_ID=${BACKEND_ID}

    JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

    # For healthcheck compare.
    mkdir -p /var/shared
    echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
    echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
    echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

    if [[ -z ${USE_ISTIO} ]]; then
      # TODO(https://github.com/kubeflow/kubeflow/issues/942): We should publish the modified envoy
      # config as a config map and use that in the envoy sidecars.
      kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
        sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/envoy-config.json
    else
      # Apply the jwt validation policy
      cat /var/envoy-config/jwt-policy-template.yaml | sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/jwt-policy.yaml
      kubectl apply -f /var/shared/jwt-policy.yaml
    fi

    echo "Clearing lock on service annotation"
    kubectl patch svc "${SERVICE}" -p "{\"metadata\": { \"annotations\": {\"backendlock\": \"\" }}}"

    checkBackend() {
      # created by init container.
      . /var/shared/healthz.env

      # If node port or backend id change, so does the JWT audience.
      CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
      read -ra toks <<<"$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id,timeoutSec)')"
      CURR_BACKEND_ID="${toks[0]}"
      CURR_BACKEND_TIMEOUT="${toks[1]}"
      [[ "$BACKEND_ID" == "$CURR_BACKEND_ID" && "${CURR_BACKEND_TIMEOUT}" -eq 3600 ]]
    }

    # Verify configuration every 10 seconds.
    while true; do
      if ! checkBackend; then
        echo "$(date) WARN: Backend check failed, restarting container."
        exit 1
      fi
      sleep 10
    done
  update_backend.sh: |
    #!/bin/bash
    #
    # A simple shell script to configure the backend timeouts and health checks by using gcloud.

    [ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
    [ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

    PROJECT=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/project-id)
    if [ -z ${PROJECT} ]; then
      echo Error unable to fetch PROJECT from compute metadata
      exit 1
    fi

    # Activate the service account, allow 5 retries
    for i in {1..5}; do gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10; done

    NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
    while [[ -z ${BACKEND_SERVICE} ]];
    do BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri);
    echo "Waiting for the backend-services resource PROJECT=${PROJECT} NODEPORT=${NODE_PORT} SERVICE=${SERVICE}...";
    sleep 2;
    done

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
    if [[ ${HEALTHCHECK_PATH} ]]; then
      gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=${HEALTHCHECK_PATH}
    else
      gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=/healthz
    fi

    if [[ ${USE_ISTIO} ]]; then
      # Create the route so healthcheck can pass
      kubectl apply -f /var/envoy-config/healthcheck_route.yaml
    fi

    # Since JupyterHub uses websockets we want to increase the backend timeout
    echo Increasing backend timeout for JupyterHub
    gcloud --project=${PROJECT} compute backend-services update --global ${BACKEND_SERVICE} --timeout=3600

    echo "Backend updated successfully. Waiting 1 hour before updating again."
    sleep 3600
kind: ConfigMap
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy-config
---
apiVersion: v1
data:
  ingress_bootstrap.sh: |
    #!/usr/bin/env bash

    set -x
    set -e

    # This is a workaround until this is resolved: https://github.com/kubernetes/ingress-gce/pull/388
    # The long-term solution is to use a managed SSL certificate on GKE once the feature is GA.

    # The ingress is initially created without a tls spec.
    # Wait until cert-manager generates the certificate using the http-01 challenge on the GCLB ingress.
    # After the certificate is obtained, patch the ingress with the tls spec to enable SSL on the GCLB.

    # Wait for certificate.
    until kubectl -n ${NAMESPACE} get secret ${TLS_SECRET_NAME} 2>/dev/null; do
      echo "Waiting for certificate..."
      sleep 2
    done

    kubectl -n ${NAMESPACE} patch ingress ${INGRESS_NAME} --type='json' -p '[{"op": "add", "path": "/spec/tls", "value": [{"secretName": "'${TLS_SECRET_NAME}'", "hosts":["'${TLS_HOST_NAME}'"]}]}]'

    echo "Done"
kind: ConfigMap
metadata:
  labels:
    kustomize.component: iap-ingress
  name: ingress-bootstrap-config
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    beta.cloud.google.com/backend-config: '{"ports": {"envoy":"iap-backendconfig"}}'
  labels:
    kustomize.component: iap-ingress
    service: envoy
  name: envoy
spec:
  ports:
  - name: envoy
    port: 8080
    targetPort: 8080
  selector:
    kustomize.component: iap-ingress
    service: envoy
  type: NodePort
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: whoami
    kustomize.component: iap-ingress
  name: whoami-app
spec:
  ports:
  - port: 80
    targetPort: 8081
  selector:
    app: whoami
    kustomize.component: iap-ingress
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy
spec:
  replicas: 3
  selector:
    matchLabels:
      kustomize.component: iap-ingress
  template:
    metadata:
      labels:
        kustomize.component: iap-ingress
        service: envoy
    spec:
      containers:
      - command:
        - /usr/local/bin/envoy
        - -c
        - /etc/envoy/envoy-config.json
        - --log-level
        - info
        - --base-id
        - "27000"
        image: gcr.io/kubeflow-images-public/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738
        imagePullPolicy: Always
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 30
        name: envoy
        ports:
        - containerPort: 8080
        - containerPort: 8001
        - containerPort: 8025
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 30
        resources:
          limits:
            cpu: 1
            memory: 400Mi
          requests:
            cpu: 200m
            memory: 100Mi
        volumeMounts:
        - mountPath: /etc/envoy
          name: shared
      - command:
        - sh
        - /var/envoy-config/configure_envoy_for_iap.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: ENVOY_ADMIN
          value: http://localhost:8001
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: iap
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/shared/
          name: shared
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      restartPolicy: Always
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - emptyDir:
          medium: Memory
        name: shared
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: iap-ingress
  name: iap-enabler
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: iap-ingress
  template:
    metadata:
      labels:
        kustomize.component: iap-ingress
        service: iap-enabler
    spec:
      containers:
      - command:
        - bash
        - /var/envoy-config/setup_backend.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: INGRESS_NAME
          value: envoy-ingress
        - name: ENVOY_ADMIN
          value: http://localhost:8001
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: iap
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      restartPolicy: Always
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: iap-ingress
  name: whoami-app
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: iap-ingress
  template:
    metadata:
      labels:
        app: whoami
        kustomize.component: iap-ingress
    spec:
      containers:
      - env:
        - name: PORT
          value: "8081"
        image: gcr.io/cloud-solutions-group/esp-sample-app:1.0.0
        name: app
        ports:
        - containerPort: 8081
        readinessProbe:
          failureThreshold: 2
          httpGet:
            path: /healthz
            port: 8081
            scheme: HTTP
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 5
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    kustomize.component: iap-ingress
    service: backend-updater
  name: backend-updater
spec:
  selector:
    matchLabels:
      kustomize.component: iap-ingress
      service: backend-updater
  serviceName: backend-updater
  template:
    metadata:
      labels:
        kustomize.component: iap-ingress
        service: backend-updater
    spec:
      containers:
      - command:
        - bash
        - /var/envoy-config/update_backend.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: SERVICE
          value: envoy
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: backend-updater
        volumeMounts:
        - mountPath: /var/envoy-config/
          name: config-volume
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      serviceAccountName: envoy
      volumes:
      - configMap:
          name: envoy-config
        name: config-volume
      - name: sa-key
        secret:
          secretName: admin-gcp-sa
  volumeClaimTemplates: []
---
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    kustomize.component: iap-ingress
  name: ingress-bootstrap
spec:
  template:
    metadata:
      labels:
        kustomize.component: iap-ingress
    spec:
      containers:
      - command:
        - /var/ingress-config/ingress_bootstrap.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        - name: TLS_SECRET_NAME
          value: envoy-ingress-tls
        - name: TLS_HOST_NAME
          value: kubeflow.endpoints.constant-cubist-173123.cloud.goog
        - name: INGRESS_NAME
          value: envoy-ingress
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: bootstrap
        volumeMounts:
        - mountPath: /var/ingress-config/
          name: ingress-config
      restartPolicy: OnFailure
      serviceAccountName: envoy
      volumes:
      - configMap:
          defaultMode: 493
          name: ingress-bootstrap-config
        name: ingress-config
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  labels:
    kustomize.component: iap-ingress
  name: envoy-ingress-tls
spec:
  acme:
    config:
    - domains:
      - kubeflow.endpoints.constant-cubist-173123.cloud.goog
      http01:
        ingress: envoy-ingress
  commonName: kubeflow.endpoints.constant-cubist-173123.cloud.goog
  dnsNames:
  - kubeflow.endpoints.constant-cubist-173123.cloud.goog
  issuerRef:
    kind: ClusterIssuer
    name: letsencrypt-prod
  secretName: envoy-ingress-tls
---
apiVersion: cloud.google.com/v1beta1
kind: BackendConfig
metadata:
  labels:
    kustomize.component: iap-ingress
  name: iap-backendconfig
spec:
  iap:
    enabled: true
    oauthclientCredentials:
      secretName: kubeflow-oauth
---
apiVersion: ctl.isla.solutions/v1
kind: CloudEndpoint
metadata:
  labels:
    kustomize.component: iap-ingress
  name: kubeflow
spec:
  project: constant-cubist-173123
  targetIngress:
    name: envoy-ingress
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    certmanager.k8s.io/issuer: letsencrypt-prod
    ingress.kubernetes.io/ssl-redirect: "true"
    kubernetes.io/ingress.global-static-ip-name: kubeflow-ip
    kubernetes.io/tls-acme: "true"
  labels:
    kustomize.component: iap-ingress
  name: envoy-ingress
spec:
  rules:
  - host: kubeflow.endpoints.constant-cubist-173123.cloud.goog
    http:
      paths:
      - backend:
          serviceName: envoy
          servicePort: 8080
        path: /*
`)
}
