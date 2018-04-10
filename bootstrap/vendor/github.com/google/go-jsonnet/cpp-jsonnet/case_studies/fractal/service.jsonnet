/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Import some libraries
local packer = import "packer.libsonnet";
local terraform = import "terraform.libsonnet";
local cassandra = import "cassandra.libsonnet";

// Credentials file (don't commit this!)
local credentials = import "credentials.libsonnet";


function(ssh_username) {

    ///////////////////////////
    // GENERAL CONFIGURATION //
    ///////////////////////////

    local tilegenPort = 8080,

    local cassandraUser = "fractal",  // Password in credentials import.
    local cassandraKeyspace = "fractal",
    local cassandraReplication = "{ 'class' : 'SimpleStrategy', 'replication_factor' : 2 }",

    // These are the nodes the application server attempts to use (client-side load balancing).
    local cassandraNodes = ["db1", "db2", "db3", "db4", "db5"],

    // The Cassandra configuration file we use for this service.
    local cassandraConf = cassandra.conf {
        cluster_name: "Fractal Cluster",
        rpc_address:: null,  // Unset by making it hidden (::).
        listen_address:: null,  // Unset by making it hidden (::).
        authenticator: "PasswordAuthenticator",
        seed_provider: [
            {
                class_name: "org.apache.cassandra.locator.SimpleSeedProvider",
                parameters: [{ seeds: std.join(", ", cassandraNodes) }],
            },
        ],
    },

    // Create an initial (empty) database for storing 'discovered' fractal co-ordinates.
    local cql_insert(uuid, x, y, l, n) =
        "INSERT INTO discoveries (Date, TimeId, X, Y, L, Text) "
        + ("VALUES ('FIXED', %s, %s, %s, %s, '%s');" % [uuid, x, y, l, n]),

    local cassandraInitCql = [
        "CREATE USER %s WITH PASSWORD '%s';" % [cassandraUser, credentials.cassandraUserPass],
        "CREATE KEYSPACE %s WITH REPLICATION = %s;" % [cassandraKeyspace, cassandraReplication],
        "USE %s;" % cassandraKeyspace,
        "CREATE TABLE discoveries("
        + "Date TEXT, TimeId TIMEUUID, Text TEXT, X FLOAT, Y FLOAT, L INT, "
        + "PRIMARY KEY(Date, TimeId));",
        cql_insert("18063880-5a4d-11e4-ada4-247703d0f194", "0", "0", "0", "Zoomed Out"),
        cql_insert("66b6d100-5a53-11e4-aa05-247703d0f194",
                   "-1.21142578125", "0.3212890625", "4", "Lightning"),
        cql_insert("77ffdd80-5a53-11e4-8ccf-247703d0f194",
                   "-1.7568359375", "-0.0009765625", "5", "Self-similarity"),
        cql_insert("7fbf8200-5a53-11e4-804a-247703d0f194",
                   "0.342529296875", "0.419189453125", "5", "Windmills"),
        cql_insert("9ae7bd00-5a66-11e4-9c66-247703d0f194",
                   "-1.48309979046093", "0.00310595797955671", "39", "Star"),
        cql_insert("75fe4480-5a7c-11e4-a747-247703d0f194",
                   "-0.244976043701172", "0.716987609863281", "10", "Baroque"),
        cql_insert("abf70380-5b24-11e4-8a46-247703d0f194",
                   "-1.74749755859375", "0.009002685546875", "9", "Hairy windmills"),
    ],

    // Configuration shared by the application server and tile generation nodes.
    local ApplicationConf = {
        width: 256,
        height: 256,
        thumb_width: 64,
        thumb_height: 64,
        iters: 200,
        database: cassandraKeyspace,
        tilegen: "${google_compute_address.tilegen.address}:%d" % tilegenPort,
        db_endpoints: cassandraNodes,
    },

    ///////////////////////////
    // PACKER CONFIGURATIONS //
    ///////////////////////////

    // Some config used in every Packer image we create.
    local ImageMixin = {
        project_id: credentials.project,
        account_file: "service_account_key.json",

        // For debugging:
        local network_debug = ["traceroute", "lsof", "iptraf", "tcpdump", "host", "dnsutils"],
        aptPackages+: ["vim", "git", "psmisc", "screen", "strace"] + network_debug,
        sshUsername: ssh_username,
    },

    // Frontend image.
    "appserv.packer.json": packer.GcpDebianNginxUwsgiFlaskImage + ImageMixin {
        name: "appserv-v20150430-2145",
        module: "main",  // Entrypoint in the Python code.
        pipPackages+: ["httplib2", "cassandra-driver", "blist"],
        uwsgiConf+: { lazy: "true" },  // cassandra-driver does not survive fork()
        // Copy website content and code.
        provisioners+: [
            packer.File {
                source: "appserv",
                destination: "/tmp/",
            },
            packer.RootShell { inline: [
                "mv /tmp/appserv/* /var/www/",
                "chown -R www-data.www-data /var/www/*",
            ] },
        ],
    },

    // The Cassandra image is basic, but more configuration is done at deployment time.
    "cassandra.packer.json": cassandra.GcpDebianImage + ImageMixin {
        name: "cassandra-v20150430-2145",
        rootPassword: credentials.cassandraRootPass,
        clusterName: cassandraConf.cluster_name,
    },

    // Tile Generation node runs a C++ program to generate PNG tiles for the fractal.
    "tilegen.packer.json": packer.GcpDebianNginxUwsgiFlaskImage + ImageMixin {
        name: "tilegen-v20150430-2145",
        module: "mandelbrot_service",

        aptPackages+: ["g++", "libpng-dev"],

        port: tilegenPort,

        // Copy the flask handlers and also build the C++ executable.
        provisioners+: [
            packer.File {
                source: "tilegen",
                destination: "/tmp/",
            },
            packer.RootShell { inline: [
                "mv /tmp/tilegen/* /var/www/",
                "chown -R www-data.www-data /var/www/*",
            ] },
            packer.RootShell { inline: [
                "g++ -Wall -Wextra -ansi -pedantic -O3 -ffast-math -g "
                + "/var/www/mandelbrot.cpp -lpng -o /var/www/mandelbrot",
            ] },
        ],
    },


    /////////////////////////////
    // TERRAFORM CONFIGURATION //
    /////////////////////////////

    "terraform.tf": {

        // How to contact the Google Cloud Platform APIs.
        provider: {
            google: {
                account_file: "service_account_key.json",
                project: credentials.project,
                region: "us-central1",
            },
        },

        // The deployed resources.
        resource: {

            // Instances are assigned zones on a round robin scheme.
            local zone(hash) =
                local arr = [
                    "us-central1-c",
                    "us-central1-b",
                    "us-central1-f",
                ];
                arr[hash % std.length(arr)],

            // The internal subnet.
            google_compute_network: {
                fractal: {
                    name: "fractal",
                    ipv4_range: "10.0.0.0/16",
                },
            },

            // Publicly visible static ip addresses.
            google_compute_address: {
                appserv: { name: "appserv" },
                tilegen: { name: "tilegen" },
            },

            // The next 3 resource types configure load balancing for the appserv and tilegen.
            google_compute_http_health_check: {
                appserv: {
                    name: "appserv",
                    port: 80,
                },
                tilegen: {
                    name: "tilegen",
                    port: tilegenPort,
                },
            },

            google_compute_target_pool: {
                appserv: {
                    name: "appserv",
                    health_checks: ["${google_compute_http_health_check.appserv.name}"],
                    instances: ["%s/appserv%d" % [zone(k), k] for k in [1, 2, 3]],
                },
                tilegen: {
                    name: "tilegen",
                    health_checks: ["${google_compute_http_health_check.tilegen.name}"],
                    instances: ["%s/tilegen%d" % [zone(k), k] for k in [1, 2, 3, 4, 5]],
                },
            },

            google_compute_forwarding_rule: {
                appserv: {
                    ip_address: "${google_compute_address.appserv.address}",
                    name: "appserv",
                    target: "${google_compute_target_pool.appserv.self_link}",
                    port_range: "80",
                },
                tilegen: {
                    ip_address: "${google_compute_address.tilegen.address}",
                    name: "tilegen",
                    target: "${google_compute_target_pool.tilegen.self_link}",
                    port_range: tilegenPort,
                },
            },

            // Open ports for the various services, to instances (identified by tags)
            google_compute_firewall: {
                local NetworkMixin = { network: "${google_compute_network.fractal.name}" },
                ssh: terraform.GcpFirewallSsh + NetworkMixin { name: "ssh" },
                appserv: terraform.GcpFirewallHttp + NetworkMixin { name: "appserv" },
                tilegen: terraform.GcpFirewallHttp + NetworkMixin { name: "tilegen", port: tilegenPort },
                cassandra: cassandra.GcpFirewall + NetworkMixin { name: "cassandra" },
                gossip: cassandra.GcpFirewallGossip + NetworkMixin { name: "gossip" },
            },

            // All our instances share this configuration.
            local FractalInstance(zone_hash) = terraform.GcpInstance {
                network_interface: [super.network_interface[0] { network: "${google_compute_network.fractal.name}" }],
                tags+: ["fractal"],
                zone: zone(zone_hash),
                scopes+: ["devstorage.full_control"],
            },

            // The various kinds of Cassandra instances all share this basic configuration.
            local CassandraInstance(zone_hash) = FractalInstance(zone_hash) {
                image: "cassandra-v20150430-2145",
                machine_type: "n1-standard-1",
                tags+: ["fractal-db", "cassandra-server"],
                user:: cassandraUser,
                userPass:: credentials.cassandraUserPass,
                rootPass:: credentials.cassandraRootPass,
                conf:: cassandraConf,
            },

            google_compute_instance: {

                // The application server instances have database credentials and the address of the
                // tilegen loadbalancer.  This is all stored in a conf.json, read by the python
                // code.
                ["appserv" + k]: FractalInstance(k) {
                    name: "appserv" + k,
                    image: "appserv-v20150430-2145",
                    conf:: ApplicationConf {
                        database_name: cassandraKeyspace,
                        database_user: cassandraUser,
                        database_pass: credentials.cassandraUserPass,
                    },
                    tags+: ["fractal-appserv", "http-server"],
                    startup_script+: [self.addFile(self.conf, "/var/www/conf.json")],
                }
                for k in [1, 2, 3]

            } + {

                // Bootstrapping the Cassandra database is a little subtle.  We bring up 3 nodes
                // in parallel, one of which is special and creates the initial database.  The other
                // two join it.  Note the two different mixins used to control that behavior.

                db1: CassandraInstance(1) + cassandra.GcpStarterMixin {
                    name: "db1",
                    // Replication of the system_auth table (user credentials).
                    authReplication:: cassandraReplication,
                    // The CQL code is used to bootstrap the database.
                    initCql:: cassandraInitCql,
                },

                // TopUpMixin creates an empty Cassandra node which can join an existing cluster.
                db2: CassandraInstance(2) + cassandra.GcpTopUpMixin {
                    name: "db2",
                },

                db3: CassandraInstance(3) + cassandra.GcpTopUpMixin {
                    name: "db3",
                },

                // To increase the size of the cluster, these can be used.  Bring them up one by one
                // verifying the state of the database each time by logging onto an existing db node
                // and running "nodetool status fractal".  To reduce the size of the cluster, use
                // nodetool -h $HOST decommission and then remove the node from this configuration.
                // If a node is removed without decommissioning, fix the cluster with nodetool
                // removenode <UUID>.  It is possible to completely recycle the nodes (including the
                // first node) without data loss as long as nodetool is used judiciously.
                /*
                db4: CassandraInstance(4) + cassandra.GcpTopUpMixin {
                    name: "db4",
                },
                */

            } + {
                // The tile generation instances are similar to the application server ones, but do
                // not require database credentials so these are omitted for security.
                ["tilegen" + k]: FractalInstance(k) {
                    name: "tilegen" + k,
                    image: "tilegen-v20150430-2145",
                    tags+: ["fractal-tilegen", "http-server"],
                    startup_script+: [self.addFile(ApplicationConf, "/var/www/conf.json")],
                }
                for k in [1, 2, 3, 4]
            },

            google_dns_managed_zone: {
                "fractaldemo-com": {
                    name: "fractaldemo-com",
                    dns_name: credentials.dnsPrefix + "fractaldemo.com.",
                    description: "Fractal Demo DNS Zone",
                },
            },

            local instances = self.google_compute_instance,
            local addresses = self.google_compute_address,

            local DnsRecord = {
                managed_zone: "${google_dns_managed_zone.fractaldemo-com.name}",
                type: "A",
                ttl: 300,
            },

            google_dns_record_set: {
                [name]: DnsRecord {
                    name: name + ".${google_dns_managed_zone.fractaldemo-com.dns_name}",
                    rrdatas: ["${google_compute_address." + name + ".address}"],
                } for name in std.objectFields(addresses)
            } + {
                [name]: DnsRecord {
                    name: name + ".${google_dns_managed_zone.fractaldemo-com.dns_name}",
                    rrdatas: ["${google_compute_instance." + name + ".network_interface.0.access_config.0.nat_ip}"],
                } for name in std.objectFields(instances)
            } + {
                www: {
                    managed_zone: "${google_dns_managed_zone.fractaldemo-com.name}",
                    name: "www.${google_dns_managed_zone.fractaldemo-com.dns_name}",
                    type: "CNAME",
                    ttl: 300,
                    rrdatas: ["appserv.${google_dns_managed_zone.fractaldemo-com.dns_name}"],
                },
                zone: {
                    managed_zone: "${google_dns_managed_zone.fractaldemo-com.name}",
                    name: "${google_dns_managed_zone.fractaldemo-com.dns_name}",
                    type: "A",
                    ttl: 300,
                    rrdatas: ["${google_compute_address.appserv.address}"],
                },
            },

        },

        output: {
            frontend: { value: "${google_compute_address.appserv.address}" },
        },

    },  // terraform.tf

}
