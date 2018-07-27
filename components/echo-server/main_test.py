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

import base64
import json
import os

import pytest

import main


@pytest.fixture
def client(monkeypatch):
    monkeypatch.chdir(os.path.dirname(main.__file__))
    main.app.testing = True
    client = main.app.test_client()
    return client


def test_echo(client):
    r = client.post(
        '/echo',
        data='{"message": "Hello"}',
        headers={
            'Content-Type': 'application/json'
        })

    assert r.status_code == 200
    data = json.loads(r.data.decode('utf-8'))
    assert data['message'] == 'Hello'


def test_auth_info(client):
    endpoints = [
        '/auth/info/googlejwt',
        '/auth/info/googleidtoken',
        '/auth/info/firebase']

    encoded_info = base64.b64encode(json.dumps({
        'id': '123'
    }).encode('utf-8'))

    for endpoint in endpoints:
        r = client.get(
            endpoint,
            headers={
                'Content-Type': 'application/json'
            })

        assert r.status_code == 200
        data = json.loads(r.data.decode('utf-8'))
        assert data['id'] == 'anonymous'

        r = client.get(
            endpoint,
            headers={
                'Content-Type': 'application/json',
                'X-Endpoint-API-UserInfo': encoded_info
            })

        assert r.status_code == 200
        data = json.loads(r.data.decode('utf-8'))
        assert data['id'] == '123'


def test_cors(client):
    r = client.options(
        '/auth/info/firebase', headers={'Origin': 'example.com'})
    assert r.status_code == 200
    assert r.headers['Access-Control-Allow-Origin'] == '*'
