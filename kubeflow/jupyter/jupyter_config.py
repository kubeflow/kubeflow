# -*- coding: utf-8 -*-
"""
Configuration file for JupyterHub.

Kubeflow uses this file as the configuration file for JupyterHub. It contains
all glue code necessary to integrate JupyterHub with the remaining Kubeflow
components.

Note that this file is also responsible for importing the UI-specific Spawner
class from <ui-dir>/spawner.py, and setting the `spawner_class` configuration
option.
"""

import os
from importlib.util import spec_from_file_location, module_from_spec
from jhub_remote_user_authenticator.remote_user_auth import \
    RemoteUserAuthenticator

SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'

# Import the UI-specific Spawner
spec = spec_from_file_location('spawner', '/etc/config/spawner.py')
spawner = module_from_spec(spec)
spec.loader.exec_module(spawner)

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
c.JupyterHub.spawner_class = spawner.KubeFormSpawner

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
        'postStart': {
            'exec': {
                'command': [
                    'ln', '-s', '/mnt/local-notebooks',
                    '/home/jovyan/local-notebooks'
                ]
            }
        }
    }
    return pod

  c.KubeSpawner.modify_pod_hook = modify_pod_hook

###################################################
# Persistent volume options
###################################################

# Set user_storage_pvc_ensure to False to prevent KubeSpawner from handling PVCs
# We natively handle PVCs via KubeFormSpawner and its dedicated methods

# NOTE: user_storage_pvc_ensure has been deprecated in a future release
c.KubeSpawner.storage_pvc_ensure = False
c.KubeSpawner.user_storage_pvc_ensure = False

volumes = []
volume_mounts = []

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

c.KubeSpawner.volumes = volumes
c.KubeSpawner.volume_mounts = volume_mounts

storage_class = None
if os.environ.get('STORAGE_CLASS') != 'null':
  storage_class = os.environ.get('STORAGE_CLASS')

rok_secret_name = ''
if os.environ.get('ROK_SECRET_NAME') != 'null':
  rok_secret_name = os.environ.get('ROK_SECRET_NAME')

# Set both service_account and singleuser_service_account because
# singleuser_service_account has been deprecated in a future release
c.KubeSpawner.service_account = 'jupyter-notebook'
c.KubeSpawner.singleuser_service_account = 'jupyter-notebook'
# Authenticator
if os.environ.get('KF_AUTHENTICATOR') == 'iap':
  c.JupyterHub.authenticator_class = RemoteUserAuthenticator
  c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'
else:
  c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'

if os.environ.get('DEFAULT_JUPYTERLAB').lower() == 'true':
  c.KubeSpawner.default_url = '/lab'

# Set extra spawner configuration variables
c.KubeSpawner.extra_spawner_config = {
    'gcp_secret_name': gcp_secret_name,
    'storage_class': storage_class,
    'rok_secret_name': rok_secret_name,
}
