# -*- coding: utf-8 -*-
import json
import yaml
import string
import escapism
from tornado import gen
from traitlets import Dict
from jinja2 import FileSystemLoader, Environment

from kubespawner.objects import make_pvc
from kubespawner.spawner import KubeSpawner
from kubernetes.client.rest import ApiException

SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'


class KubeFormSpawner(KubeSpawner):
  """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

  def __init__(self, *args, **kwargs):
    """Call init() of parent class and initialize volume lists."""
    super(KubeFormSpawner, self).__init__(*args, **kwargs)
    self.initial_volumes = list(self.volumes)
    self.initial_volume_mounts = list(self.volume_mounts)

  @property
  def spawner_ui_config(self):
    # Read raw YAML file, format it and parse it as dict
    if not hasattr(self, "_spawner_ui_config"):
      c = None
      try:
        with open('/etc/config/spawner_ui_config.yaml', 'r') as f:
          c = self._expand_user_properties(f.read())
      except IOError:
        self.log.warning('Error opening Spawner UI config file')

      try:
        if yaml.safe_load(c) is None:
          # YAML exists but is empty
          self._spawner_ui_config = {}
        else:
          # YAML exists and is not empty
          self._spawner_ui_config = yaml.safe_load(c)
      except yaml.YAMLError as e:
        self.log.warning(
            'Spawner UI config file contains'
            'invalid YAML syntax: {}', e)
        return None

    return self._spawner_ui_config

  extra_spawner_config = Dict({},
                              config=True,
                              help="""
        A dictionary with extra configuration parameters for KubeFormSpawner.
        """)

  def options_form(self, form):
    # Create Jinja environment to dynamically load templates
    j2_env = Environment(loader=FileSystemLoader('/etc/config'))

    # Get available PVCs in a given namespace
    # This is a blocking K8s API call
    existing_pvcs = self._list_pvcs_in_namespace(self.namespace)

    form_defaults = None
    if self.spawner_ui_config is not None:
      # YAML exists and was parsed successfully
      if self.spawner_ui_config['spawnerFormDefaults'] is not None:
        form_defaults = self.spawner_ui_config['spawnerFormDefaults']
      else:
        form_defaults = {}

    # Return the rendered template as a unicode string
    return j2_env.get_template('template.html').render(
        form_defaults=form_defaults,
        existing_pvcs=existing_pvcs,
        username=self._expand_user_properties('{username}'))

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

      ws_access_modes_readonly = False
      if ('accessModes' in default_ws_volume and
          'value' in default_ws_volume['accessModes']):
        ws_volume['accessModes'] = \
            default_ws_volume['accessModes']['value']
        ws_access_modes_readonly = \
            default_ws_volume['accessModes'].get('readOnly', False)

    # Get and set the Workspace Volume values from the form, if present
    # and not marked as readonly
    if not ws_volume_readonly:
      if (not ws_type_readonly and 'ws_type' in formdata and
          formdata['ws_type'][0]):
        ws_volume['type'] = formdata['ws_type'][0].strip()

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

      if (not ws_access_modes_readonly and 'ws_access_modes' in formdata and
          formdata['ws_access_modes'][0]):
        ws_volume['accessModes'] = \
            formdata['ws_access_modes'][0].strip()

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
        for f in ['type', 'name', 'size', 'mountPath', 'accessModes']:
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

        id = 'vol_size' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['size'] = '%sGi' % formdata[id][0].strip()

        id = 'vol_mount_path' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['mountPath'] = formdata[id][0].strip()

        id = 'vol_access_modes' + str(i)
        if id in formdata and formdata[id][0]:
          data_volume['accessModes'] = formdata[id][0].strip()

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

  @property
  def singleuser_image_spec(self):
    return self.user_options['image']

  image_spec = singleuser_image_spec

  @property
  def cpu_guarantee(self):
    return self.user_options['cpu']

  @property
  def mem_guarantee(self):
    return self.user_options['memory']

  @property
  def workspace_volume(self):
    return self.user_options["workspaceVolume"]

  @property
  def data_volumes(self):
    return self.user_options["dataVolumes"]

  @property
  def extra_resource_limits(self):
    extra = ''
    if self.user_options['extraResources']:
      extra = json.loads(self.user_options['extraResources'])
    return extra

  def get_env(self):
    env = super(KubeFormSpawner, self).get_env()
    gcp_secret_name = self.extra_spawner_config['gcp_secret_name']
    if gcp_secret_name:
      env['GOOGLE_APPLICATION_CREDENTIALS'] = '{}/{}.json'.format(
          SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name)
    return env

  # TODO(kkasravi): add unit test
  def _parse_user_name(self, username):
    safe_chars = set(string.ascii_lowercase + string.digits)
    name = username.split(':')[-1]
    legacy = ''.join([s if s in safe_chars else '-' for s in name.lower()])
    safe = escapism.escape(name, safe=safe_chars, escape_char='-').lower()
    return legacy, safe, name

  def _expand_user_properties(self, template):
    # Override KubeSpawner method to remove prefix accounts.google: for iap
    legacy, safe, name = self._parse_user_name(self.user.name)

    # Set servername based on whether named-server initialised
    if self.name:
      servername = '-{}'.format(self.name)
    else:
      servername = ''

    rname = template.format(
        userid=self.user.id,
        username=safe,
        unescaped_username=name,
        legacy_escape_username=legacy,
        servername=servername,
    )
    return rname

  def _default_config_contains(self, option):
    """Check if config.yaml contains a value for a Spawner option."""
    if self.spawner_ui_config is not None:
      form_defaults = None
      if 'spawnerFormDefaults' in self.spawner_ui_config:
        form_defaults = self.spawner_ui_config['spawnerFormDefaults']

      if form_defaults is not None and option in form_defaults:
        if 'value' in form_defaults[option]:
          return True
    return False

  def _get_pvc_manifest(self, name, storage_class, access_modes, storage,
                        labels, annotations):
    """
    Return a PVC spec based on the given parameters.
    This manifest will be used to create PVCs in the K8s cluster.
    """
    return make_pvc(
        name=name,
        storage_class=storage_class,
        access_modes=access_modes,
        storage=storage,
        labels=labels,
        annotations=annotations)

  def _list_pvcs_in_namespace(self, namespace):
    """
    Return a list with all non-failed PVCs in a K8s namespace.
    Each list entry is a dict with `name`, `size` and `access_modes` keys.
    """
    existing_pvcs = []

    try:
      resp = self.api.list_namespaced_persistent_volume_claim(
          namespace=namespace, watch=False)

    except ApiException as e:
      self.log.warn('Could not list PVCs in %s: %s', namespace, e)
      raise

    # Iterate over all existing PVCs and return all non-failed ones
    for pvc in [pvc for pvc in resp.items if pvc.status.phase != 'Failed']:
      existing_pvcs.append({
          "name":
          pvc.metadata.name,
          "size":
          pvc.spec.resources.requests.get('storage')[:-2],
          "access_modes":
          pvc.spec.access_modes
      })

    return existing_pvcs

  @gen.coroutine
  def _prepare_volumes(self):
    """Create PVC manifests and attach as volumes to the Notebook."""
    # Reset Volumes and VolumeMounts to initial KubeSpawner values
    self.volumes = list(self.initial_volumes)
    self.volume_mounts = list(self.initial_volume_mounts)

    # Workspace and Data Volumes are managed as PVCs
    persistent_volumes = [self.workspace_volume] + self.data_volumes

    for (idx, volume) in enumerate(persistent_volumes):
      if volume['type'] == 'New':
        yield self._provision_new_pvc(volume, self.namespace)
      elif volume['type'] == 'Existing':
        yield self._get_existing_pvc(volume['name'], self.namespace)

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

  @gen.coroutine
  def _provision_new_pvc(self, volume, namespace):
    """Issue a K8s API request to create a new, namespaced PVC."""
    labels = self._build_common_labels(
        self._expand_all(self.user_storage_extra_labels))
    labels.update({'component': 'singleuser-storage'})
    annotations = self._build_common_annotations({})

    # Create a V1PersistentVolumeClaim for the API call
    pvc_manifest = self._get_pvc_manifest(
        name=volume['name'],
        storage_class=self.extra_spawner_config['storage_class'],
        access_modes=[volume['accessModes']],
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

  @gen.coroutine
  def _get_existing_pvc(self, pvc_name, namespace):
    """Issue a K8s API request to retrieve a namespaced PVC."""
    pvc = None

    try:
      pvc = yield self.asynchronize(
          self.api.read_namespaced_persistent_volume_claim,
          name=pvc_name,
          namespace=namespace)

    except ApiException as e:
      self.log.warning('PVC %s could not be retrieved: %s', pvc_name, e)
      raise

    self.log.info('PVC %s was successfully retrieved', pvc_name)
    return pvc

  @gen.coroutine
  def start(self):
    """Override KubeSpawner class start method."""
    yield self._prepare_volumes()
    _start = yield super(KubeFormSpawner, self).start()
    return _start
