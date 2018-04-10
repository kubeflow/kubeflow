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

import hashlib
import subprocess

import build_artefact
import cmds
import util

_NAME_CHARS = ([chr(i) for i in range(ord('0'), ord('9'))]
              + [chr(i) for i in range(ord('a'), ord('z'))])


def hash_code_as_domain_name(n):
    n = n % (2**63)
    if n < 0:
        n += 2**63
    radix = len(_NAME_CHARS)
    s = ""
    for i in range(12):
        d = n % radix
        s = _NAME_CHARS[d] + s
        n /= radix
    return s


def hash_string(s):
    r = long(hashlib.sha1(s).hexdigest(), 16)
    if r < 0:
        r += 2**63
    return r


def hash_cmds(cmds):
    hash_code = 0l
    for cmd in cmds:
        if isinstance(cmd, basestring):
            hash_code ^= hash_string(cmd)
        elif cmd['kind'] == 'LiteralFile':
            hash_code ^= hash_string(cmd['content'])
            hash_code ^= hash_string(cmd['to'])
            hash_code ^= hash_string(cmd['filePermissions'])
            hash_code ^= hash_string(cmd['owner'])
            hash_code ^= hash_string(cmd['group'])
        elif cmd['kind'] == 'CopyFile':
            # TODO(dcunnin): Scan these files, compute hash
            hash_code ^= hash_string(cmd['from'])
            hash_code ^= hash_string(cmd['to'])
            hash_code ^= hash_string(cmd['dirPermissions'])
            hash_code ^= hash_string(cmd['filePermissions'])
            hash_code ^= hash_string(cmd['owner'])
            hash_code ^= hash_string(cmd['group'])
            raise RuntimeError('CopyFile not supported in image')
        elif cmd['kind'] == 'EnsureDir':
            hash_code ^= hash_string(cmd['dir'])
            hash_code ^= hash_string(cmd['dirPermissions'])
            hash_code ^= hash_string(cmd['owner'])
            hash_code ^= hash_string(cmd['group'])
        else:
            raise RuntimeError('Did not recognize image command kind: ' + cmd['kind'])
    return hash_code


class PackerBuildArtefact(build_artefact.BuildArtefact):
    def __init__(self, cmds):
        self.cmds = cmds
        self.cachedHashCode = None
        self.packerProcess = None

    def builderHashCode(self):
        raise NotImplementedError("%s has no override" % self.__class__.__name__)

    def hashCode(self):
        if self.cachedHashCode is None:
            self.cachedHashCode = self.builderHashCode() ^ hash_cmds(self.cmds)
        return self.cachedHashCode

    def _configFileName(self):
        return self.name() + '.packer.json'

    def _config(self):
        provs = [
            {
                'type': 'shell',
                'execute_command': "{{ .Vars }} sudo -E /bin/bash '{{ .Path }}'",
                'inline': cmds.compile_command_to_bash(cmd),
            }
            for cmd in self.cmds
        ]
        return util.jsonstr({'builders': [self.builder()], 'provisioners': provs})

    def name(self):
        return 'micromanage-%s' % hash_code_as_domain_name(self.hashCode())

    def getOutputFiles(self, dirpath):
        return ['%s/%s' % (dirpath, self._configFileName())]

    def outputFiles(self, dirpath):
        config = self._config()
        dirfilename = '%s/%s' % (dirpath, self._configFileName())
        with open(dirfilename, 'w') as f:
            f.write(config)

    def doBuild(self, dirpath):
        filename = self._configFileName()
        if self.packerProcess is not None:
            raise RuntimeError('Packer build already in progress.')

        command = ['packer', 'build', filename]
        logfilename = '%s/%s.log' % (dirpath, filename)
        print '%s > %s' % (' '.join(command), logfilename)
        with open(logfilename, 'w') as logfile:
            self.packerProcess = subprocess.Popen(command, stdout=logfile, cwd=dirpath)

    def wait(self, dirpath):
        if self.packerProcess is None:
            raise RuntimeError('No Packer build in progress.')
        exitcode = self.packerProcess.wait()
        if exitcode != 0:
            print 'Packer error:  Exit code was %d' % exitcode
            filename = self._configFileName()
            logfilename = '%s/%s.log' % (dirpath, filename)
            with open(logfilename, 'r') as logfile:
                print logfile.read()
            raise RuntimeError('Error from packer.')


