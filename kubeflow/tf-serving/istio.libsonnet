{
  sidecarContainer:: {
    args: [
      "proxy",
      "sidecar",
      "--configPath",
      "/etc/istio/proxy",
      "--binaryPath",
      "/usr/local/bin/envoy",
      "--serviceCluster",
      "inception",
      "--drainDuration",
      "45s",
      "--parentShutdownDuration",
      "1m0s",
      "--discoveryAddress",
      "istio-pilot.istio-system:8080",
      "--discoveryRefreshDelay",
      "1s",
      "--zipkinAddress",
      "zipkin.istio-system:9411",
      "--connectTimeout",
      "10s",
      "--statsdUdpAddress",
      "istio-mixer.istio-system:9125",
      "--proxyAdminPort",
      "15000",
      "--controlPlaneAuthPolicy",
      "NONE",
    ],  
    env: [
      {
        name: "POD_NAME",
        valueFrom: {
          fieldRef: {
            fieldPath: "metadata.name",
          },
        },
      },
      {
        name: "POD_NAMESPACE",
        valueFrom: {
          fieldRef: {
            fieldPath: "metadata.namespace",
          },
        },
      },
      {
        name: "INSTANCE_IP",
        valueFrom: {
          fieldRef: {
            fieldPath: "status.podIP",
          },
        },
      },
    ],
    image: "docker.io/istio/proxy:0.7.1",
    imagePullPolicy: "IfNotPresent",
    name: "istio-proxy",
    securityContext: {
      privileged: false,
      readOnlyRootFilesystem: true,
      runAsUser: 1337,
    },
    volumeMounts: [
      {
        mountPath: "/etc/istio/proxy",
        name: "istio-envoy",
      },
      {
        mountPath: "/etc/certs/",
        name: "istio-certs",
        readOnly: true,
      },
    ],
  },

  initContainerIstio:: {
    args: [
      "-p",
      "15001",
      "-u",
      "1337",
      "-i",
      "10.4.0.0/14,10.7.240.0/20",
    ],
    image: "docker.io/istio/proxy_init:0.7.1",
    imagePullPolicy: "IfNotPresent",
    name: "istio-init",
    securityContext: {
      capabilities: {
        add: ["NET_ADMIN",],
      }
    },
  },

  initContainerCoredump:: {
    args: [
      "-c",
      "sysctl -w kernel.core_pattern=/etc/istio/proxy/core.%e.%p.%t && ulimit -c unlimited",
    ],
    command: ["/bin/sh",],
    image: "alpine",
    imagePullPolicy: "IfNotPresent",
    name: "enable-core-dump",
    securityContext: {
      privileged: true
    },
  },
}