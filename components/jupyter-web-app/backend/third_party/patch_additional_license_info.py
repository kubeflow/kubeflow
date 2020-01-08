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
parser = argparse.ArgumentParser(
    description='Generate dependencies json from license.csv file.'
)
parser.add_argument(
    'license_info_file',
    nargs='?',
    default='license_info.csv',
    help='CSV file with license info fetched from github using '
    'get-github-license-info CLI tool. (default: %(default)s)',
)
parser.add_argument(
    'additional_license_info_file',
    nargs='?',
    default='additional_license_info.csv',
    help='CSV file with license info. Each line is in the form '
    '<license_url>,<license_type>. (default: %(default)s)',
)
args = parser.parse_args()


def main():
  mapping = {}
  with open(args.additional_license_info_file, 'r') as f:
    for line in f:
      parts = line.strip().split(',')
      assert len(parts) == 2
      [license_url, license_type] = parts
      mapping[license_url] = license_type

  newlines = []
  with open(args.license_info_file, 'r') as f:
    for line in f:
      parts = line.strip().split(',')
      _, license_url, license_type, *_ = parts
      if license_type == 'Other':
        if not license_url in mapping:
          raise ValueError(
              'Unknown license type: '
              'please add the right license type for {} in file {}'
              .format(license_url, args.additional_license_info_file)
          )
        parts[2] = mapping[license_url]
        print(
            'Update license {} to type {}'.format(
                license_url, mapping[license_url]
            )
        )
      newlines.append(','.join(parts))

  with open(args.license_info_file, 'w') as f:
    for line in newlines:
      print(line, file=f)


if __name__ == "__main__":
  main()
