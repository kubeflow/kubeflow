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

import argparse
import json
import requests
import sys
from bs4 import BeautifulSoup as Soup

parser = argparse.ArgumentParser(
  description='JSON format piplock file maintained by pipenv.')
parser.add_argument('pip_lock_path',
                    nargs='?',
                    default='Pipfile.lock',
                    help='JSON format pip dependency lock file.')
parser.add_argument(
  '-o',
  '--output',
  dest='output_file',
  nargs='?',
  default='repo.txt',
  help='Output a file, where each line is <pkg>,<repo>. (default: %(default)s)',
)

GITHUB_HTTPS = 'https://github.com/'
GITHUB_HTTP  = 'http://github.com/'

args = parser.parse_args()

def get_repo_name(url):
  if url.startswith(GITHUB_HTTPS):
    url = url[len(GITHUB_HTTPS):]
  if url.startswith(GITHUB_HTTP):
    url = url[len(GITHUB_HTTP):]
  if url[-1] == '/':
    url = url[:-1]
  return url

def main():
  lockfile = None
  with open(args.pip_lock_path, 'r') as f:
    lockfile = json.loads(f.read())

  deps = {}
  pkgs = lockfile.get('default')
  for pkg in pkgs:
    deps[pkg] = pkgs[pkg].get('version').strip('==')

  repositories = {}
  for pkg in deps:
    pypi_url = 'https://pypi.org/project/{}/{}/'.format(pkg, deps[pkg])
    response = requests.get(pypi_url)
    assert response.ok, 'it failed with {} {}'.format(response.status_code,
                                                    response.reason)

    soup = Soup(response.text, features="html.parser")
    for link in soup.find_all('a'):
      href = link.get('href')
      if href is not None and (href.startswith(GITHUB_HTTP) or href.startswith(GITHUB_HTTPS)):
        text = str(link)
        if text.find('Homepage') >=0 or text.find('Code')>=0:
          repositories[pkg]=get_repo_name(href)
          break
    else:
      repositories[pkg] = pkg + ': None'

  print(repositories)
  with open(args.output_file, 'w') as out:
    for pkg in repositories:
      print(repositories[pkg], file=out)


if __name__ == '__main__':
  main()
