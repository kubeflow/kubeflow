# Copyright 2016 Google Inc. All Rights Reserved.
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

"""A simple flask app to redirect all requests to https.
"""

import logging

from flask import Flask, jsonify, redirect, request

app = Flask(__name__)

@app.route('/healthz')
def health_check():
  return jsonify({'isHealthy': True})

@app.route('/')
@app.route('/<path:path>')
def all_handler(path=None):
  new_url = request.url
  if request.scheme == "http":
    prefix = "http"
    new_url = "https" + new_url[len(prefix):]
  logging.info("Redirecting to: %s", new_url)
  return redirect(new_url)

if __name__ == '__main__':
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',)
  logging.getLogger().setLevel(logging.INFO)
  app.run(host='127.0.0.1', port=8080, debug=False)
