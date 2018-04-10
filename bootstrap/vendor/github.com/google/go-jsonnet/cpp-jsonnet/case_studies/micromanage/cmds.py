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

import glob
import os

# E.g. replace Simon's cat with 'Simon'\''s cat'.
def escape(s):
    return "'%s'" % s.replace("'", "'\"'\"'")

def file_glob(given_glob, to, prefix):
    dirs = []
    files = []
    lp = len(prefix)
    for f in glob.glob(given_glob):
        if os.path.isdir(f):
            more_files = file_glob('%s/*' % f, to, prefix)
            files += more_files
        else:
            files.append((f, to + f[lp:]))
    return files        


def compile_command_to_bash(cmd):
    if isinstance(cmd, basestring):
        return [cmd]
    elif cmd['kind'] == 'LiteralFile':
        return [
            'echo -n %s > %s' % (escape(cmd['content']), escape(cmd['to'])),
            'chmod -v %s %s' % (cmd['filePermissions'], escape(cmd['to'])),
            'chown -v %s.%s %s' % (cmd['owner'], cmd['group'], escape(cmd['to'])),
        ]
    elif cmd['kind'] == 'CopyFile':
        files = file_glob(cmd['from'], cmd['to'], os.path.dirname(cmd['from']))
        dirs = set([os.path.dirname(f[1]) for f in files]) - {cmd['to']}
        lines = []
        for d in dirs:
            lines += [
                'mkdir -v -p %s' % escape(d),
                'chmod -v %s %s' % (cmd['dirPermissions'], escape(d)),
                'chown -v %s.%s %s' % (cmd['owner'], cmd['group'], escape(d)),
            ]
        for f in files:
            with open (f[0], "r") as stream:
                content = stream.read()
            lines += [
                'echo -n %s > %s' % (escape(content), escape(f[1])),
                'chmod -v %s %s' % (cmd['filePermissions'], escape(f[1])),
                'chown -v %s.%s %s' % (cmd['owner'], cmd['group'], escape(f[1])),
            ]
        return lines
    elif cmd['kind'] == 'EnsureDir':
        return [
            'mkdir -v -p %s' % escape(cmd['dir']),
            'chmod -v %s %s' % (cmd['dirPermissions'], escape(cmd['dir'])),
            'chown -v %s.%s %s' % (cmd['owner'], cmd['group'], escape(cmd['dir'])),
        ]
    else:
        raise RuntimeError('Did not recognize image command kind: ' + cmd['kind'])

