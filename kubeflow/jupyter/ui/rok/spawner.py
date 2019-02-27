# -*- coding: utf-8 -*-
import base64
from tornado import gen
from jinja2 import FileSystemLoader, Environment
from kubernetes.client.rest import ApiException
from kubernetes.client.models import V1DeleteOptions
from importlib.util import spec_from_file_location, module_from_spec

# Import the default KubeFormSpawner as a Python module
# Our custom spawner extends the default one, but shares the same class name
spec = spec_from_file_location('spawner', '/etc/config/default_spawner.py')
spawner = module_from_spec(spec)
spec.loader.exec_module(spawner)

ROK_SECRET_MOUNT = '/var/run/secrets/rok'


class KubeFormSpawner(spawner.KubeFormSpawner):
  """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

  def options_form(self, form):
    # Create Jinja environment to dynamically load templates
    j2_env = Environment(loader=FileSystemLoader('/etc/config'))

    form_defaults = None
    if self.spawner_ui_config is not None:
      # YAML exists and was parsed successfully
      if self.spawner_ui_config['spawnerFormDefaults'] is not None:
        form_defaults = self.spawner_ui_config['spawnerFormDefaults']
      else:
        form_defaults = {}

    secret_name = self._expand_user_properties(
        self.extra_spawner_config['rok_secret_name'])

    rok_token = self._get_rok_token(name=secret_name, namespace=self.namespace)

    # Return the rendered template as a unicode string
    return j2_env.get_template('template.html').render(
        form_defaults=form_defaults,
        rok_token=rok_token,
        username=self._expand_user_properties('{username}'),
        namespace=self.namespace)

  def options_from_form(self, formdata):
    options = {}
    if self.spawner_ui_config is not None:
      form_defaults = self.spawner_ui_config['spawnerFormDefaults']

    # Manage Image
    image_readonly = False
    if self._default_config_contains('image'):
      options['image'] = form_defaults['image']['value']
      image_readonly = form_defaults['image'].get('readOnly', False)
    if ('image' in formdata and formdata['image'][0]):
      image_from_form = formdata['image'][0].strip()
      if image_readonly:
        # Provided image must be standard
        if image_from_form in form_defaults['image']['options']:
          options['image'] = image_from_form
      else:
        # Provided image can be standard or custom
        options['image'] = image_from_form

    # Manage CPU
    cpu_readonly = False
    if self._default_config_contains('cpu'):
      options['cpu'] = form_defaults['cpu']['value']
      cpu_readonly = form_defaults['cpu'].get('readOnly', False)
    if (not cpu_readonly and 'cpu' in formdata and formdata['cpu'][0]):
      options['cpu'] = formdata['cpu'][0].strip()

    # Manage Memory
    memory_readonly = False
    if self._default_config_contains('memory'):
      options['memory'] = form_defaults['memory']['value']
      memory_readonly = form_defaults['memory'].get('readOnly', False)
    if (not memory_readonly and 'memory' in formdata and formdata['memory'][0]):
      options['memory'] = formdata['memory'][0].strip()

    # Manage Workspace Volume
    options['workspaceVolume'] = {}
    ws_volume = {}

    ws_volume_readonly = False
    if self._default_config_contains('workspaceVolume'):
      ws_volume_readonly = \
          form_defaults['workspaceVolume'].get('readOnly', False)

      # The Workspace Volume is specified in `config.yaml`
      default_ws_volume = form_defaults['workspaceVolume']['value']

      # Get and set the default values from the YAML configuration file,
      # if present and not marked as readonly
      ws_type_readonly = False
      if ('type' in default_ws_volume and 'value' in default_ws_volume['type']):
        ws_volume['type'] = default_ws_volume['type']['value']
        ws_type_readonly = \
            default_ws_volume['type'].get('readOnly', False)

      ws_rok_url_readonly = False
      if ('rokURL' in default_ws_volume and
          'value' in default_ws_volume['rokURL']):
        ws_volume['rokURL'] = \
            default_ws_volume['rokURL']['value']
        ws_rok_url_readonly = \
            default_ws_volume['rokURL'].get('readOnly', False)

      ws_name_readonly = False
      if ('name' in default_ws_volume and 'value' in default_ws_volume['name']):
        ws_volume['name'] = default_ws_volume['name']['value']
        ws_name_readonly = \
            default_ws_volume['name'].get('readOnly', False)

      ws_size_readonly = False
      if ('size' in default_ws_volume and 'value' in default_ws_volume['size']):
        ws_volume['size'] = \
            '%sGi' % default_ws_volume['size']['value']
        ws_size_readonly = \
            default_ws_volume['size'].get('readOnly', False)

      ws_mount_path_readonly = False
      if ('mountPath' in default_ws_volume and
          'value' in default_ws_volume['mountPath']):
        ws_volume['mountPath'] = \
            default_ws_volume['mountPath']['value']
        ws_mount_path_readonly = \
            default_ws_volume['mountPath'].get('readOnly', False)

    # Get and set the Workspace Volume values from the form, if present
    # and not marked as readonly
    if not ws_volume_readonly:
      if (not ws_type_readonly and 'ws_type' in formdata and
          formdata['ws_type'][0]):
        ws_volume['type'] = formdata['ws_type'][0].strip()

      if (not ws_rok_url_readonly and 'ws_rok_url' in formdata and
          formdata['ws_rok_url'][0]):
        ws_volume['rokURL'] = \
            formdata['ws_rok_url'][0].strip()

      if (not ws_name_readonly and 'ws_name' in formdata and
          formdata['ws_name'][0]):
        ws_volume['name'] = formdata['ws_name'][0].strip()

      if (not ws_size_readonly and 'ws_size' in formdata and
          formdata['ws_size'][0]):
        ws_volume['size'] = '%sGi' % formdata['ws_size'][0].strip()

      if (not ws_mount_path_readonly and 'ws_mount_path' in formdata and
          formdata['ws_mount_path'][0]):
        ws_volume['mountPath'] = \
            formdata['ws_mount_path'][0].strip()

    options['workspaceVolume'] = ws_volume

    # Manage Data Volumes
    options['dataVolumes'] = []
    data_volumes_readonly = False
    if self._default_config_contains('dataVolumes'):
      data_volumes_readonly = \
          form_defaults['dataVolumes'].get('readOnly', False)

    if data_volumes_readonly:
      # Set Data Volumes as specified in the Spawner configuration file
      for volume in form_defaults['dataVolumes']['value']:
        data_volume = {}
        for f in ['type', 'rokURL', 'name', 'size', 'mountPath']:
          data_volume[f] = volume['value'][f]['value']
        data_volume['size'] += 'Gi'
        options['dataVolumes'].append(data_volume)
    else:
      # Deduce the total number of Data Volumes
      data_volumes_cnt = 0
      for k, v in formdata.items():
        if k.startswith('vol_type'):
          data_volumes_cnt += 1

      # Set Data Volumes as specified in the Spawner form
      for i in range(1, data_volumes_cnt + 1):
        data_volume = {}

        # Get all Data Volume fields from the form
        id = 'vol_type' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['type'] = formdata[id][0].strip()

        id = 'vol_name' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['name'] = formdata[id][0].strip()

        id = 'vol_rok_url' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['rokURL'] = formdata[id][0].strip()

        id = 'vol_size' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['size'] = '%sGi' % formdata[id][0].strip()

        id = 'vol_mount_path' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['mountPath'] = formdata[id][0].strip()

        options['dataVolumes'].append(data_volume)

    # Manage Extra Resources
    extra_resources_readonly = False
    if self._default_config_contains('extraResources'):
      options['extraResources'] = (form_defaults['extraResources']['value'])
      extra_resources_readonly = \
          form_defaults['extraResources'].get('readOnly', False)
    if (not extra_resources_readonly and 'extraResources' in formdata and
        formdata['extraResources'][0]):
      options['extraResources'] = \
          formdata['extraResources'][0].strip()

    return options

  @gen.coroutine
  def _prepare_volumes(self):
    """Create PVC manifests and attach as volumes to the Notebook."""
    # Reset Volumes and VolumeMounts to initial KubeSpawner values
    self.volumes = list(self.initial_volumes)
    self.volume_mounts = list(self.initial_volume_mounts)

    # Set PVC labels
    labels = self._expand_all(self.user_storage_extra_labels)
    labels = self._build_common_labels(labels)
    labels.update({'component': 'singleuser-storage'})

    # Attach the existing Rok GW Token to the Notebook as Volume
    self._attach_rok_token_secret()

    # Set Rok annotations to PVC
    secret_name = self._expand_user_properties(
        self.extra_spawner_config['rok_secret_name'])

    rok_annotations = {'rok/creds-secret-name': secret_name}

    # Workspace and Data Volumes are managed as PVCs
    persistent_volumes = [self.workspace_volume] + self.data_volumes

    for (idx, volume) in enumerate(persistent_volumes):
      annotations = self._build_common_annotations(rok_annotations)
      if idx == 0:
        # This is the Workspace Volume
        # Rok GW needs an annotation to present this resource
        annotations.update({'jupyter-workspace': volume['name']})
      else:
        # This is a Dataset Volume
        # Rok GW needs an annotation to present this resource
        annotations.update({'jupyter-dataset': volume['name']})

      if volume['type'] == 'Existing':
        # Rok CSI needs an extra annotation to work with Rok URLs
        annotations.update({'rok/origin': volume['rokURL']})

      yield self._delete_existing_pvc(volume['name'], self.namespace)

      yield self._provision_new_pvc(volume, self.namespace, labels, annotations)

      # Upon success, mount PVC as a volume
      self.volumes.append({
          'name': 'volume-%d-{username}' % idx,
          'persistentVolumeClaim': {
              'claimName': volume['name']
          }
      })

      self.volume_mounts.append({
          'mountPath': volume['mountPath'],
          'name': 'volume-%d-{username}' % idx
      })

  def _get_rok_token(self, name, namespace):
    """Retrieve the token to authenticate with Rok."""
    secret = None

    try:
      secret = self.api.read_namespaced_secret(name=name, namespace=namespace)
    except ApiException as e:
      self.log.warning('Could not retrieve Rok Secret: %s' % e.reason)
      return ''

    token = secret.data.get('token', '')

    return base64.b64decode(token).decode('utf-8')

  @gen.coroutine
  def _attach_rok_token_secret(self):
    """Attach the existing Rok Secret as Notebook Volume."""
    secret_name = self._expand_user_properties(
        self.extra_spawner_config['rok_secret_name'])
    secret_volume_name = 'volume-%s' % secret_name

    secret_volume = {
        'name': secret_volume_name,
        'secret': {
            'secretName': secret_name
        }
    }
    self.volumes.append(secret_volume)
    self.volume_mounts.append({
        'name': secret_volume_name,
        'mountPath': ROK_SECRET_MOUNT
    })

    rok_env = {
        'ROK_GW_TOKEN': 'file:%s/token' % ROK_SECRET_MOUNT,
        'ROK_GW_URL': 'file:%s/url' % ROK_SECRET_MOUNT,
        'ROK_GW_PARAM_REGISTER_JUPYTER_LAB': self.pod_name
    }
    self.environment.update(rok_env)

  @gen.coroutine
  def _delete_existing_pvc(self, pvc_name, namespace):
    """Issue a K8s API request to delete a namespaced PVC, if exists."""
    delete_options = V1DeleteOptions()
    del_status = None
    try:
      del_status = yield self.asynchronize(
          self.api.delete_namespaced_persistent_volume_claim,
          name=pvc_name,
          namespace=namespace,
          body=delete_options)
    except ApiException as e:
      if e.status == 404:
        # The PVC does not exist
        return del_status
      else:
        self.log.warning('Could not delete PVC %s' % pvc_name)
        raise

    while True:
      try:
        yield self.asynchronize(
            self.api.read_namespaced_persistent_volume_claim,
            name=pvc_name,
            namespace=namespace)
      except ApiException as e:
        if e.status == 404:
          self.log.info('PVC %s was successfully deleted', pvc_name)
          break

    return del_status

  @gen.coroutine
  def _provision_new_pvc(self, volume, namespace, labels, annotations):
    """Issue a K8s API request to create a new, namespaced PVC."""
    # Create a V1PersistentVolumeClaim for the API call
    pvc_manifest = self._get_pvc_manifest(
        name=volume['name'],
        storage_class=self.extra_spawner_config['storage_class'],
        access_modes=['ReadWriteOnce'],
        storage=volume['size'],
        labels=labels,
        annotations=annotations)
    pvc = None
    try:
      pvc = yield self.asynchronize(
          self.api.create_namespaced_persistent_volume_claim,
          namespace=namespace,
          body=pvc_manifest)

    except ApiException as e:
      if e.status == 409:
        self.log.warning('PVC %s already exists. New PVC not created.',
                         volume['name'])
      self.log.info(e.reason)
      raise

    self.log.info('PVC %s was successfully created', volume['name'])
    return pvc
