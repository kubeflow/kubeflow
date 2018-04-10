local cmd = import "mmlib/v0.1.2/cmd/cmd.libsonnet";
local service_google = import "mmlib/v0.1.2/service/google.libsonnet";
local cassandra = import "mmlib/v0.1.2/db/cassandra.libsonnet";
local web = import "mmlib/v0.1.2/web/web.libsonnet";
local web_solutions = import "mmlib/v0.1.2/web/solutions.libsonnet";

{
    local app = self,

    cassandraUser:: "fractal",
    dnsSuffix:: error "Must override dnsSuffix",
    cassandraUserPass:: error "Must override cassandraUserPass",
    cassandraRootPass:: error "Must override cassandraRootPass",
    cassandraKeyspace:: "fractal",
    cassandraNodes:: ["fractal-db-n1", "fractal-db-n2", "fractal-db-n3", "fractal-db-n4", "fractal-db-n5"],
    tilegenPort:: 8080,

    // Configuration shared by the application server and tile generation nodes.
    ApplicationConf:: {
        width: 256,
        height: 256,
        thumb_width: 64,
        thumb_height: 64,
    },

    BaseInstanceMixin:: {
        StandardRootImage+: {
            local network_debug = ["traceroute", "lsof", "iptraf", "tcpdump", "host", "dnsutils"],
            aptPackages+: ["vim", "git", "psmisc", "screen", "strace"] + network_debug,
        },
    },


    zone: service_google.DnsZone {
        dnsName: app.dnsSuffix,
    },

    www: service_google.DnsRecordWww {
        zone: app.zone,
        zoneName: "fractal-zone",
        target: "fractal-appserv",
    },

    network: service_google.Network {
        ipv4Range: "10.10.0.0/16",
    },

    appserv: service_google.Cluster3 + web.HttpService3 + web_solutions.DebianFlaskHttpService {

        local service = self,
        dnsZone: app.zone,
        dnsZoneName: "fractal-zone",

        networkName: $.network.refName("fractal-network"),

        Instance+: $.BaseInstanceMixin {
            StandardRootImage+: {
                pipPackages+: ["httplib2", "cassandra-driver", "blist"],
            },
            local version = self,
            conf:: app.ApplicationConf {
                database: app.cassandraKeyspace,
                db_endpoints: app.cassandraNodes,
                database_name: app.cassandraKeyspace,
                database_user: app.cassandraUser,
                database_pass: app.cassandraUserPass,
                tilegen_port: app.tilegenPort,
            },
            module: "main",  // Entrypoint in the Python code.
            uwsgiConf+: { lazy: "true" },  // cassandra-driver does not survive fork()
            // Copy website content and code.
            httpContentCmds+: [
                "echo '%s tilegen' >> /etc/hosts" % app.tilegen.refAddress("fractal-tilegen"),
                cmd.CopyFile { from: std.resolvePath(std.thisFile, "appserv/*"), to: "/var/www" },
                cmd.LiteralFile { content: std.toString(version.conf), to: "/var/www/conf.json" },
            ],
        },
    },

    tilegen: service_google.Cluster3 + web.HttpService3 + web_solutions.DebianFlaskHttpService {
        local service = self,
        dnsZone: app.zone,
        dnsZoneName: "fractal-zone",

        networkName: $.network.refName("fractal-network"),

        httpPort: app.tilegenPort,
        Instance+: $.BaseInstanceMixin {
            StandardRootImage+: {
                aptPackages+: ["g++", "libpng-dev"],
            },
            local version = self,
            srcDir:: "tilegen3",
            conf:: app.ApplicationConf {
                iters: 200,
            },
            module: "mandelbrot_service",
            httpContentCmds+: [
                cmd.CopyFile { from: std.resolvePath(std.thisFile, "tilegen/*"), to: "/var/www" },
                "g++ -Wall -Wextra -ansi -pedantic -O3 -ffast-math -g /var/www/mandelbrot.cpp -lpng -o /var/www/mandelbrot",
                cmd.LiteralFile { content: std.toString(version.conf), to: "/var/www/conf.json" },
            ],
        },
    },

    db: cassandra.GcpDebianCassandra {
        local db = self,
        dnsZone: app.zone,
        dnsZoneName: "fractal-zone",

        networkName: $.network.refName("fractal-network"),

        clusterName: "fractal-cluster",
        rootPassword: app.cassandraRootPass,

        cassandraConf+: {
            rpc_address:: null,  // Unset by making it hidden (::).
            listen_address:: null,  // Unset by making it hidden (::).
            authenticator: "PasswordAuthenticator",
            seed_provider: [
                {
                    class_name: "org.apache.cassandra.locator.SimpleSeedProvider",
                    parameters: [{ seeds: std.join(", ", app.cassandraNodes) }],
                },
            ],
        },

        FractalStarterMixin:: {
            local cql_insert(uuid, x, y, l, n) =
                "INSERT INTO discoveries (Date, TimeId, X, Y, L, Text) "
                + ("VALUES ('FIXED', %s, %s, %s, %s, '%s');" % [uuid, x, y, l, n]),

            initCql: [
                "CREATE USER %s WITH PASSWORD '%s';" % [app.cassandraUser, app.cassandraUserPass],
                "CREATE KEYSPACE %s WITH REPLICATION = %s;" % [app.cassandraKeyspace, self.initReplication],
                "USE %s;" % app.cassandraKeyspace,
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
        },

        StarterNode+: $.BaseInstanceMixin + self.FractalStarterMixin,
        TopUpNode+: $.BaseInstanceMixin,

        nodes: {
            n1: db.StarterNode {
                initReplicationFactor: 1,
            },
        },
    },
}
