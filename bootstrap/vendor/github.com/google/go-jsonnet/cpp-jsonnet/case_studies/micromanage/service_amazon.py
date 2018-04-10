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
import dateutil.parser
import json
import re

import boto3

import packer
import service
import util
import validate

AMI_CACHE = {}

def amazon_get_amis(region_name, aws_access_key_id, aws_secret_access_key):
    ec2 = boto3.client('ec2', region_name=region_name, aws_access_key_id=aws_access_key_id,
                       aws_secret_access_key=aws_secret_access_key)
    result = ec2.describe_images(Owners=['self'])
    images = result['Images']
    return [(i['Name'], dateutil.parser.parse(i['CreationDate'])) for i in images]

def amazon_get_ami_by_name(region_name, aws_access_key_id, aws_secret_access_key, name):
    ec2 = boto3.client('ec2', region_name=region_name, aws_access_key_id=aws_access_key_id,
                       aws_secret_access_key=aws_secret_access_key)
    result = ec2.describe_images(Owners=['self'], Filters=[{'Name': 'name', 'Values': [name]}])
    images = result['Images']
    assert len(images) == 1, util.jsonstr(images)
    image = images[0]
    return image['ImageId']


class AmazonPackerBuildArtefact(packer.PackerBuildArtefact):
    def __init__(self, image, environment):
        super(AmazonPackerBuildArtefact, self).__init__(image['cmds'])

        self.instanceType = image['instanceType']
        self.sourceAmi = image['sourceAmi']

        self.accessKey = environment['accessKey']
        self.secretKey = environment['secretKey']
        self.sshUser = image['sshUser']
        self.region = environment['region']

    def builderHashCode(self):
        builder_hash = 0;
        builder_hash ^= packer.hash_string(self.sourceAmi)
        builder_hash ^= packer.hash_string(self.instanceType)
        return builder_hash

    def builder(self):
        return {
            'ami_name': self.name(),

            'type': 'amazon-ebs',
            'access_key': self.accessKey,
            'secret_key': self.secretKey,
            'region': self.region,
            'source_ami': self.sourceAmi,
            'instance_type': self.instanceType,
            'ssh_username': self.sshUser,
        }

    def needsBuild(self):
        print 'Checking if AMI exists: %s/%s' % (self.region, self.name())
        if (self.region, self.accessKey) in AMI_CACHE:
            existing_image_names = AMI_CACHE[self.region, self.accessKey]
        else:
            existing_image_names = [
                img[0]
                for img in amazon_get_amis(self.region, self.accessKey, self.secretKey)]
            AMI_CACHE[self.region, self.accessKey] = existing_image_names
        return self.name() not in existing_image_names

    def doBuild(self, dirpath):
        super(AmazonPackerBuildArtefact, self).doBuild(dirpath)
        if self.accessKey not in AMI_CACHE:
            AMI_CACHE[self.accessKey] = []
        AMI_CACHE[self.accessKey] += [self.name()]

    def postBuild(self):
        self.id = amazon_get_ami_by_name(self.region, self.accessKey, self.secretKey, self.name())


class AmazonService(service.Service):

    def validateEnvironment(self, root, path):
        fields = {'kind', 'accessKey', 'secretKey', 'region'}
        validate.obj_only(root, path, fields)
        validate.path_val(root, path + ['region'], 'string')
        validate.path_val(root, path + ['accessKey'], 'string')
        validate.path_val(root, path + ['secretKey'], 'string')

    def validateService(self, root, path):
        super(AmazonService, self).validateService(root, path)
        infra_path = path + ['infrastructure']
        validate.path_val(root, infra_path, 'object', {})
        inst_path = infra_path + ['aws_instance']
        instances = validate.path_val(root, inst_path, 'object', {})

        # Validate image configs
        for inst_name, inst in instances.iteritems():
            self.validateCmds(root, inst_path + [inst_name, 'cmds'])
            self.validateCmds(root, inst_path + [inst_name, 'bootCmds'])
            image = inst.get('ami')
            if isinstance(image, dict):
                self.validateImage(root, inst_path + [inst_name, 'ami'])

    def validateImage(self, root, path):
        super(AmazonService, self).validateImage(root, path)
        validate.path_val(root, path + ['instanceType'], 'string', 'n1-standard-1')
        validate.path_val(root, path + ['sourceAmi'], 'string')
        validate.path_val(root, path + ['sshUser'], 'string')
        validate.obj_only(root, path, {'cmds', 'instanceType', 'sourceAmi', 'sshUser'})

    def compileProvider(self, environment_name, environment):
        return {
            'environment.%s.tf' % environment_name: {
                'provider': {
                    'aws': {
                        'alias': environment_name,
                        'access_key': environment['accessKey'],
                        'secret_key': environment['secretKey'],
                        'region' : environment['region'],
                    },
                },
            },
        }

    def getBuildArtefacts(self, environment, ctx, service):
        service = copy.deepcopy(service)
        barts = {}  # Build artefacts.
        infra = service['infrastructure']

        instances = infra.get('aws_instance', {})

        # Process AMI configs
        for inst_name, inst in instances.iteritems():
            ami = inst['ami']
            if isinstance(ami, dict):
                bart = AmazonPackerBuildArtefact(ami, environment)
                barts[bart.name()] = bart
                inst['ami'] = bart.name()

        return service, barts

    def compile(self, ctx, service_name, service, barts):
        infra = service['infrastructure']

        # Add provider attributes
        for res_kind_name, res_kind_obj in infra.iteritems():
            for res_name, res in res_kind_obj.iteritems():
                res['provider'] = 'aws.%s' % service.get('environment', 'default')
            
        instances = infra.get('aws_instance', {})

        # Convert AMI name to id
        for inst_name, inst in instances.iteritems():
            ami = inst['ami']
            if ami in barts:
                inst['ami'] = barts[ami].id

        # Process commands
        for inst_name, inst in instances.iteritems():
            cmds = inst['cmds']
            boot_cmds = inst['bootCmds']
            if inst.get('user_data'):
                raise RuntimeError('Cannot use user_data, use cmds instead.')
            inst['user_data'] = self.compileStartupScript(cmds, boot_cmds)
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
