import json
import os
from kubespawner.spawner import KubeSpawner
from jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator
from oauthenticator.github import GitHubOAuthenticator


class KubeFormSpawner(KubeSpawner):

    # relies on HTML5 for image datalist
    def _options_form_default(self):
        global registry, repoName
        return '''
    <label for='image'>Image</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input list="image" name="image" placeholder='repo/image:tag'>
    <datalist id="image">
      <option value="{0}/{1}/tensorflow-1.4.1-notebook-cpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.4.1-notebook-gpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.5.1-notebook-cpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.5.1-notebook-gpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.6.0-notebook-cpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.6.0-notebook-gpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.7.0-notebook-cpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.7.0-notebook-gpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.8.0-notebook-cpu:v0.2.0">
      <option value="{0}/{1}/tensorflow-1.8.0-notebook-gpu:v0.2.0">
    </datalist>
    <br/><br/>

    <label for='cpu_guarantee'>CPU</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input>
    <br/><br/>

    <label for='mem_guarantee'>Memory</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input>
    <br/><br/>

    <label for='extra_resource_limits'>Extra Resource Limits</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='extra_resource_limits' placeholder='{{&quot;nvidia.com/gpu&quot;: 3}}'></input>
    <br/><br/>
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
            image = 'registry.aliyuncs.com/kubeflow-images-public/tensorflow-notebook-cpu'
        else:
            image = 'gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-cpu:v0.2.0'
        if self.user_options.get('image'):
            image = self.user_options['image']
        return image

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
c.KubeSpawner.singleuser_image_spec = '{0}/{1}/tensorflow-notebook'.format(registry, repoName)

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
###################################################
# Persistent volume options
###################################################
# Using persistent storage requires a default storage class.
# TODO(jlewi): Verify this works on minikube.
# see https://github.com/kubeflow/kubeflow/pull/22#issuecomment-350500944
pvc_mount = os.environ.get('NOTEBOOK_PVC_MOUNT')
if pvc_mount and pvc_mount != 'null':
    c.KubeSpawner.user_storage_pvc_ensure = True
    # How much disk space do we want?
    c.KubeSpawner.user_storage_capacity = '10Gi'
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

# ###################################################
# ### Extra volumes for NVIDIA drivers (Azure)
# ###################################################
# # Temporary fix:
# # AKS / acs-engine doesn't yet use device plugin so we have to mount the drivers to use GPU
# # TODO(wbuchwalter): Remove once device plugin is merged
if cloud == 'aks' or cloud == 'acsengine':
    volumes.append({
        'name': 'nvidia',
        'hostPath': {
            'path': '/usr/local/nvidia'
        }
    })
    volume_mounts.append({
        'name': 'nvidia',
        'mountPath': '/usr/local/nvidia'
    })

c.KubeSpawner.volumes = volumes
c.KubeSpawner.volume_mounts = volume_mounts
