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
import requests
import sys
import traceback
from pathlib import Path

home = str(Path.home())
parser = argparse.ArgumentParser(
  description='Get github license info from github APIs.')
parser.add_argument(
  'repo_list',
  nargs='?',
  default='repo.txt',
  help=
  'Github repo list file with one line per github repo. Format: org/repo. (default: %(default)s)',
)
parser.add_argument(
  '-o',
  '--output',
  dest='output_file',
  nargs='?',
  default='license_info.csv',
  help=
  'Output file with one line per github repo. Line format: '
  +'org/repo,license_html_url,license_name,license_download_url. (default: %(default)s)',
)
parser.add_argument(
  '--github-api-token-file',
  dest='github_api_token_file',
  default='{}/.github_api_token'.format(home),
  help='You need to create a github personal access token at https://github.com/settings/tokens, '
  +'because github has very strict limit on anonymous API usage. (default: %(default)s) Format: a '
  +'text file with one line. '
  +'"<40 characters string shown when a new personal access token is created>"'
)
args = parser.parse_args()


def main():
  token = None
  try:
    with open(args.github_api_token_file, 'r') as token_file:
      token = token_file.read().strip()
      print('Read github API token from {}, length {}.'.format(
        args.github_api_token_file, len(token)),
          file=sys.stderr)
  except FileNotFoundError:
    raise Exception((
        'Please put a github api token file at {}, or specify a different token file path by '
        +'--github-api-token-file. Github API token is needed because anonymous API access limit '
        +'is not enough.'
      ).format(args.github_api_token_file))

  # github personal access token is always 40 characters long
  assert len(token) == 40
  # reference: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
  headers = {'Authorization': 'token {}'.format(token)}
  with open(args.repo_list,
          'r') as repo_list_file, open(args.output_file,
                                          'w') as output_file:
    repo_succeeded = []
    repo_failed = []
    for repo in repo_list_file:
      repo = repo.strip()
      print('Fetching license for {}'.format(repo), file=sys.stderr)
      try:
        url = 'https://api.github.com/repos/{}/license'.format(repo)
        response = requests.get(url, headers=headers)
        if not response.ok:
          print('Error response content:\n{}'.format(response.content), file=sys.stderr)
          raise Exception('fetching {} failed with {} {}'.format(
              url, response.status_code, response.reason))
        data = response.json()

        download_url = data['download_url']
        license_name = data['license']['name']
        html_url = data['html_url']
        print('{},{},{},{}'.format(repo, html_url, license_name, download_url), file=output_file)
        repo_succeeded.append(repo)
      except Exception as e: # pylint: disable=broad-except
        print('[failed]', e, file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        repo_failed.append(repo)
    print('Fetched github license info, {} succeeded, {} failed.'.format(
      len(repo_succeeded), len(repo_failed)), file=sys.stderr)
    if repo_failed:
      print('The following repos failed:', file=sys.stderr)
      for repo in repo_failed:
        print(repo, file=sys.stderr)


if __name__ == '__main__':
  main()
