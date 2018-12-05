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
                self.log.warning('Spawner UI config file contains'
                                 'invalid YAML syntax: {}', e)
                return None

        return self._spawner_ui_config

    extra_spawner_config = Dict(
        {},
        config=True,
        help="""
        A dictionary with extra configuration parameters for KubeFormSpawner.
        """
    )

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
            username=self._expand_user_properties('{username}')
        )

    def options_from_form(self, formdata):
        options = {}
        if self.spawner_ui_config is not None:
            form_defaults = self.spawner_ui_config['spawnerFormDefaults']

        # Manage Image
        if self._default_config_contains('image'):
            options['image'] = form_defaults['image']['value']
        if 'image' in formdata and formdata['image'][0]:
            options['image'] = formdata['image'][0].strip()

        # Manage CPU
        if self._default_config_contains('cpu'):
            options['cpu'] = form_defaults['cpu']['value']
        if 'cpu' in formdata and formdata['cpu'][0]:
            options['cpu'] = formdata['cpu'][0].strip()

        # Manage Memory
        if self._default_config_contains('memory'):
            options['memory'] = form_defaults['memory']['value']
        if 'memory' in formdata and formdata['memory'][0]:
            options['memory'] = formdata['memory'][0].strip()

        # Manage Workspace Volume
        options['workspaceVolume'] = {}
        ws_volume = {}

        if self._default_config_contains('workspaceVolume'):
            # The Workspace Volume is specified in `config.yaml`
            if 'value' in form_defaults['workspaceVolume']:
                default_ws_volume = form_defaults['workspaceVolume']['value']

                # Get the default values from the YAML configuration files
                if ('type' in default_ws_volume and
                   'value' in default_ws_volume['type']):
                        ws_volume['type'] = default_ws_volume['type']['value']

                if ('name' in default_ws_volume and
                   'value' in default_ws_volume['name']):
                        ws_volume['name'] = default_ws_volume['name']['value']

                if ('size' in default_ws_volume and
                   'value' in default_ws_volume['size']):
                        ws_volume['size'] = (
                            '%sGi' % default_ws_volume['size']['value'])

                if ('mountPath' in default_ws_volume and
                   'value' in default_ws_volume['mountPath']):
                        ws_volume['mountPath'] = (
                            default_ws_volume['mountPath']['value'])

                if ('accessModes' in default_ws_volume and
                   'value' in default_ws_volume['accessModes']):
                        ws_volume['accessModes'] = (
                            default_ws_volume['accessModes']['value'])

        # Get the Workspace Volume values from the form, if user specified them
        if 'ws_type' in formdata and formdata['ws_type'][0]:
            ws_volume['type'] = formdata['ws_type'][0].strip()

        if 'ws_name' in formdata and formdata['ws_name'][0]:
            ws_volume['name'] = formdata['ws_name'][0].strip()

        if 'ws_size' in formdata and formdata['ws_size'][0]:
            ws_volume['size'] = '%sGi' % formdata['ws_size'][0].strip()

        if 'ws_mount_path' in formdata and formdata['ws_mount_path'][0]:
            ws_volume['mountPath'] = formdata['ws_mount_path'][0].strip()

        if 'ws_access_modes' in formdata and formdata['ws_access_modes'][0]:
            ws_volume['accessModes'] = formdata['ws_access_modes'][0].strip()

        options['workspaceVolume'] = ws_volume

        # Manage Data Volumes
        options['dataVolumes'] = []

        data_volumes_cnt = 0
        # Deduce the total number of Data Volumes
        for k, v in formdata.items():
            if k.startswith('vol_type'):
                data_volumes_cnt += 1

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
        if self._default_config_contains('extraResources'):
            options['extraResources'] = (
                form_defaults['extraResources']['value'])
        if 'extraResources' in formdata and formdata['extraResources'][0]:
            options['extraResources'] = formdata['extraResources'][0].strip()

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
                SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name
            )
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
            if form_defaults is not None:
                if option in form_defaults:
                    if 'value' in form_defaults[option]:
                        return True
        return False

    def _get_pvc_manifest(self, name, storage_class, access_modes,
                          storage, labels, annotations):
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
            annotations=annotations
        )

    def _list_pvcs_in_namespace(self, namespace):
        """
        Return a list with all non-failed PVCs in a K8s namespace.

        Each list entry is a dict with `name`, `size` and `access_modes` keys.
        """
        existing_pvcs = []

        try:
            resp = self.api.list_namespaced_persistent_volume_claim(
                namespace=namespace,
                watch=False
            )

        except ApiException as e:
            self.log.warn('Could not list PVCs in %s: %s', namespace, e)
            raise

        # Iterate over all existing PVCs and return all non-failed ones
        for pvc in [pvc for pvc in resp.items if pvc.status.phase != 'Failed']:
            existing_pvcs.append({
                "name": pvc.metadata.name,
                "size": pvc.spec.resources.requests.get('storage')[:-2],
                "access_modes": pvc.spec.access_modes
            })

        return existing_pvcs

    @gen.coroutine
    def _prepare_volumes(self):
        """Create PVC manifests and attach as volumes to the Notebook."""
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
                'persistentVolumeClaim': {'claimName': volume['name']}
            })

            self.volume_mounts.append({
                'mountPath': volume['mountPath'],
                'name': 'volume-%d-{username}' % idx
            })

    @gen.coroutine
    def _provision_new_pvc(self, volume, namespace):
        """Issue a K8s API request to create a new, namespaced PVC."""
        labels = self._build_common_labels(self._expand_all(
            self.user_storage_extra_labels))
        labels.update({'component': 'singleuser-storage'})
        annotations = self._build_common_annotations({})

        # Create a V1PersistentVolumeClaim for the API call
        pvc_manifest = self._get_pvc_manifest(
            name=volume['name'],
            storage_class=self.extra_spawner_config['storage_class'],
            access_modes=[volume['accessModes']],
            storage=volume['size'],
            labels=labels,
            annotations=annotations
        )

        pvc = None
        try:
            pvc = yield self.asynchronize(
                self.api.create_namespaced_persistent_volume_claim,
                namespace=namespace,
                body=pvc_manifest
            )

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
                namespace=namespace
            )

        except ApiException as e:
            self.log.warning('PVC %s could not be retrieved: %s', pvc_name, e)
            raise

        self.log.info('PVC %s was successfully retrieved', pvc_name)
        return pvc

    @gen.coroutine
    def start(self):
        """Override KubeSpawner class start method."""
        yield self._prepare_volumes()
        return (yield super(KubeFormSpawner, self).start())
