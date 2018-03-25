local jupyterhub = import "../jupyterhub.libsonnet";
local params = {
  namespace:: "test-kf-001",
  disks:: "disk01,disk02",
  jupyterHubAuthenticator:: null,
  jupyterHubServiceType:: "ClusterIP",
  jupyterHubImage: "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
};
std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubConfigMap(params.jupyterHubAuthenticator, params.disks), {
   "apiVersion": "v1",
   "data": {
      "jupyterhub_config.py": "import json\nimport os\nfrom kubespawner.spawner import KubeSpawner\nfrom jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator\nfrom oauthenticator.github import GitHubOAuthenticator\n\nclass KubeFormSpawner(KubeSpawner):\n\n  # relies on HTML5 for image datalist\n  def _options_form_default(self):\n    return '''\n    <label for='image'>Image</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n    <input list=\"image\" name=\"image\" placeholder='repo/image:tag'>\n    <datalist id=\"image\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.4.1-notebook-cpu\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.4.1-notebook-gpu\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.5.1-notebook-cpu\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.5.1-notebook-gpu\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.6.0-notebook-cpu\">\n      <option value=\"gcr.io/kubeflow-images-staging/tensorflow-1.6.0-notebook-gpu\">\n    </datalist>\n    <br/><br/>\n\n    <label for='cpu_guarantee'>CPU</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n    <input name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input>\n    <br/><br/>\n\n    <label for='mem_guarantee'>Memory</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n    <input name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input>\n    <br/><br/>\n\n    <label for='extra_resource_limits'>Extra Resource Limits</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n    <input name='extra_resource_limits' placeholder='{&apos;nvidia.com/gpu&apos;: &apos;3&apos;}'></input>\n    <br/><br/>\n    '''\n\n  def options_from_form(self, formdata):\n    options = {}\n    options['image'] = formdata.get('image', [''])[0].strip()\n    options['cpu_guarantee'] = formdata.get('cpu_guarantee', [''])[0].strip()\n    options['mem_guarantee'] = formdata.get('mem_guarantee', [''])[0].strip()\n    options['extra_resource_limits'] = formdata.get('extra_resource_limits', [''])[0].strip()\n    return options\n\n  @property\n  def singleuser_image_spec(self):\n    image = 'gcr.io/kubeflow/tensorflow-notebook-cpu'\n    if self.user_options.get('image'):\n      image = self.user_options['image']\n    return image\n\n  @property\n  def cpu_guarantee(self):\n    cpu = '500m'\n    if self.user_options.get('cpu_guarantee'):\n      cpu = self.user_options['cpu_guarantee']\n    return cpu\n\n  @property\n  def mem_guarantee(self):\n    mem = '1Gi'\n    if self.user_options.get('mem_guarantee'):\n      mem = self.user_options['mem_guarantee']\n    return mem\n\n  @property\n  def extra_resource_limits(self):\n    extra = ''\n    if self.user_options.get('extra_resource_limits'):\n      extra = json.loads(self.user_options['extra_resource_limits'])\n    return extra\n\n###################################################\n### JupyterHub Options\n###################################################\nc.JupyterHub.ip = '0.0.0.0'\nc.JupyterHub.hub_ip = '0.0.0.0'\n# Don't try to cleanup servers on exit - since in general for k8s, we want\n# the hub to be able to restart without losing user containers\nc.JupyterHub.cleanup_servers = False\n###################################################\n\n###################################################\n### Spawner Options\n###################################################\nc.JupyterHub.spawner_class = KubeFormSpawner\nc.KubeSpawner.singleuser_image_spec = 'gcr.io/kubeflow/tensorflow-notebook'\nc.KubeSpawner.cmd = 'start-singleuser.sh'\nc.KubeSpawner.args = ['--allow-root']\n# gpu images are very large ~15GB. need a large timeout.\nc.KubeSpawner.start_timeout = 60 * 30\n\n###################################################\n### Persistent volume options\n###################################################\n# Using persistent storage requires a default storage class.\n# TODO(jlewi): Verify this works on minikube.\n# TODO(jlewi): Should we set c.KubeSpawner.singleuser_fs_gid = 1000\n# see https://github.com/kubeflow/kubeflow/pull/22#issuecomment-350500944\nc.KubeSpawner.user_storage_pvc_ensure = True\n# How much disk space do we want?\nc.KubeSpawner.user_storage_capacity = '10Gi'\nc.KubeSpawner.pvc_name_template = 'claim-{username}{servername}'\nc.KubeSpawner.volumes = [\n  {\n    'name': 'volume-{username}{servername}',\n    'persistentVolumeClaim': {\n      'claimName': 'claim-{username}{servername}'\n    }\n  }\n]\nc.KubeSpawner.volume_mounts = [\n  {\n    'mountPath': '/home/jovyan/work',\n    'name': 'volume-{username}{servername}'\n  }\n]\n\n######## Authenticator ######\nc.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'\n###### Volumes #######\nc.KubeSpawner.volumes = [{\"name\": \"disk01\", \"persistentVolumeClaim\": {\"claimName\": \"disk01\"}}, {\"name\": \"disk02\", \"persistentVolumeClaim\": {\"claimName\": \"disk02\"}}]\nc.KubeSpawner.volume_mounts = [{\"mountPath\": \"/mnt/disk01\", \"name\": \"disk01\"}, {\"mountPath\": \"/mnt/disk02\", \"name\": \"disk02\"}]"
   },
   "kind": "ConfigMap",
   "metadata": {
      "name": "jupyterhub-config",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubService,
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "app": "tf-hub"
      },
      "name": "tf-hub-0",
      "namespace": "test-kf-001"
   },
   "spec": {
      "clusterIP": "None",
      "ports": [
         {
            "name": "hub",
            "port": 8000
         }
      ],
      "selector": {
         "app": "tf-hub"
      }
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubLoadBalancer(params.jupyterHubServiceType),
{
   "apiVersion": "v1",
   "kind": "Service",
   "metadata": {
      "labels": {
         "app": "tf-hub-lb"
      },
      "name": "tf-hub-lb",
      "namespace": "test-kf-001"
   },
   "spec": {
      "ports": [
         {
            "name": "hub",
            "port": 80,
            "targetPort": 8000
         }
      ],
      "selector": {
         "app": "tf-hub"
      },
      "type": "ClusterIP"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHub(params.jupyterHubImage),
{
   "apiVersion": "apps/v1beta1",
   "kind": "StatefulSet",
   "metadata": {
      "name": "tf-hub",
      "namespace": "test-kf-001"
   },
   "spec": {
      "replicas": 1,
      "serviceName": "",
      "template": {
         "metadata": {
            "labels": {
               "app": "tf-hub"
            }
         },
         "spec": {
            "containers": [
               {
                  "command": [
                     "jupyterhub",
                     "-f",
                     "/etc/config/jupyterhub_config.py"
                  ],
                  "image": "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
                  "name": "tf-hub",
                  "ports": [
                     {
                        "containerPort": 8000
                     },
                     {
                        "containerPort": 8081
                     }
                  ],
                  "volumeMounts": [
                     {
                        "mountPath": "/etc/config",
                        "name": "config-volume"
                     }
                  ]
               }
            ],
            "serviceAccountName": "jupyter-hub",
            "volumes": [
               {
                  "configMap": {
                     "name": "jupyterhub-config"
                  },
                  "name": "config-volume"
               }
            ]
         }
      },
      "updateStrategy": {
         "type": "RollingUpdate"
      }
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRole,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "Role",
   "metadata": {
      "name": "jupyter-role",
      "namespace": "test-kf-001"
   },
   "rules": [
      {
         "apiGroups": [
            "*"
         ],
         "resources": [
            "*"
         ],
         "verbs": [
            "*"
         ]
      }
   ]
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubServiceAccount,
{
   "apiVersion": "v1",
   "kind": "ServiceAccount",
   "metadata": {
      "labels": {
         "app": "jupyter-hub"
      },
      "name": "jupyter-hub",
      "namespace": "test-kf-001"
   }
}) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRoleBinding,
{
   "apiVersion": "rbac.authorization.k8s.io/v1beta1",
   "kind": "RoleBinding",
   "metadata": {
      "name": "jupyter-role",
      "namespace": "test-kf-001"
   },
   "roleRef": {
      "apiGroup": "rbac.authorization.k8s.io",
      "kind": "Role",
      "name": "jupyter-role"
   },
   "subjects": [
      {
         "kind": "ServiceAccount",
         "name": "jupyter-hub",
         "namespace": "test-kf-001"
      }
   ]
})
