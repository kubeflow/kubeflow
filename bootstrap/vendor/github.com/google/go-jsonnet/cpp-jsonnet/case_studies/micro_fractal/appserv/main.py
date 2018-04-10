# Copyright 2015 Google Inc. All rights reserved.
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


"""Frontend for Fractal demo.

Application server for a 3 tier web app.  Submits fractal image generation
requests.  Manages metadata database.  Renders pages with Jinja2.
"""

import datetime
import json
import os
import socket
import sys
import time
import uuid

import flask
import httplib2
import jinja2

from cassandra.auth import PlainTextAuthProvider
from cassandra.cluster import Cluster
from cassandra.cluster import NoHostAvailable

CONF = None
for i in xrange(1, 60):
    try:
        with open('conf.json') as conf_file:
            CONF = json.load(conf_file)
    except IOError:
        time.sleep(1)


if CONF == None:
    sys.stderr.write('ERROR: Could not open conf.json.')
    sys.exit(1)

TILEGEN_ADDR = socket.gethostbyname('tilegen')


class DbError(Exception):
    def __init__(self, msg):
        self.msg = msg
    def __str__(self):
        return self.msg


session = None


app = flask.Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def render_error(code, msg):
    return flask.make_response(my_render_template('error.html', code=code, msg=msg), code)


def db_execute(s, t=()):
    global session
    if session == None:
        try:
            ap = PlainTextAuthProvider(username=CONF['database_user'],
                                       password=CONF['database_pass'])
            cluster = Cluster(CONF['db_endpoints'], auth_provider=ap)
            session = cluster.connect()
            session.set_keyspace(CONF['database_name'])
            return session.execute(s, t)
        except NoHostAvailable:
            session = None
            raise DbError("Unable to contact database backend.")
    else:
        try:
            return session.execute(s, t)
        except NoHostAvailable:
            session = None
            return db_execute(s, t)

def my_render_template(filename, **context):
    context.update(CONF)
    context['tilegen_addr'] = TILEGEN_ADDR
    return flask.render_template(filename, **context)

def db_clear():
    db_execute('TRUNCATE discoveries;')

def db_partition(dt):
    #return "%04d-%02d-%02d" % (dt.year, dt.month, dt.day)
    return "FIXED"

def db_remember(text, x, y, level):
    u = uuid.uuid1()
    dt = datetime.datetime.fromtimestamp((u.time - 0x01b21dd213814000L)*100/1e9)
    db_execute("INSERT INTO discoveries (Date, TimeId, X, Y, L, Text)"
                    + " VALUES (%s, %s, %s, %s, %s, %s)",
                    (db_partition(dt), u, x, y, level, text))

def db_list():
    latest = []
    # Keep executing calls until we find 10 or we reach 2013
    day_counter = datetime.datetime.now()
    last_partition = None
    while len(latest) < 10 and day_counter >= datetime.datetime(2013, 1, 1):
        curr_partition = db_partition(day_counter)
        if last_partition != curr_partition:
            last_partition = curr_partition
            q = "SELECT * FROM discoveries WHERE Date = '%s' ORDER BY TimeId DESC limit 10;"
            rows = db_execute(q % curr_partition)
            for row in rows:
                u = row[1]
                dt = datetime.datetime.fromtimestamp((u.time - 0x01b21dd213814000L)*100/1e9)

                latest += [
                    {'text': row[3], 'x': row[4], 'y': row[5], 'l': row[2], 'ts': dt.isoformat()}
                ]
        day_counter -= datetime.timedelta(1)
    return latest


@app.route("/")
def default_handler():
    return my_render_template('page.html')


@app.route("/clear_db")
def cleardb_handler():
    try:
        db_clear()
        return 'Done'
    except DbError as dbe:
        return render_error(500, "Internal error: " + dbe.msg)


@app.route("/remember", methods=['POST'])
def remember_handler():
    try:
        j = flask.request.json
        x = j['x']
        y = j['y']
        level = j['l']
        text = j['text'][:50]
        if x < -2: x = -2
        if x > 2: x = 2
        if y < -2: y = -2
        if y > 2: y = 2
        if level < 0: level = 0
        if level > 50: level = 50
        db_remember(text, x, y, level)
        return 'Done'
    except DbError as dbe:
        return render_error(500, "Internal error: " + dbe.msg)


@app.route("/remembered_list")
def remembered_list_handler():
    try:
        latest = db_list()
        return flask.jsonify(latest=latest)
    except DbError as dbe:
        return render_error(500, "Internal error: " + dbe.msg)


@app.errorhandler(404)
def error_404(error):
    return render_error(404, 'Nothing at this URL.')


@app.errorhandler(500)
def error_500(error):
    return render_error(500, 'Internal error')


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
