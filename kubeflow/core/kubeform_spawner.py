import json
import os
import string
import escapism
from kubespawner.spawner import KubeSpawner
from jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator
from oauthenticator.github import GitHubOAuthenticator

SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'

class KubeFormSpawner(KubeSpawner):

    # relies on HTML5 for image datalist
    def _options_form_default(self):
        global registry, repoName
        return '''

    <table style="width: 100%;">
    <tr>
        <td style="width: 30%;"><label for='image'>Image</label></td>
        <td style="width: 70%;"><input value="" list="image" name="image" placeholder='repo/image:tag' style="width: 100%;">
        <datalist id="image">
          <option value="{0}/{1}/tensorflow-1.4.1-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.4.1-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.5.1-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.5.1-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.6.0-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.6.0-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.7.0-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.7.0-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.8.0-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.8.0-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.9.0-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.9.0-notebook-gpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.10.1-notebook-cpu:v0.3.0">
          <option value="{0}/{1}/tensorflow-1.10.1-notebook-gpu:v0.3.0">
        </datalist>
        </td>
    </tr>
    </table>
    <div style="text-align: center; padding: 10px;">
      <a id="toggle_advanced_options" style="margin: 20%; cursor: pointer; font-weight: bold;">Advanced</a>
    </div>
    <table id="advanced_fields" style="display: none; width: 100%; border-spacing: 0px 25px; border-collapse: separate;">
    <tr>
        <td><label for='cpu_guarantee'>CPU</label></td>
        <td><input style="width: 100%;" name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input></td>
    </tr>
    <tr>
        <td><label for='mem_guarantee'>Memory</label></td>
        <td><input style="width: 100%;" name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input></td>
    </tr>
    <tr>
        <td><label for='extra_resource_limits'>Extra Resource Limits</label></td>
        <td><input style="width: 100%;" name='extra_resource_limits' placeholder='{{&quot;nvidia.com/gpu&quot;: 3}}'></input></td>
    </tr>
    </table>

    <script type="text/javascript">
      $('#toggle_advanced_options').on('click', function(e){{
        $('#advanced_fields').toggle();
      }});
    </script>


        '''.format(registry, repoName)

    def options_from_form(self, formdata):
        options = {}
        options['image'] = formdata.get('image', [''])[0].strip()
        options['cpu_guarantee'] = formdata.get(
            'cpu_guarantee', [''])[0].strip()
        options['mem_guarantee'] = formdata.get(
            'mem_guarantee', [''])[0].strip()
        options['extra_resource_limits'] = formdata.get(
            'extra_resource_limits', [''])[0].strip()
        return options

    @property
    def singleuser_image_spec(self):
        global cloud
        if cloud == 'ack':
            image = 'registry.aliyuncs.com/kubeflow-images-public/tensorflow-notebook-cpu:v0.2.1'
        else:
            image = 'gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-cpu:v0.3.0'
        if self.user_options.get('image'):
            image = self.user_options['image']
        return image

    image_spec = singleuser_image_spec

    @property
    def cpu_guarantee(self):
        cpu = '500m'
        if self.user_options.get('cpu_guarantee'):
            cpu = self.user_options['cpu_guarantee']
        return cpu

    @property
    def mem_guarantee(self):
        mem = '1Gi'
        if self.user_options.get('mem_guarantee'):
            mem = self.user_options['mem_guarantee']
        return mem

    @property
    def extra_resource_limits(self):
        extra = ''
        if self.user_options.get('extra_resource_limits'):
            extra = json.loads(self.user_options['extra_resource_limits'])
        return extra

    def get_env(self):
        env = super(KubeFormSpawner, self).get_env()
        gcp_secret_name = os.environ.get('GCP_SECRET_NAME')
        if gcp_secret_name:
            env['GOOGLE_APPLICATION_CREDENTIALS'] = '{}/{}.json'.format(SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name)
        return env

    # TODO(kkasravi): add unit test
    def _parse_user_name(self, username):
        safe_chars = set(string.ascii_lowercase + string.digits)
        name = username.split(':')[-1]
        legacy = ''.join([s if s in safe_chars else '-' for s in name.lower()])
        safe = escapism.escape(name, safe=safe_chars, escape_char='-').lower()
        return legacy, safe, name

    def _expand_user_properties(self, template):
        # override KubeSpawner method to remove prefix accounts.google: for iap
        # and truncate to 63 characters

        # Set servername based on whether named-server initialised
        if self.name:
            servername = '-{}'.format(self.name)
        else:
            servername = ''

        legacy, safe, name = self._parse_user_name(self.user.name)
        rname = template.format(
            userid=self.user.id,
            username=safe,
            unescaped_username=name,
            legacy_escape_username=legacy,
            servername=servername
            )[:63]
        return rname


