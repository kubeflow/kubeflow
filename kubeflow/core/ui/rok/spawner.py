from tornado import gen
from jinja2 import FileSystemLoader, Environment
from kubernetes.client.rest import ApiException
from kubernetes.client.models import V1Secret, V1ObjectMeta
from importlib.util import spec_from_file_location, module_from_spec

# Import the default KubeFormSpawner as a Python module
# Our custom spawner extends the default one, but shares the same class name
spec = spec_from_file_location('spawner', '/etc/config/default_spawner.py')
spawner = module_from_spec(spec)
spec.loader.exec_module(spawner)


class KubeFormSpawner(spawner.KubeFormSpawner):
    """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

    def _options_form_default(self):

        # Create Jinja environment to dynamically load templates
        j2_env = Environment(loader=FileSystemLoader('/etc/config'))

        # Return the rendered template as a unicode string
        return j2_env.get_template('template.html').render(
            form_defaults=self.spawner_ui_config['spawnerFormDefaults'],
        )

    def options_from_form(self, formdata):
        options = {}
        form_defaults = self.spawner_ui_config['spawnerFormDefaults']

        # Manage Image
        options['rokToken'] = form_defaults['rokToken']['value']
        if 'rokToken' in formdata and formdata['rokToken'][0]:
            options['rokToken'] = formdata['rokToken'][0].strip()

        # Manage Image
        options['image'] = form_defaults['image']['value']
        if 'image' in formdata and formdata['image'][0]:
            options['image'] = formdata['image'][0].strip()

        # Manage CPU
        options['cpu'] = form_defaults['cpu']['value']
        if 'cpu' in formdata and formdata['cpu'][0]:
            options['cpu'] = formdata['cpu'][0].strip()

        # Manage Memory
        options['memory'] = form_defaults['memory']['value']
        if 'memory' in formdata and formdata['memory'][0]:
            options['memory'] = formdata['memory'][0].strip()

        # Manage Workspace Volume
        options['workspaceVolume'] = {}
        ws_volume = {}

        if 'workspaceVolume' in form_defaults:
            # The Workspace Volume is specified in `config.yaml`
            default_ws_volume = form_defaults['workspaceVolume']['value']

            # Get the default values from the YAML configuration file
            ws_volume['type'] = default_ws_volume['type']['value']
            ws_volume['rokURL'] = default_ws_volume['rokURL']['value']
            ws_volume['name'] = default_ws_volume['name']['value']
            ws_volume['size'] = '%sGi' % default_ws_volume['size']['value']
            ws_volume['mountPath'] = default_ws_volume['mountPath']['value']

        # Get the Workspace Volume values from the form, if user specified them
        if 'ws_type' in formdata and formdata['ws_type'][0]:
            ws_volume['type'] = formdata['ws_type'][0].strip()

        if 'ws_rok_url' in formdata and formdata['ws_rok_url'][0]:
            ws_volume['rokURL'] = formdata['ws_rok_url'][0].strip()

        if 'ws_name' in formdata and formdata['ws_name'][0]:
            ws_volume['name'] = formdata['ws_name'][0].strip()

        if 'ws_size' in formdata and formdata['ws_size'][0]:
            ws_volume['size'] = '%sGi' % formdata['ws_size'][0].strip()

        if 'ws_mount_path' in formdata and formdata['ws_mount_path'][0]:
            ws_volume['mountPath'] = formdata['ws_mount_path'][0].strip()

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
        options['extraResources'] = form_defaults['extraResources']['value']
        if 'extraResources' in formdata and formdata['extraResources'][0]:
            options['extraResources'] = formdata['extraResources'][0].strip()

        return options

    @gen.coroutine
    def _prepare_volumes(self):
        """Create PVC manifests and attach as volumes to the Notebook."""
        # Set PVC labels
        labels = self._expand_all(self.user_storage_extra_labels)
        labels = self._build_common_labels(labels)
        labels.update({'component': 'singleuser-storage'})

        # Create the secret for the Rok GW Token
        secret_name = yield self._create_rok_token_secret()

        # Set Rok annotations to PVC
        rok_annotations = {
            'rok/creds-secret-name': secret_name,
        }

        # Both user's Workspace and Data Volumes are treated as K8s PVCs
        persistent_volumes = [self.workspace_volume] + self.data_volumes
        self.log.info(persistent_volumes)

        for (idx, volume) in enumerate(persistent_volumes):
            pvc_name = self._expand_user_properties(
                '{username}-%s' % volume['name'])

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
                # Rok CSI driver needs an extra annotation to work with URLs
                annotations.update({'rok/origin': volume['rokURL']})

            yield self._provision_new_pvc(
                volume, self.namespace, labels, annotations)

            # Upon success, mount PVC as a volume
            self.volumes.append({
                'name': 'volume-%d' % idx,
                'persistentVolumeClaim': {'claimName': pvc_name}
            })

            self.volume_mounts.append({
                'mountPath': volume['mountPath'],
                'name': 'volume-%d' % idx
            })

    @gen.coroutine
    def _create_rok_token_secret(self):
        """Create/Update secret with Rok GW Token."""
        secret_name = self._expand_user_properties('{username}-gw-token')
        secret = V1Secret()
        secret.metadata = V1ObjectMeta()
        secret.metadata.name = secret_name
        secret.metadata.namespace = self.namespace
        secret.string_data = {
            'token': self.user_options['rokToken'],
        }
        try:
            yield self.asynchronize(
                self.api.create_namespaced_secret, self.namespace, secret
            )
        except ApiException as e:
            if e.status != 409:
                raise

            # Secret already exists, patch it
            try:
                yield self.asynchronize(
                    self.api.patch_namespaced_secret,
                    secret_name, self.namespace, secret
                )
            except ApiException as e:
                self.log.warning('Could not patch existing secret.')
                raise

        return secret_name

    @gen.coroutine
    def _provision_new_pvc(self, volume, namespace, labels, annotations):
        """Issue a K8s API request to create a new, namespaced PVC."""
        pvc_name = self._expand_user_properties(
            '{username}-%s' % volume['name']
        )

        storage_class = self.extra_spawner_config['storage_class']

        # Create a V1PersistentVolumeClaim for the API call
        pvc_manifest = self._get_pvc_manifest(
            name=pvc_name,
            storage_class=storage_class,
            access_modes=['ReadWriteOnce'],
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
                                 pvc_name)
            self.log.info(e.reason)
            raise

        self.log.info(
            'PVC %s was successfully created', pvc_name)
        return pvc
