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
from bs4 import BeautifulSoup as Soup

parser = argparse.ArgumentParser(
  description='Get github repo from go import path.')
parser.add_argument(
  'go_dependency_list_file',
  nargs='?',
  default='dep.txt',
  help=
  'File path of a golang dependency list file, one line has a dependency name. '
  +'(default: %(default)s)',
)
parser.add_argument(
  '-o',
  '--output',
  dest='output_file',
  nargs='?',
  default='repo.txt',
  help=
  'Output file with one line per resolved github repo. Format: org/repo. (default: %(default)s)',
)
parser.add_argument(
  '--manual-dep-repo-mapping',
  dest='manual_dep_repo_mapping_file',
  nargs='?',
  default='dep_repo.manual.csv',
  help=
  'Optional dependency to repo mapping maintained manually for dependencies we cannot '
  +'automatically resolve. Format: each line has dependency import name and its github repo '
  +'separated by comma. Like, "upper.io/db.v3,upper/db". Note: github/upper/db is the repo. '
  +'(default: %(default)s)'
)
args = parser.parse_args()

protocol = 'https://'
godoc_base = 'godoc.org/'
github_base = 'github.com/'
gopkg_base = 'gopkg.in/'


def github_link_to_repo(repo):
  '''
  Removes extra sub folder in github url.
  '''
  if len(repo.split('/')) > 2:
    print('repo {} has subfolder'.format(repo), file=sys.stderr)
    repo = '/'.join(repo.split('/')[:2])
  assert len(repo.split(
    '/')) == 2, 'repo name should be org/repo, but is {}'.format(repo)
  return repo


def get_github_repo(url):
  '''
  Tries to resolve github repo from a github url.
  Returns org/repo format github repo string.
  '''
  if url.startswith(protocol):
    url = url[len(protocol):]
  if not url.startswith(github_base):
    raise Exception('Package url is not github: {}'.format(url))
  github_repo = url[len(github_base):]
  github_repo = github_link_to_repo(github_repo)
  if github_repo[-1] == '/':
    github_repo = github_repo[:-1]
  return github_repo


def fetch_github_uri_from_godoc(url):
  '''
  Tries to resolve github repo from godoc website.

  Implementation: Godoc is a standard way for a lot of golang libraries to
  host its documentation. Godoc page usually has a link on top left with
  github repo url. This function crawls godoc page for the library and finds
  the github url there. If the link there isn't a github url, it throws an
  exception.
  '''
  full_url = protocol + godoc_base + url
  print('fetching godoc {}'.format(full_url), file=sys.stderr)
  response = requests.get(full_url)
  assert response.ok, 'it failed with {} {}'.format(response.status_code,
                                                    response.reason)

  soup = Soup(response.text, features="html.parser")
  navs = soup.select('#x-projnav')
  if len(navs) != 1:
    raise Exception(
      '#x-projnav should occur exactly once, but {} found for {}'.format(len(navs), url))
  nav = navs[0]
  package_name = nav.select_one('span').contents[0]
  assert package_name == url, 'fetched package name should be the same'
  link = nav.select_one('a').attrs.get('href')
  return get_github_repo(link)


def fetch_gopkg_uri(url):
  '''
  Tries to resolve github repo for gopkg libraries.

  Implementation: gopkg library page has a button with text 'Source code', its
  url is usually the corresponding github repo. Throws an exception if the url
  found is not github.
  '''
  response = requests.get(protocol + url)
  assert response.ok, 'fetching {} failed with {} {}'.format(
    url, response.status_code, response.reason)

  soup = Soup(response.text, features="html.parser")

  def is_source_code_link(link):
    return link.getText().find('Source Code') >= 0

  source_code_links = list(filter(is_source_code_link, soup.select('a')))
  assert len(
    source_code_links) == 1, 'Expect exactly one source code link found'

  link = source_code_links[0].attrs.get('href')
  return get_github_repo(link)


def get_github_repo_for_dep(dep):
  '''
  Tries to resolve github repo by three ways:
  1. fetch gopkg website
  2. parse from github url
  3. fetch godoc website
  '''
  print('Fetching github uri for {}'.format(dep), file=sys.stderr)
  repo = None
  if dep.startswith(gopkg_base):
    print('Try fetching {} from gopkg'.format(dep), file=sys.stderr)
    repo = fetch_gopkg_uri(dep)
  elif dep.startswith(github_base):
    print('{} is already github'.format(dep), file=sys.stderr)
    repo = get_github_repo(dep)
  else:
    print('Try fetching {} repo from godoc'.format(dep), file=sys.stderr)
    repo = fetch_github_uri_from_godoc(dep)
  return repo


def main():
  with open(args.go_dependency_list_file,
          'r') as dep_file, open(args.output_file, 'w') as output_file:
    mappings = {}
    try:
      with open(args.manual_dep_repo_mapping_file, 'r') as dep_repo_mapping_file:
        for line in dep_repo_mapping_file:
          mapping = line.strip().split(',')
          assert len(mapping) == 2
          [dep, repo] = mapping
          mappings[dep] = repo
    except Exception:  # pylint: disable=broad-except
      print('ignore manual_dep_repo_mapping_file', file=sys.stderr)
    deps = [line.strip() for line in dep_file]
    repo_seen = set()
    dep_succeeded = []
    # Dependencies that we couldn't resolve their github repos.
    dep_failed = []
    for dep in deps:
      try:
        # Get dep's repo from manually maintained mapping first.
        repo = mappings.get(dep)
        if repo is not None:
          print('repo of {} is already configured to {}'.format(dep, repo), file=sys.stderr)
        else:
          # Try to resolve if not found
          repo = get_github_repo_for_dep(dep)
        if repo in repo_seen:
          print('repo {} is seen more than once'.format(repo), file=sys.stderr)
        else:
          repo_seen.add(repo)
          print(repo, file=output_file)
        dep_succeeded.append(dep)
      except Exception as e: # pylint: disable=broad-except
        print('[failed]', e, file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        dep_failed.append(dep)
    print()
    print((
        'Successfully resolved github repo for {} dependencies and saved to {}. '
        +'Failed to resolve {} dependencies.'
      ).format(len(dep_succeeded), args.output_file, len(dep_failed)),
      file=sys.stderr)
    if dep_failed:
      print('We failed to resolve the following dependencies:', file=sys.stderr)
      for dep in dep_failed:
        print(dep, file=sys.stderr)


if __name__ == '__main__':
  main()
