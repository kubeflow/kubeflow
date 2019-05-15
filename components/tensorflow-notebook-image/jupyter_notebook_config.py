#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright 2016 The Kubeflow Authors All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from jupyter_core.paths import jupyter_data_dir
import subprocess
import os
import errno
import stat

c = get_config()
c.NotebookApp.ip = '*'
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = False
c.NotebookApp.allow_origin_pat = ".*-dot-devshell.appspot.com$"

# Generate a self-signed certificate
if 'GEN_CERT' in os.environ:
  dir_name = jupyter_data_dir()
  pem_file = os.path.join(dir_name, 'notebook.pem')
  try:
    os.makedirs(dir_name)
  except OSError as exc:  # Python >2.5
    if exc.errno == errno.EEXIST and os.path.isdir(dir_name):
      pass
    else:
      raise
  # Generate a certificate if one doesn't exist on disk
  subprocess.check_call([
      'openssl', 'req', '-new', '-newkey', 'rsa:2048', '-days', '365', '-nodes',
      '-x509', '-subj', '/C=XX/ST=XX/L=XX/O=generated/CN=generated', '-keyout',
      pem_file, '-out', pem_file
  ])
  # Restrict access to the file
  os.chmod(pem_file, stat.S_IRUSR | stat.S_IWUSR)
  c.NotebookApp.certfile = pem_file
