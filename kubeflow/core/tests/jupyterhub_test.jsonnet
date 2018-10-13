local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";

local params = {
  name: "jupyterhub",
  cloud: "gke",
  serviceType: "ClusterIP",
  disks: "null",
  gcpSecretName: "user-gcp-sa",
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  jupyterHubAuthenticator: "iap",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
};
local env = {
  namespace: "foo",
};

local instance = jupyterhub.new(env, params);

std.assertEqual(
  instance.parts.kubeSpawnerConfig,
  {
    apiVersion: "v1",
    data: {
      "jupyterhub_config.py": "import json\nimport os\nimport string\nimport escapism\nfrom kubespawner.spawner import KubeSpawner\nfrom jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator\nfrom oauthenticator.github import GitHubOAuthenticator\n\nSERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'\n\nclass KubeFormSpawner(KubeSpawner):\n\n    # relies on HTML5 for image datalist\n    def _options_form_default(self):\n        global registry, repoName\n        return '''\n\n    <table style=\"width: 100%;\">\n    <tr>\n        <td style=\"width: 30%;\"><label for='image'>Image</label></td>\n        <td style=\"width: 70%;\"><input value=\"\" list=\"image\" name=\"image\" placeholder='repo/image:tag' style=\"width: 100%;\">\n        <datalist id=\"image\">\n          <option value=\"{0}/{1}/tensorflow-1.4.1-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.4.1-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.5.1-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.5.1-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.6.0-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.6.0-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.7.0-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.7.0-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.8.0-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.8.0-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.9.0-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.9.0-notebook-gpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.10.1-notebook-cpu:v0.3.0\">\n          <option value=\"{0}/{1}/tensorflow-1.10.1-notebook-gpu:v0.3.0\">\n        </datalist>\n        </td>\n    </tr>\n    </table>\n    <div style=\"text-align: center; padding: 10px;\">\n      <a id=\"toggle_advanced_options\" style=\"margin: 20%; cursor: pointer; font-weight: bold;\">Advanced</a>\n    </div>\n    <table id=\"advanced_fields\" style=\"display: none; width: 100%; border-spacing: 0px 25px; border-collapse: separate;\">\n    <tr>\n        <td><label for='cpu_guarantee'>CPU</label></td>\n        <td><input style=\"width: 100%;\" name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input></td>\n    </tr>\n    <tr>\n        <td><label for='mem_guarantee'>Memory</label></td>\n        <td><input style=\"width: 100%;\" name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input></td>\n    </tr>\n    <tr>\n        <td><label for='extra_resource_limits'>Extra Resource Limits</label></td>\n        <td><input style=\"width: 100%;\" name='extra_resource_limits' placeholder='{{&quot;nvidia.com/gpu&quot;: 3}}'></input></td>\n    </tr>\n    </table>\n\n    <script type=\"text/javascript\">\n      $('#toggle_advanced_options').on('click', function(e){{\n        $('#advanced_fields').toggle();\n      }});\n    </script>\n\n\n        '''.format(registry, repoName)\n\n    def options_from_form(self, formdata):\n        options = {}\n        options['image'] = formdata.get('image', [''])[0].strip()\n        options['cpu_guarantee'] = formdata.get(\n            'cpu_guarantee', [''])[0].strip()\n        options['mem_guarantee'] = formdata.get(\n            'mem_guarantee', [''])[0].strip()\n        options['extra_resource_limits'] = formdata.get(\n            'extra_resource_limits', [''])[0].strip()\n        return options\n\n    @property\n    def singleuser_image_spec(self):\n        global cloud\n        if cloud == 'ack':\n            image = 'registry.aliyuncs.com/kubeflow-images-public/tensorflow-notebook-cpu:v0.2.1'\n        else:\n            image = 'gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-cpu:v0.3.0'\n        if self.user_options.get('image'):\n            image = self.user_options['image']\n        return image\n\n    image_spec = singleuser_image_spec\n\n    @property\n    def cpu_guarantee(self):\n        cpu = '500m'\n        if self.user_options.get('cpu_guarantee'):\n            cpu = self.user_options['cpu_guarantee']\n        return cpu\n\n    @property\n    def mem_guarantee(self):\n        mem = '1Gi'\n        if self.user_options.get('mem_guarantee'):\n            mem = self.user_options['mem_guarantee']\n        return mem\n\n    @property\n    def extra_resource_limits(self):\n        extra = ''\n        if self.user_options.get('extra_resource_limits'):\n            extra = json.loads(self.user_options['extra_resource_limits'])\n        return extra\n\n    def get_env(self):\n        env = super(KubeFormSpawner, self).get_env()\n        gcp_secret_name = os.environ.get('GCP_SECRET_NAME')\n        if gcp_secret_name:\n            env['GOOGLE_APPLICATION_CREDENTIALS'] = '{}/{}.json'.format(SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name)\n        return env\n\n    # TODO(kkasravi): add unit test\n    def _parse_user_name(self, username):\n        safe_chars = set(string.ascii_lowercase + string.digits)\n        name = username.split(':')[-1]\n        legacy = ''.join([s if s in safe_chars else '-' for s in name.lower()])\n        safe = escapism.escape(name, safe=safe_chars, escape_char='-').lower()\n        return legacy, safe, name\n\n    def _expand_user_properties(self, template):\n        # override KubeSpawner method to remove prefix accounts.google: for iap\n        # and truncate to 63 characters\n\n        # Set servername based on whether named-server initialised\n        if self.name:\n            servername = '-{}'.format(self.name)\n        else:\n            servername = ''\n\n        legacy, safe, name = self._parse_user_name(self.user.name)\n        rname = template.format(\n            userid=self.user.id,\n            username=safe,\n            unescaped_username=name,\n            legacy_escape_username=legacy,\n            servername=servername\n            )[:63]\n        return rname\n\n\n###################################################\n# JupyterHub Options\n###################################################\nc.JupyterHub.ip = '0.0.0.0'\nc.JupyterHub.hub_ip = '0.0.0.0'\n# Don't try to cleanup servers on exit - since in general for k8s, we want\n# the hub to be able to restart without losing user containers\nc.JupyterHub.cleanup_servers = False\n###################################################\n\n###################################################\n# Spawner Options\n###################################################\ncloud = os.environ.get('CLOUD_NAME')\nregistry = os.environ.get('REGISTRY')\nrepoName = os.environ.get('REPO_NAME')\nc.JupyterHub.spawner_class = KubeFormSpawner\n# Set both singleuser_image_spec and image_spec because\n# singleuser_image_spec has been deprecated in a future release\nc.KubeSpawner.singleuser_image_spec = '{0}/{1}/tensorflow-notebook'.format(registry, repoName)\nc.KubeSpawner.image_spec = '{0}/{1}/tensorflow-notebook'.format(registry, repoName)\n\nc.KubeSpawner.cmd = 'start-singleuser.sh'\nc.KubeSpawner.args = ['--allow-root']\n# gpu images are very large ~15GB. need a large timeout.\nc.KubeSpawner.start_timeout = 60 * 30\n# Increase timeout to 5 minutes to avoid HTTP 500 errors on JupyterHub\nc.KubeSpawner.http_timeout = 60 * 5\n\n# Volume setup\nc.KubeSpawner.singleuser_uid = 1000\nc.KubeSpawner.singleuser_fs_gid = 100\nc.KubeSpawner.singleuser_working_dir = '/home/jovyan'\nvolumes = []\nvolume_mounts = []\n\n# Allow environment vars to override uid and gid.\n# This allows local host path mounts to be read/writable\nenv_uid = os.environ.get('NOTEBOOK_UID')\nif env_uid:\n    c.KubeSpawner.singleuser_uid = int(env_uid)\nenv_gid = os.environ.get('NOTEBOOK_GID')\nif env_gid:\n    c.KubeSpawner.singleuser_fs_gid = int(env_gid)\naccess_local_fs = os.environ.get('ACCESS_LOCAL_FS')\nif access_local_fs == 'true':\n    def modify_pod_hook(spawner, pod):\n       pod.spec.containers[0].lifecycle = {\n            'postStart' : {\n               'exec' : {\n                   'command' : ['ln', '-s', '/mnt/local-notebooks', '/home/jovyan/local-notebooks' ]\n               }\n            }\n        }\n       return pod\n    c.KubeSpawner.modify_pod_hook = modify_pod_hook\n\n###################################################\n# Persistent volume options\n###################################################\n# Using persistent storage requires a default storage class.\n# TODO(jlewi): Verify this works on minikube.\n# see https://github.com/kubeflow/kubeflow/pull/22#issuecomment-350500944\npvc_mount = os.environ.get('NOTEBOOK_PVC_MOUNT')\nif pvc_mount and pvc_mount != 'null':\n    c.KubeSpawner.user_storage_pvc_ensure = True\n    c.KubeSpawner.storage_pvc_ensure = True\n    # How much disk space do we want?\n    c.KubeSpawner.user_storage_capacity = '10Gi'\n    c.KubeSpawner.storage_capacity = '10Gi'\n    c.KubeSpawner.pvc_name_template = 'claim-{username}{servername}'\n    volumes.append(\n        {\n            'name': 'volume-{username}{servername}',\n            'persistentVolumeClaim': {\n                'claimName': 'claim-{username}{servername}'\n            }\n        }\n    )\n    volume_mounts.append(\n        {\n            'mountPath': pvc_mount,\n            'name': 'volume-{username}{servername}'\n        }\n    )\n\nc.KubeSpawner.volumes = volumes\nc.KubeSpawner.volume_mounts = volume_mounts\n# Set both service_account and singleuser_service_account because\n# singleuser_service_account has been deprecated in a future release\nc.KubeSpawner.service_account = 'jupyter-notebook'\nc.KubeSpawner.singleuser_service_account = 'jupyter-notebook'\n# Authenticator\nif os.environ.get('KF_AUTHENTICATOR') == 'iap':\n    c.JupyterHub.authenticator_class ='jhub_remote_user_authenticator.remote_user_auth.RemoteUserAuthenticator'\n    c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'\nelse:\n    c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'\n\nif os.environ.get('DEFAULT_JUPYTERLAB').lower() == 'true':\n    c.KubeSpawner.default_url = '/lab'\n\n# PVCs\npvcs = os.environ.get('KF_PVC_LIST')\nif pvcs and pvcs != 'null':\n    for pvc in pvcs.split(','):\n        volumes.append({\n            'name': pvc,\n            'persistentVolumeClaim': {\n                'claimName': pvc\n            }\n        })\n        volume_mounts.append({\n            'name': pvc,\n            'mountPath': '/mnt/' + pvc\n        })\n\ngcp_secret_name = os.environ.get('GCP_SECRET_NAME')\nif gcp_secret_name:\n    volumes.append({\n      'name': gcp_secret_name,\n      'secret': {\n        'secretName': gcp_secret_name,\n      }\n    })\n    volume_mounts.append({\n        'name': gcp_secret_name,\n        'mountPath': SERVICE_ACCOUNT_SECRET_MOUNT\n    })\n",
    },
    kind: "ConfigMap",
    metadata: {
      name: "jupyterhub-config",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.notebookService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "prometheus.io/scrape": "true",
      },
      labels: {
        app: "jupyterhub",
      },
      name: "jupyterhub-0",
      namespace: "foo",
    },
    spec: {
      clusterIP: "None",
      ports: [
        {
          name: "hub",
          port: 8000,
        },
      ],
      selector: {
        app: "jupyterhub",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.hubStatefulSet,
  {
    apiVersion: "apps/v1beta1",
    kind: "StatefulSet",
    metadata: {
      name: "jupyterhub",
      namespace: "foo",
    },
    spec: {
      replicas: 1,
      serviceName: "",
      template: {
        metadata: {
          labels: {
            app: "jupyterhub",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "jupyterhub",
                "-f",
                "/etc/config/jupyterhub_config.py",
              ],
              env: [
                {
                  name: "NOTEBOOK_PVC_MOUNT",
                  value: "/home/jovyan",
                },
                {
                  name: "CLOUD_NAME",
                  value: "gke",
                },
                {
                  name: "REGISTRY",
                  value: "gcr.io",
                },
                {
                  name: "REPO_NAME",
                  value: "kubeflow-images-public",
                },
                {
                  name: "KF_AUTHENTICATOR",
                  value: "iap",
                },
                {
                  name: "DEFAULT_JUPYTERLAB",
                  value: true,
                },
                {
                  name: "KF_PVC_LIST",
                  value: "null",
                },
                {
                  name: "GCP_SECRET_NAME",
                  value: "user-gcp-sa",
                },
              ],
              image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
              name: "jupyterhub",
              ports: [
                {
                  containerPort: 8000,
                },
                {
                  containerPort: 8081,
                },
              ],
              volumeMounts: [
                {
                  mountPath: "/etc/config",
                  name: "config-volume",
                },
              ],
            },
          ],
          serviceAccountName: "jupyterhub",
          volumes: [
            {
              configMap: {
                name: "jupyterhub-config",
              },
              name: "config-volume",
            },
          ],
        },
      },
      updateStrategy: {
        type: "RollingUpdate",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.hubRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-role",
      namespace: "foo",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "pods",
          "persistentvolumeclaims",
        ],
        verbs: [
          "get",
          "watch",
          "list",
          "create",
          "delete",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "events",
        ],
        verbs: [
          "get",
          "watch",
          "list",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.notebookRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: "foo",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "pods",
          "services",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "",
          "apps",
          "extensions",
        ],
        resources: [
          "deployments",
          "replicasets",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "kubeflow.org",
        ],
        resources: [
          "*",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "batch",
        ],
        resources: [
          "jobs",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.hubService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyterhub-lb-hub-mapping\nprefix: /hub/\nrewrite: /hub/\ntimeout_ms: 300000\nservice: jupyterhub-lb.foo\nuse_websocket: true\n---\napiVersion: ambassador/v0\nkind:  Mapping\nname: jupyterhub-lb-user-mapping\nprefix: /user/\nrewrite: /user/\ntimeout_ms: 300000\nservice: jupyterhub-lb.foo\nuse_websocket: true",
      },
      labels: {
        app: "jupyterhub-lb",
      },
      name: "jupyterhub-lb",
      namespace: "foo",
    },
    spec: {
      ports: [
        {
          name: "hub",
          port: 80,
          targetPort: 8000,
        },
      ],
      selector: {
        app: "jupyterhub",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.hubServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "jupyterhub",
      },
      name: "jupyterhub",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.notebookServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "jupyter-notebook",
      namespace: "foo",
    },
  }
) &&

std.assertEqual(
  instance.parts.hubRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-role",
      namespace: "foo",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "jupyter-role",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "jupyterhub",
        namespace: "foo",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.notebookRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "jupyter-notebook-role",
      namespace: "foo",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "jupyter-notebook-role",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "jupyter-notebook",
        namespace: "foo",
      },
    ],
  }
)