###################################################
# JupyterHub Options
###################################################
c.JupyterHub.ip = '0.0.0.0'
c.JupyterHub.hub_ip = '0.0.0.0'
# Don't try to cleanup servers on exit - since in general for k8s, we want
# the hub to be able to restart without losing user containers
c.JupyterHub.cleanup_servers = False
###################################################

###################################################
# Spawner Options
###################################################
cloud = os.environ.get('CLOUD_NAME')
registry = os.environ.get('REGISTRY')
repoName = os.environ.get('REPO_NAME')
c.JupyterHub.spawner_class = KubeFormSpawner
# Set both singleuser_image_spec and image_spec because
# singleuser_image_spec has been deprecated in a future release
c.KubeSpawner.singleuser_image_spec = '{0}/{1}/tensorflow-notebook'.format(registry, repoName)
c.KubeSpawner.image_spec = '{0}/{1}/tensorflow-notebook'.format(registry, repoName)

c.KubeSpawner.cmd = 'start-singleuser.sh'
c.KubeSpawner.args = ['--allow-root']
# gpu images are very large ~15GB. need a large timeout.
c.KubeSpawner.start_timeout = 60 * 30
# Increase timeout to 5 minutes to avoid HTTP 500 errors on JupyterHub
c.KubeSpawner.http_timeout = 60 * 5

# Volume setup
c.KubeSpawner.singleuser_uid = 1000
c.KubeSpawner.singleuser_fs_gid = 100
c.KubeSpawner.singleuser_working_dir = '/home/jovyan'
volumes = []
volume_mounts = []

# Allow environment vars to override uid and gid.
# This allows local host path mounts to be read/writable
env_uid = os.environ.get('NOTEBOOK_UID')
if env_uid:
    c.KubeSpawner.singleuser_uid = int(env_uid)
env_gid = os.environ.get('NOTEBOOK_GID')
if env_gid:
    c.KubeSpawner.singleuser_fs_gid = int(env_gid)
access_local_fs = os.environ.get('ACCESS_LOCAL_FS')
if access_local_fs == 'true':
    def modify_pod_hook(spawner, pod):
       pod.spec.containers[0].lifecycle = {
            'postStart' : {
               'exec' : {
                   'command' : ['ln', '-s', '/mnt/local-notebooks', '/home/jovyan/local-notebooks' ]
               }
            }
        }
       return pod
    c.KubeSpawner.modify_pod_hook = modify_pod_hook

###################################################
# Persistent volume options
###################################################
# Using persistent storage requires a default storage class.
# TODO(jlewi): Verify this works on minikube.
# see https://github.com/kubeflow/kubeflow/pull/22#issuecomment-350500944
pvc_mount = os.environ.get('NOTEBOOK_PVC_MOUNT')
if pvc_mount and pvc_mount != 'null':
    c.KubeSpawner.user_storage_pvc_ensure = True
    c.KubeSpawner.storage_pvc_ensure = True
    # How much disk space do we want?
    c.KubeSpawner.user_storage_capacity = '10Gi'
    c.KubeSpawner.storage_capacity = '10Gi'
    c.KubeSpawner.pvc_name_template = 'claim-{username}{servername}'
    volumes.append(
        {
            'name': 'volume-{username}{servername}',
            'persistentVolumeClaim': {
                'claimName': 'claim-{username}{servername}'
            }
        }
    )
    volume_mounts.append(
        {
            'mountPath': pvc_mount,
            'name': 'volume-{username}{servername}'
        }
    )

c.KubeSpawner.volumes = volumes
c.KubeSpawner.volume_mounts = volume_mounts
# Set both service_account and singleuser_service_account because
# singleuser_service_account has been deprecated in a future release
c.KubeSpawner.service_account = 'jupyter-notebook'
c.KubeSpawner.singleuser_service_account = 'jupyter-notebook'
# Authenticator
if os.environ.get('KF_AUTHENTICATOR') == 'iap':
    c.JupyterHub.authenticator_class ='jhub_remote_user_authenticator.remote_user_auth.RemoteUserAuthenticator'
    c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'
else:
    c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'

if os.environ.get('DEFAULT_JUPYTERLAB').lower() == 'true':
    c.KubeSpawner.default_url = '/lab'

# PVCs
pvcs = os.environ.get('KF_PVC_LIST')
if pvcs and pvcs != 'null':
    for pvc in pvcs.split(','):
        volumes.append({
            'name': pvc,
            'persistentVolumeClaim': {
                'claimName': pvc
            }
        })
        volume_mounts.append({
            'name': pvc,
            'mountPath': '/mnt/' + pvc
        })

gcp_secret_name = os.environ.get('GCP_SECRET_NAME')
if gcp_secret_name:
    volumes.append({
      'name': gcp_secret_name,
      'secret': {
        'secretName': gcp_secret_name,
      }
    })
    volume_mounts.append({
        'name': gcp_secret_name,
        'mountPath': SERVICE_ACCOUNT_SECRET_MOUNT
    })
