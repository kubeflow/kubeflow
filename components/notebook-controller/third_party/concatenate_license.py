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
import requests
import sys
import traceback

parser = argparse.ArgumentParser(
  description='Generate dependencies json from license.csv file.')
parser.add_argument(
  'license_info_file',
  nargs='?',
  default='license_info.csv',
  help='CSV file with license info fetched from github using get-github-license-info CLI tool.'
    +'(default: %(default)s)',
)
parser.add_argument(
  '-o',
  '--output',
  dest='output_file',
  nargs='?',
  default='license.txt',
  help=
  'Concatenated license file path this command generates. (default: %(default)s)'
)
args = parser.parse_args()


def fetch_license_text(download_link):
  response = requests.get(download_link)
  assert response.ok, 'Fetching {} failed with {} {}'.format(
    download_link, response.status_code, response.reason)
  return response.text


def main():
  with open(args.license_info_file,
            'r') as license_info_file, open(args.output_file,
                                            'w') as output_file:
    repo_failed = []
    for line in license_info_file:
      line = line.strip()
      [repo, license_link, license_name,
        license_download_link] = line.split(',')
      try:
        print('Repo {} has license download link {}'.format(
            repo, license_download_link),
              file=sys.stderr)
        license_text = fetch_license_text(license_download_link)
        print(
            '--------------------------------------------------------------------------------',
            file=output_file,
        )
        print('{}  {}  {}'.format(repo, license_name, license_link),
              file=output_file)
        print(
            '--------------------------------------------------------------------------------',
            file=output_file,
        )
        print(license_text, file=output_file)
      except Exception as e: # pylint: disable=broad-except
        print('[failed]', e, file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        repo_failed.append(repo)
    print('Failed to download license file for {} repos.'.format(len(repo_failed)), file=sys.stderr)
    for repo in repo_failed:
      print(repo, file=sys.stderr)


main()
