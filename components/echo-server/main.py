# -*- coding: utf-8 -*-
#
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
"""
Google Cloud Endpoints sample application.

Demonstrates how to create a simple echo API as well as how to deal with
various authentication methods.
"""

import base64
import json
import logging

from flask import Flask, jsonify, request
from flask_cors import cross_origin
from six.moves import http_client

app = Flask(__name__)


def _base64_decode(encoded_str):
  # Add paddings manually if necessary.
  num_missed_paddings = 4 - len(encoded_str) % 4
  if num_missed_paddings != 4:
    encoded_str += b'=' * num_missed_paddings
  return base64.b64decode(encoded_str).decode('utf-8')


@app.route('/echo', methods=['POST'])
def echo():
  """Simple echo service."""
  message = request.get_json().get('message', '')
  return jsonify({'message': message})


@app.route('/')
@app.route('/headers')
def headers():
  return jsonify({'headers': request.headers.to_list()})


def auth_info():
  """Retrieves the authenication information from Google Cloud Endpoints."""
  encoded_info = request.headers.get('X-Endpoint-API-UserInfo', None)

  if encoded_info:
    info_json = _base64_decode(encoded_info)
    user_info = json.loads(info_json)
  else:
    user_info = {'id': 'anonymous'}

  return jsonify(user_info)


@app.route('/auth/info/googlejwt', methods=['GET'])
def auth_info_google_jwt():
  """Auth info with Google signed JWT."""
  return auth_info()


@app.route('/auth/info/googleidtoken', methods=['GET'])
def auth_info_google_id_token():
  """Auth info with Google ID token."""
  return auth_info()


@app.route('/auth/info/firebase', methods=['GET'])
@cross_origin(send_wildcard=True)
def auth_info_firebase():
  """Auth info with Firebase auth."""
  return auth_info()


@app.errorhandler(http_client.INTERNAL_SERVER_ERROR)
def unexpected_error(e):
  """Handle exceptions by returning swagger-compliant json."""
  logging.exception('An error occurred while processing the request.')
  response = jsonify({
      'code': http_client.INTERNAL_SERVER_ERROR,
      'message': 'Exception: {}'.format(e)
  })
  response.status_code = http_client.INTERNAL_SERVER_ERROR
  return response


if __name__ == '__main__':
  # This is used when running locally. Gunicorn is used to run the application
  # on Google App Engine. See entrypoint in app.yaml.
  app.run(host='127.0.0.1', port=8080, debug=True)
