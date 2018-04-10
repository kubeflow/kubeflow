# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import copy
import json
import dateutil.parser
import re

from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import GoogleCredentials
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build

import packer
import service
import validate

IMAGE_CACHE = {}

def google_get_images_json_key(project, key_json):
    credentials = ServiceAccountCredentials.from_json_keyfile_dict(
        key_json, scopes=['https://www.googleapis.com/auth/compute'])

    compute = build('compute', 'v1', credentials=credentials)
    images = compute.images().list(project=project).execute()
    items = images.get('items', [])
    return [(i['name'], dateutil.parser.parse(i['creationTimestamp'])) for i in items]


class GooglePackerBuildArtefact(packer.PackerBuildArtefact):
    def __init__(self, image, environment):
        super(GooglePackerBuildArtefact, self).__init__(image['cmds'])

        self.machineType = image['machineType']
        self.source = image['source']
        self.zone = image['zone']
        self.project = environment['project']
        self.sshUser = environment['sshUser']
        self.serviceAccount = environment['serviceAccount']

    def builderHashCode(self):
        builder_hash = 0;
        builder_hash ^= packer.hash_string(self.machineType)
        builder_hash ^= packer.hash_string(self.source)
        builder_hash ^= packer.hash_string(self.zone)
        return builder_hash

    def builder(self):
        return {
            'name': self.name(),
            'image_name': self.name(),
            'instance_name': self.name(),

            'type': 'googlecompute',
            'image_description': 'Image built by micromanage',
            'project_id': self.project,
            'account_file': json.dumps(self.serviceAccount),
            'machine_type': self.machineType,
            'source_image': self.source,
            'zone': self.zone,
            'ssh_username': self.sshUser,
        }

    def needsBuild(self):
        print 'Checking if image exists: %s/%s' % (self.project, self.name())
        if self.project in IMAGE_CACHE:
            existing_image_names = IMAGE_CACHE[self.project]
        else:
            existing_image_names = [img[0] for img in google_get_images_json_key(self.project, self.serviceAccount)]
            IMAGE_CACHE[self.project] = existing_image_names
        return self.name() not in existing_image_names

    def doBuild(self, dirpath):
        super(GooglePackerBuildArtefact, self).doBuild(dirpath)
        if self.project not in IMAGE_CACHE:
            IMAGE_CACHE[self.project] = []
        IMAGE_CACHE[self.project] += [self.name()]

    def postBuild(self):
        pass


class GoogleService(service.Service):

    def validateEnvironment(self, root, path):
        fields = {'kind', 'project', 'region', 'sshUser', 'serviceAccount'}
        validate.obj_only(root, path, fields)
        validate.path_val(root, path + ['project'], 'string')
        validate.path_val(root, path + ['region'], 'string')
        validate.path_val(root, path + ['sshUser'], 'string')

        acc = validate.path_val(root, path + ['serviceAccount'], 'object')
        validate.path_val(root, path + ['serviceAccount', 'client_email'], 'string')
        validate.path_val(root, path + ['serviceAccount', 'private_key'], 'string')
        validate.path_val(root, path + ['serviceAccount', 'type'], validate.is_value('service_account'), 'service_account')
        validate.path_val(root, path + ['serviceAccount', 'client_id'], 'string', '')
        validate.path_val(root, path + ['serviceAccount', 'private_key_id'], 'string', '')
        fields = {'client_email', 'private_key', 'type', 'client_id', 'private_key_id'}
        validate.obj_only(root, path + ['serviceAccount'], fields)

    def validateService(self, root, path):
        super(GoogleService, self).validateService(root, path)
        infra_path = path + ['infrastructure']
        validate.path_val(root, infra_path, 'object', {})
        inst_path = infra_path + ['google_compute_instance']
        instances = validate.path_val(root, inst_path, 'object', {})
        disk_path = infra_path + ['google_compute_disk']
        disks = validate.path_val(root, disk_path, 'object', {})

        # Validate image configs
        for inst_name, inst in instances.iteritems():
            self.validateCmds(root, inst_path + [inst_name, 'cmds'])
            self.validateCmds(root, inst_path + [inst_name, 'bootCmds'])
            # Assume instances have a root disk.
            validate.path_val(root, inst_path + [inst_name, 'disk'], 'array')
            inst_disk_path = inst_path + [inst_name, 'disk', 0]
            disk = validate.path_val(root, inst_disk_path, 'object')
            image = disk.get('image')
            if isinstance(image, dict):
                self.validateImage(root, inst_disk_path + ['image'])
        for disk_name, disk in disks.iteritems():
            image = disk.get('image')
            if isinstance(image, dict):
                self.validateImage(root, disk_path + [disk_name, 'image'])

    def validateImage(self, root, path):
        super(GoogleService, self).validateImage(root, path)
        validate.path_val(root, path + ['machineType'], 'string', 'n1-standard-1')
        validate.path_val(root, path + ['source'], 'string')
        validate.path_val(root, path + ['zone'], 'string')
        validate.obj_only(root, path, {'cmds', 'machineType', 'source', 'zone'})

    def compileProvider(self, environment_name, environment):
        return {
            'environment.%s.tf' % environment_name: {
                'provider': {
                    'google': {
                        'alias': environment_name,
                        'credentials': json.dumps(environment['serviceAccount']),
                        'project': environment['project'],
                        'region' : environment['region'],
                    },
                },
            },
        }

    def getBuildArtefacts(self, environment, ctx, service):
        service = copy.deepcopy(service)
        barts = {}  # Build artefacts.

        instances = service['infrastructure']['google_compute_instance']
        disks = service['infrastructure']['google_compute_disk']

        # Process image configs
        for inst_name, inst in instances.iteritems():
            image = inst['disk'][0].get('image')
            if isinstance(image, dict):
                bart = GooglePackerBuildArtefact(image, environment)
                barts[bart.name()] = bart
                inst['disk'][0]['image'] = bart.name()
        for disk_name, disk in disks.iteritems():
            image = disk.get('image')
            if isinstance(image, dict):
                bart = GooglePackerBuildArtefact(image, environment)
                barts[bart.name()] = bart
                disk['image'] = bart.name()

        return service, barts


    def compile(self, ctx, service_name, service, barts):
        infra = service['infrastructure']

        # Add provider attributes
        for res_kind_name, res_kind_obj in infra.iteritems():
            for res_name, res in res_kind_obj.iteritems():
                res['provider'] = 'google.%s' % service['environment']
            
        # Process instance commands
        instances = infra.get('google_compute_instance', {})
        for inst_name, inst in instances.iteritems():
            cmds = inst['cmds']
            boot_cmds = inst['bootCmds']
            metadata = inst['metadata']
            def curl_md(k):
                md_pref = 'http://169.254.169.254/computeMetadata/v1/instance/attributes'
                return 'curl -s -H Metadata-Flavor:Google %s/%s' % (md_pref, k)
            if 'startup-script' in metadata:
                # Move user startup script out of the way (but still run it at every boot).
                metadata['micromanage-user-startup-script'] = metadata['startup-script']
                metadata.pop('startup-script', None)
                bootCmds += ['%s | bash' % curl_md('micromanage-user-startup-script')]
            inst['metadata'] = metadata
            inst['metadata_startup_script'] = self.compileStartupScript(cmds, boot_cmds)
            inst.pop('cmds', None)
            inst.pop('bootCmds', None)

        return {
            'service.%s.tf' % self.fullName(ctx, service_name): {
                'resource': infra,
                'output': {
                    k: { 'value': v }
                    for k, v in service['outputs'].iteritems()
                }
            }
        }

