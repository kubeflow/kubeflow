{
  all(params):: [
    $.parts(params.namespace, params.kubefluxImage).service(params.kubefluxServiceType),
    $.parts(params.namespace, params.kubefluxImage).adminService,
    $.parts(params.namespace, params.kubefluxImage).role,
    $.parts(params.namespace, params.kubefluxImage).serviceAccount,
    $.parts(params.namespace, params.kubefluxImage).roleBinding,
    $.parts(params.namespace, params.kubefluxImage).deploy(params.StatsdImage),
    $.parts(params.namespace, params.kubefluxImage).k8sDashboard(params.cloud),
  ],


parts(namespace, kubefluxImage):: {
   service(serviceType):: {
  "apiVersion": "apps/v1beta1",
  "kind": "Deployment",
  "metadata": {
    "name": "flux"
  },
  "spec": {
    "replicas": 1,
    "strategy": {
      "type": "Recreate"
    },
    "template": {
      "metadata": {
        "labels": {
          "name": "flux"
        }
      },
      "spec": {
        "containers": [
          {
            "args": [
              "--ssh-keygen-dir=/var/fluxd/keygen",
              "--git-url=git@github.com:weaveworks/flux-example",
              "--git-branch=master"
            ],
            "image": "quay.io/weaveworks/flux:1.4.2",
            "imagePullPolicy": "IfNotPresent",
            "name": "flux",
            "ports": [
              {
                "containerPort": 3030
              }
            ],
            "volumeMounts": [
              {
                "mountPath": "/etc/fluxd/ssh",
                "name": "git-key",
                "readOnly": true
              },
              {
                "mountPath": "/var/fluxd/keygen",
                "name": "git-keygen"
              }
            ]
          }
        ],
        "serviceAccount": "flux",
        "volumes": [
          {
            "name": "git-key",
            "secret": {
              "defaultMode": 256,
              "secretName": "flux-git-deploy"
            }
          },
          {
            "emptyDir": {
              "medium": "Memory"
            },
            "name": "git-keygen"
          }
        ]
      }
    }
  }
},
}}
