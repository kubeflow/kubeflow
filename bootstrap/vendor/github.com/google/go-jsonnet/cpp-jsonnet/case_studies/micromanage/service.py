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

import re

import cmds as cmds_lib
import validate

class Service(object):

    def validateCmds(self, root, path):
        cmds = validate.array(root, path, validate.is_any_type({'string', 'object'}), [])
        for i, cmd in enumerate(cmds):
            cmd_path = path + [i]
            if isinstance(cmd, basestring):
                # Any string will do for validation purposes.
                pass
            elif isinstance(cmd, dict):
                kinds = {'CopyFile', 'LiteralFile', 'EnsureDir'}
                kind = validate.path_val(root, cmd_path + ['kind'], validate.is_any_value(kinds))
                if kind == 'CopyFile':
                    fields = {'owner', 'group', 'dirPermissions', 'filePermissions', 'from', 'to'}
                    for f in fields:
                        validate.path_val(root, cmd_path + [f], 'string')
                    validate.obj_only(root, cmd_path, fields | {'kind'})
                elif kind == 'LiteralFile':
                    fields = {'owner', 'group', 'filePermissions', 'content', 'to'}
                    for f in fields:
                        validate.path_val(root, cmd_path + [f], 'string')
                    validate.obj_only(root, cmd_path, fields | {'kind'})
                elif cmd['kind'] == 'EnsureDir':
                    fields = {'owner', 'group', 'dirPermissions', 'dir'}
                    for f in fields:
                        validate.path_val(root, cmd_path + [f], 'string')
                    validate.obj_only(root, cmd_path, fields | {'kind'})
                else:
                    raise RuntimeError('Internal error: %s' % kind)
            else:
                raise RuntimeError('Internal error: %s' % type(cmd))

    def validateImage(self, root, path):
        # Superclasses override this method and validate specific image attributes.
        # Byt here we can do the cmds.
        self.validateCmds(root, path + ['cmds'])

    def children(self, service):
        for child_name, child in service.iteritems():
            if child_name in {'environment', 'infrastructure', 'outputs'}:
                continue
            yield child_name, child

    def validateService(self, root, path):
        validate.path_val(root, path + ['outputs'], validate.is_string_map, {})
        validate.path_val(root, path + ['infrastructure'], 'object', {})

    def fullName(self, ctx, service_name):
        return '-'.join(ctx + [service_name])

    def preprocess(self, ctx, service_name, service):
        def recursive_update(c):
            if isinstance(c, dict):
                return {
                    recursive_update(k): recursive_update(v)
                    for k, v in c.iteritems()
                }
            elif isinstance(c, list):
                return [recursive_update(v) for v in c]
            elif isinstance(c, basestring):
                return self.translateSelfName(self.fullName(ctx, service_name), c)
            else:
                return c
        return {
            'environment': service.get('environment', 'default'),
            'infrastructure': recursive_update(service.get('infrastructure',{})),
            'outputs': recursive_update(service.get('outputs', {})),
        }

    def compileStartupScript(self, cmds, bootCmds):
        lines = []
        lines.append('#!/bin/bash')
        lines.append('if [ ! -r /micromanage_instance_initialized ] ; then')
        for cmd in cmds:
            lines += cmds_lib.compile_command_to_bash(cmd)
        lines.append('touch /micromanage_instance_initialized')
        lines.append('fi')
        for cmd in bootCmds:
            lines += compile_command_to_bash(cmd)
        return '\n'.join(lines)

    _selfNameRegex = re.compile(r'\$\{-\}')

    # Convert ${-} to the name of the service
    def translateSelfName(self, full_name, v):
        return self._selfNameRegex.sub(full_name, v)
    
