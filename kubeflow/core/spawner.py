import json
import string
import escapism
from kubespawner.spawner import KubeSpawner
from traitlets import Dict

SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'


class KubeFormSpawner(KubeSpawner):

    extra_spawner_config = Dict(
        {},
        config=True,
        help="""
        A dictionary with extra configuration parameters for KubeFormSpawner.
        """
    )

    # relies on HTML5 for image datalist
    def _options_form_default(self):
        registry = self.extra_spawner_config['registry']
        repoName = self.extra_spawner_config['repoName']
        return '''

    <table style="width: 100%;">
    <tr>
        <td style="width: 30%;"><label for='image'>Image</label></td>
        <td style="width: 70%;"><input value="" list="image" name="image" placeholder='repo/image:tag' style="width: 100%;">
        <datalist id="image">
          <option value="{0}/{1}/tensorflow-1.4.1-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.4.1-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.5.1-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.5.1-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.6.0-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.6.0-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.7.0-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.7.0-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.8.0-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.8.0-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.9.0-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.9.0-notebook-gpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.10.1-notebook-cpu:v0.3.1">
          <option value="{0}/{1}/tensorflow-1.10.1-notebook-gpu:v0.3.1">
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
        platform = self.extra_spawner_config['platform']
        if platform == 'ack':
            image = ('registry.aliyuncs.com/kubeflow-images-public/'
                     'tensorflow-notebook-cpu:v0.2.1')
        else:
            image = ('gcr.io/kubeflow-images-public/'
                     'tensorflow-1.8.0-notebook-cpu:v0.3.1')
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
