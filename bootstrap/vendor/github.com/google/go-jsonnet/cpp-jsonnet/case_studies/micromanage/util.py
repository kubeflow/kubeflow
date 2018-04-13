
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

import datetime
import json

def jsonstr(v):
    return json.dumps(v, sort_keys=True, indent=4, separators=(',', ': '))

def utc_now():
    class UTC(datetime.tzinfo):
      def utcoffset(self, dt):
        return datetime.timedelta(0)
      def tzname(self, dt):
        return "UTC"
      def dst(self, dt):
        return datetime.timedelta(0)
    now = datetime.datetime.now(UTC())


# Merge b into a, prefering b on conflicts
def merge_into(a, b):
    for k, v in b.iteritems():
        a[k] = v
