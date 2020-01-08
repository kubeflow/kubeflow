# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse
import sys
import toml

parser = argparse.ArgumentParser(
  description='Parse toml format go dependencies maintained by dep tool.')
parser.add_argument('dep_lock_path',
                    nargs='?',
                    default='Gopkg.lock',
                    help='Toml format go dependency lock file.')
parser.add_argument(
  '-o',
  '--output',
  dest='output_file',
  nargs='?',
  default='dep.txt',
  help='Output file with one line per golang library. (default: %(default)s)',
)

args = parser.parse_args()


def main():
  print('Parsing dependencies from {}'.format(args.dep_lock_path), file=sys.stderr)

  with open(args.output_file, 'w') as output_file:
    deps = toml.load(args.dep_lock_path)
    projects = deps.get('projects')
    dep_names = list(map(lambda p: p.get('name'), projects))
    for name in dep_names:
      print(name, file=output_file)

    print('Found {} dependencies'.format(len(projects)), file=sys.stderr)


if __name__ == '__main__':
  main()
