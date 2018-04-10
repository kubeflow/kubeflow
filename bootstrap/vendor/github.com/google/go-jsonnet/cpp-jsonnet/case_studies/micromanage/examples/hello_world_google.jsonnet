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

local service_amazon = import "mmlib/v0.1.1/service/amazon.libsonnet";
local service_google = import "mmlib/v0.1.1/service/google.libsonnet";
local web = import "mmlib/v0.1.1/web/web.libsonnet";
local web_solutions = import "mmlib/v0.1.1/web/solutions.libsonnet";

{
    environments: {
        default: {
            kind: "Google",
            project: "readable-name-123",  // Change this.
            region: "us-central1",  // Maybe change this.
            // Download this file from the developers console.
            serviceAccount: import "service_account.json",
            sshUser: "yourusername",  // Change this.
        },
    },

    // Simple case -- one machine serving this Python script.
    helloworld: service_google.SingleInstance + web.HttpSingleInstance
                + web_solutions.DebianFlaskHttpService {
        zone: "us-central1-f",
        uwsgiModuleContent: |||
            import flask
            import socket
            app = flask.Flask(__name__) 
            @app.route('/') 
            def hello_world():
                return 'Hello from %s!' % socket.gethostname()
        |||,
    },

    // For production -- allows canarying changes, also use a dns zone
    helloworld2: service_google.Cluster3 + web.HttpService3
                 + web_solutions.DebianFlaskHttpService {
        local service = self,
        httpPort: 8080,
        zones: ["us-central1-b", "us-central1-c", "us-central1-f"],
        versions: {
            v1: service.Instance {
                uwsgiModuleContent: |||
                    import flask
                    import socket
                    app = flask.Flask(__name__) 
                    @app.route('/') 
                    def hello_world():
                        return 'Hello from %s!' % socket.gethostname()
                |||,
            },
            v2: service.Instance {
                uwsgiModuleContent: |||
                    import flask
                    import socket
                    app = flask.Flask(__name__) 
                    @app.route('/') 
                    def hello_world():
                        return 'Greetings from %s!' % socket.gethostname()
                |||,
            },
        },
        deployment: {
            v1: {
                deployed: [1, 2, 3],
                attached: [1, 2, 3],
            },
            v2: {
                deployed: [1],
                attached: [1],
            },
        },

        // dnsZone: $.dns,
        // dnsZoneName: "dns",
    },

    /*
    dns: service_google.DnsZone {
        local service = self,
        dnsName: "hw.example.com.",
    },

    // If you own a domain, enable this and the zone service below, then create an NS record to
    // the allocated nameserver.
    www: service_google.DnsRecordWww {
        zone: $.dns,
        zoneName: "dns",
        target: "helloworld2",
    },
    */

}
