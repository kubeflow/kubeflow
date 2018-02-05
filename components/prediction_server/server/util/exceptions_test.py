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
"""Unittests for the Api module."""
import unittest

from _exceptions import _RequestException


class RequestExceptionTest(unittest.TestCase):

  def test_error_code(self):
    raw_content = ('{\n  "error": {\n    "code": 404,\n    "message": "Field: '
                   'name Error: The specified model was not found.",\n    '
                   '"status": "NOT_FOUND",\n    "details": [\n      {\n        '
                   '"@type": "type.googleapis.com/google.rpc.BadRequest",\n'
                   '        "fieldViolations": [\n          {\n            '
                   '"field": "name",\n            "description": "The specified'
                   ' model was not found."\n          }\n        ]\n      }\n'
                   '    ]\n  }\n}\n')
    e = _RequestException('NOT_FOUND', raw_content)

    self.assertEquals(404, e.error_code)

  def test_value_error(self):
    # Constructor and error_code will not throw an error on bad json.
    raw_content = '<html><body><div> not json </div></body></html>'
    e = _RequestException('not-used', raw_content)

    self.assertEquals(e.error_code, None)
    self.assertEquals(e.status, 'not-used')
    self.assertEquals(e.content, raw_content)
    self.assertEquals(e.message, raw_content)

  def test_key_error(self):
    # Constructor does not care about message messing.
    raw_content = '{"error": {"code": 404, "missing-message": "Field"}}'
    e = _RequestException('not-used', raw_content)

    self.assertEquals(e.error_code, 404)
    self.assertEquals(e.status, 'not-used')
    self.assertEquals(e.content, raw_content)
    self.assertEquals(e.message, raw_content)

  def test_type_error(self):
    # Constructor does not care about type error.
    raw_content = 1234
    e = _RequestException('not-used', raw_content)

    with self.assertRaises(TypeError):
      _ = e.error_code

    self.assertEquals(e.status, 'not-used')
    self.assertEquals(e.content, raw_content)
    self.assertEquals(e.message, raw_content)


if __name__ == '__main__':
  unittest.main()
