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

import yaml
import json
import sys

files = [
    'bigquery-controller',
    'redis-master',
    'redis-master-service',
    'twitter-stream',
]

def jsonstr(v):
    return json.dumps(v, sort_keys=True, indent=4, separators=(',', ': '))

def canonicalize(doc):
    """De-duplicate environment vars and sort them alphabetically."""
    spec = doc.get('spec')
    if not spec: return doc
    template = spec.get('template')
    if not template: return doc
    spec2 = template.get('spec')
    if not spec2: return doc
    containers = spec2.get('containers')
    if not containers: return doc
    for container in containers:
        env = container.get('env')
        if not env: continue
        tab = { }
        for pair in env:
            tab[pair['name']] = pair['value']
        new_env = []
        for key in sorted(tab):
            new_env.append({'name': key, 'value': tab[key]})
        container['env'] = new_env
    return doc

for filename in files:
    with open(filename + '.old.yaml', 'r') as f:
        yaml_doc = canonicalize(yaml.load(f))

    with open(filename + '.new.yaml', 'r') as f:
        jsonnet_doc = yaml.load(f)

    if jsonstr(yaml_doc) == jsonstr(jsonnet_doc):
        print('Identical: %s' % filename)
    else:
        print('Not identical, run: diff %s.old.yaml.out %s.new.yaml.out' % (filename, filename))
        with open(filename + '.old.yaml.out', 'w') as f:
            f.write(jsonstr(yaml_doc))

        with open(filename + '.new.yaml.out', 'w') as f:
            f.write(jsonstr(jsonnet_doc))

        


