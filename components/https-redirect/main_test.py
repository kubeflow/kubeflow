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

import unittest

import main


class TestRedirect(unittest.TestCase):

  def test_non_empty_path(self):
    main.app.testing = True
    client = main.app.test_client()

    endpoint = '/hello/world'
    r = client.get(endpoint, headers={'Content-Type': 'application/json'})

    self.assertEqual(302, r.status_code)
    self.assertEqual(
        r.data,
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">\n<title>Redirecting...</title>\n<h1>Redirecting...</h1>\n<p>You should be redirected automatically to target URL: <a href="https://localhost/hello/world">https://localhost/hello/world</a>.  If not click the link.'  # noqa: E501
    )

  def test_empty_path(self):
    main.app.testing = True
    client = main.app.test_client()

    endpoint = '/'
    r = client.get(endpoint, headers={'Content-Type': 'application/json'})

    self.assertEqual(200, r.status_code)
    self.assertEqual(
        r.data,
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">\n<title>Redirecting...</title>\n<h1>Redirecting...</h1>\n<p>You should be redirected automatically to target URL: <a href="https://localhost/">https://localhost/</a>.  If not click the link.'  # noqa: E501
    )

  def test_health_check(self):
    main.app.testing = True
    client = main.app.test_client()

    endpoint = '/healthz'
    r = client.get(endpoint, headers={'Content-Type': 'application/json'})

    self.assertEqual(200, r.status_code)


if __name__ == "__main__":
  unittest.main()
