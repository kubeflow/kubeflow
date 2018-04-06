# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import unittest

import _jsonnet


#  Returns content if worked, None if file not found, or throws an exception
def try_path(dir, rel):
    if not rel:
        raise RuntimeError('Got invalid filename (empty string).')
    if rel[0] == '/':
        full_path = rel
    else:
        full_path = dir + rel
    if full_path[-1] == '/':
        raise RuntimeError('Attempted to import a directory')

    if not os.path.isfile(full_path):
        return full_path, None
    with open(full_path) as f:
        return full_path, f.read()


def import_callback(dir, rel):
    full_path, content = try_path(dir, rel)
    if content:
        return full_path, content
    raise RuntimeError('File not found')


# Test native extensions
def concat(a, b):
    return a + b


def return_types():
    return {
        'a': [1, 2, 3, None, []],
        'b': 1.0,
        'c': True,
        'd': None,
        'e': {
            'x': 1,
            'y': 2,
            'z': ['foo']
        },
    }

native_callbacks = {
    'concat': (('a', 'b'), concat),
    'return_types': ((), return_types),
}


class JsonnetTests(unittest.TestCase):
    def setUp(self):
        self.input_filename = os.path.join(
            os.path.dirname(__file__),
            "test.jsonnet",
        )
        self.expected_str = "true\n"
        with open(self.input_filename, "r") as infile:
            self.input_snippet = infile.read()

    def test_evaluate_file(self):
        json_str = _jsonnet.evaluate_file(
            self.input_filename,
            import_callback=import_callback,
            native_callbacks=native_callbacks,
        )
        self.assertEqual(json_str, self.expected_str)

    def test_evaluate_snippet(self):
        json_str = _jsonnet.evaluate_snippet(
            "snippet",
            self.input_snippet,
            import_callback=import_callback,
            native_callbacks=native_callbacks,
        )
        self.assertEqual(json_str, self.expected_str)

if __name__ == '__main__':
    unittest.main()
