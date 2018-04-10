#!/usr/bin/python

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


"""Serve fractal images over HTTP by calling out to mandelbrot.
"""

import json
import math
import os
import subprocess
import sys
import time

import flask

app = flask.Flask(__name__)

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


@app.route("/")
def handle_fractal():
    """Get fractal coordinates from query string, call mandelbrot to generate image.

    Returns:
        The image, wrapped in an HTML response.
    """

    level = int(flask.request.args.get("l", "0"))
    x = float(int(flask.request.args.get("x", "0")))
    y = float(int(flask.request.args.get("y", "0")))

    if level < 0:
        level = 0

    grid_size = math.pow(2, level)

    x0 = "%.30g" % ((x - 0) / grid_size)
    y0 = "%.30g" % ((y - 0) / grid_size)
    x1 = "%.30g" % ((x + 1) / grid_size)
    y1 = "%.30g" % ((y + 1) / grid_size)

    print "Tile: %s %s %s %s" % (x0, y0, x1, y1)

    width = str(CONF['width'])
    height = str(CONF['height'])
    iters = str(CONF['iters'])

    cmd = ['./mandelbrot', width, height, iters, x0, y0, x1, y1]
    image_data = subprocess.check_output(cmd)

    response = flask.make_response(image_data)
    response.headers["Content-Type"] = "image/png"
    response.headers["cache-control"] = "public, max-age=600"

    return response

@app.route("/thumb")
def handle_thumb():
    """Get fractal coordinates from query string, call mandelbrot to generate image.

    Returns:
        The image, wrapped in an HTML response.
    """

    level = int(flask.request.args.get("l", "0"))
    x = float(flask.request.args.get("x", "0"))
    y = float(flask.request.args.get("y", "0"))

    if level < 0:
        level = 0

    grid_size = math.pow(2, -level)

    x0 = "%.30g" % (x - 1.5*grid_size)
    y0 = "%.30g" % (y - 1.5*grid_size)
    x1 = "%.30g" % (x + 1.5*grid_size)
    y1 = "%.30g" % (y + 1.5*grid_size)

    print "Thumbnail: %s %s %s %s" % (x0, y0, x1, y1)

    width = str(CONF['thumb_width'])
    height = str(CONF['thumb_height'])
    iters = str(CONF['iters'])

    cmd = ['./mandelbrot', width, height, iters, x0, y0, x1, y1]
    image_data = subprocess.check_output(cmd)

    response = flask.make_response(image_data)
    response.headers["Content-Type"] = "image/png"
    response.headers["cache-control"] = "public, max-age=600"

    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
