import json
import yaml
import string
import escapism
from traitlets import Dict
from kubespawner.spawner import KubeSpawner
from jinja2 import FileSystemLoader, Environment

SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'


class KubeFormSpawner(KubeSpawner):
    """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

    def __init__(self, *args, **kwargs):
        """Override KubeSpawner class init method."""
        with open('/etc/config/spawner_ui_config.yaml', 'r') as f:
            self.spawner_ui_config = yaml.load(f)
        super(KubeFormSpawner, self).__init__(*args, **kwargs)

    extra_spawner_config = Dict(
        {},
        config=True,
        help="""
        A dictionary with extra configuration parameters for KubeFormSpawner.
        """
    )

    # relies on HTML5 for image datalist
    def _options_form_default(self):

        # Create Jinja environment to dynamically load templates
        j2_env = Environment(loader=FileSystemLoader('/etc/config'))

        # Return the rendered template as unicode string
        return j2_env.get_template('template.html').render(
            form_defaults=self.spawner_ui_config['spawnerFormDefaults'],
        )

    def options_from_form(self, formdata):
        options = {}
        form_defaults = self.spawner_ui_config['spawnerFormDefaults']

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

        # Manage Extra Resources
        options['extraResources'] = form_defaults['extraResources']['value']
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
