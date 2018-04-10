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

import numbers
import re


class ConfigError (Exception):
    note = None


def render_path(path):
    if isinstance(path, basestring):
        return path
    def aux(p):
        if not isinstance(p, basestring):
            return '[%d]' % p
        return ('.%s' if _isidentifier(p) else '["%s"]') % p
    return '$' + ''.join([aux(p) for p in path])


# Utilities

def err(path, msg):
    raise ConfigError('%s: %s' % (render_path(path), msg))

_KEYWORDS = {
    'import', 'importstr', 'function', 'self', 'super', 'assert', 'if', 'then',
    'else', 'for', 'in', 'local', 'tailstrict', 'true', 'false', 'null', 'error',
}

def _isidentifier(name):
    return name not in _KEYWORDS and re.match("[_A-Za-z_][_a-zA-Z0-9]*$", name)

_TYPE_FROM_STR = {
    'null': type(None),
    'bool': bool,
    'number': numbers.Number,
    'object': dict,
    'array': list,
    'string': basestring,
}

def _type_err(v):
    if isinstance(v, basestring):
        return '"%s"' % v
    if isinstance(v, numbers.Number):
        return '%s' % v
    if isinstance(v, bool):
        return '%s' % v
    return _type_str(v)

def _type_str(v):
    if v is None:
        return 'null'
    if isinstance(v, basestring):
        return 'string'
    if isinstance(v, dict):
        return 'object'
    if isinstance(v, list):
        return 'array'
    if isinstance(v, numbers.Number):
        return 'number'
    if isinstance(v, bool):
        return 'bool'

class _Empty:
    pass

_NO_DEFAULT = _Empty()

# Return the value obtained by resolving the path from root.  If the value does not exist in the
# last object, create it using the default and return that instead.
def _resolve_path(root, path, default=_NO_DEFAULT):
    for i, v in enumerate(path):
        if isinstance(root, dict) and i == len(path) - 1:
            if v not in root and default != _NO_DEFAULT:
                root[v] = default
        root = root[v]
    return root

# Validators

def is_string_map(v):
    msg = is_type('object')(v)
    if msg:
        return msg
    for k, v2 in v.iteritems():
        if not isinstance(v2, basestring):
            return 'Expected field %s type to be string but got %s' % (k, _type_err(v2))

# Validator generating functions.

# Pretty-print a small set of strings.
def _set_str(s):
    return '{%s}' % ', '.join(sorted(s))

def is_any_type(types):
    def check(v):
        if _type_str(v) not in types:
            return 'Expected type to be one of %s but found %s' % (_set_str(types), _type_err(v))
    return check

def is_type(t):
    def check(v):
        if _type_str(v) != t:
            return 'Expected type %s but found %s' % (t, _type_err(v))
    return check

def is_value(expected):
    def check(v):
        if v != expected:
            return 'Expected value %s, got %s' % (expected, v)
    return check

def is_any_value(expected):
    def check(v):
        if v not in expected:
            return 'Expected value to be one of %s, got %s' % (_set_str(expected), v)
    return check


# User-friendly validation routines:

# You can just give a type name in place of a function.
def _sanitize_func(func):
    if isinstance(func, basestring):
        return is_type(func)
    return func

# Ensure path validates by func.  If not proesent, inserts default.
def path_val(root, path, func, default=None):
    func = _sanitize_func(func)
    v = _resolve_path(root, path, default)
    msg = func(v)
    if msg is not None:
        err(path, msg)
    return v

# Ensure path is an array and all elements validate by element_func.
def array(root, path, element_func, default):
    v = path_val(root, path, 'array', default)
    element_func = _sanitize_func(element_func)
    for i, el in enumerate(v):
        path_val(root, path + [i], element_func)
    return v

# Ensure path is an object and only has the given fields.  If not present, inserts
# default.
def obj_only(root, path, fields, default=None):
    v = path_val(root, path, 'object', default)
    for field in v:
        if field not in fields:
            err(path, 'Unexpected field: %s' % field)
    return v
