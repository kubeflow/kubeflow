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

from setuptools import setup

NAME = 'go-license-tools'
VERSION = '0.0.1'

REQUIRES = [
    'bs4',
    'requests',
    'toml',
]

setup(name=NAME,
      version=VERSION,
      description='Go license tools',
      author='google',
      install_requires=REQUIRES,
      packages=[
          '.',
      ],
      python_requires='>=3.5.3',
      entry_points={
          'console_scripts': [
              'get-github-repo = get_github_repo:main',
              'get-github-license-info = get_github_license_info:main',
              'concatenate-license = concatenate_license:main',
              'parse-toml-dep = parse_toml_dep:main',
          ]
      })
