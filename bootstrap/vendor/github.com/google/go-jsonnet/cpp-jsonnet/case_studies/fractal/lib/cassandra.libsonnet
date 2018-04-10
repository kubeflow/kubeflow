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

local packer = import "packer.libsonnet";

{
    local cassandra = self,

    // The default Cassandra configuration.  Override what you want to change.
    conf:: {
        authenticator: "AllowAllAuthenticator",
        authorizer: "AllowAllAuthorizer",
        auto_snapshot: true,
        batch_size_warn_threshold_in_kb: 5,
        batchlog_replay_throttle_in_kb: 1024,
        cas_contention_timeout_in_ms: 1000,
        client_encryption_options: {
            enabled: false,
            keystore: "conf/.keystore",
            keystore_password: "cassandra",
        },
        cluster_name: "Unnamed Cluster",
        column_index_size_in_kb: 64,
        commit_failure_policy: "stop",
        commitlog_directory: "/var/lib/cassandra/commitlog",
        commitlog_segment_size_in_mb: 32,
        commitlog_sync: "periodic",
        commitlog_sync_period_in_ms: 10000,
        compaction_throughput_mb_per_sec: 16,
        concurrent_counter_writes: 32,
        concurrent_reads: 32,
        concurrent_writes: 32,
        counter_cache_save_period: 7200,
        counter_cache_size_in_mb: null,
        counter_write_request_timeout_in_ms: 5000,
        cross_node_timeout: false,
        data_file_directories: ["/var/lib/cassandra/data"],
        disk_failure_policy: "stop",
        dynamic_snitch_badness_threshold: 0.1,
        dynamic_snitch_reset_interval_in_ms: 600000,
        dynamic_snitch_update_interval_in_ms: 100,
        endpoint_snitch: "SimpleSnitch",
        hinted_handoff_enabled: true,
        hinted_handoff_throttle_in_kb: 1024,
        incremental_backups: false,
        index_summary_capacity_in_mb: null,
        index_summary_resize_interval_in_minutes: 60,
        inter_dc_tcp_nodelay: false,
        internode_compression: "all",
        key_cache_save_period: 14400,
        key_cache_size_in_mb: null,
        listen_address: "localhost",
        max_hint_window_in_ms: 10800000,
        max_hints_delivery_threads: 2,
        memtable_allocation_type: "heap_buffers",
        native_transport_port: 9042,
        num_tokens: 256,
        partitioner: "org.apache.cassandra.dht.Murmur3Partitioner",
        permissions_validity_in_ms: 2000,
        range_request_timeout_in_ms: 10000,
        read_request_timeout_in_ms: 5000,
        request_scheduler: "org.apache.cassandra.scheduler.NoScheduler",
        request_timeout_in_ms: 10000,
        row_cache_save_period: 0,
        row_cache_size_in_mb: 0,
        rpc_address: "localhost",
        rpc_keepalive: true,
        rpc_port: 9160,
        rpc_server_type: "sync",
        saved_caches_directory: "/var/lib/cassandra/saved_caches",
        seed_provider: [
            {
                class_name: "org.apache.cassandra.locator.SimpleSeedProvider",
                parameters: [{ seeds: "127.0.0.1" }],
            },
        ],
        server_encryption_options: {
            internode_encryption: "none",
            keystore: "conf/.keystore",
            keystore_password: "cassandra",
            truststore: "conf/.truststore",
            truststore_password: "cassandra",
        },
        snapshot_before_compaction: false,
        ssl_storage_port: 7001,
        sstable_preemptive_open_interval_in_mb: 50,
        start_native_transport: true,
        start_rpc: true,
        storage_port: 7000,
        thrift_framed_transport_size_in_mb: 15,
        tombstone_failure_threshold: 100000,
        tombstone_warn_threshold: 1000,
        trickle_fsync: false,
        trickle_fsync_interval_in_kb: 10240,
        truncate_request_timeout_in_ms: 60000,
        write_request_timeout_in_ms: 2000,
    },

    // Some firewall resources to open up Cassandra ports.
    GcpFirewall:: {
        cassandraTag:: "cassandra-server",
        source_ranges: ["0.0.0.0/0"],
        network: error "cassandra.GcpFirewall must have field: network",
        allow: { protocol: "tcp", ports: ["9042", "9160"] },
        // From the Internet to these ports.
        target_tags: [self.cassandraTag],
    },
    GcpFirewallGossip:: {
        cassandraTag:: "cassandra-server",
        source_ranges: ["0.0.0.0/0"],
        network: error "cassandra.GcpFirewallGossip must have field: network",
        allow: { protocol: "tcp", ports: ["7000", "7001", "7199"] },
        // From these machines amongst themselves.
        source_tags: [self.cassandraTag],
        target_tags: [self.cassandraTag],
    },

    // Sets the root password to something, while the server is listening only on localhost.
    GcpDebianImage: packer.GcpDebianImage {
        local image = self,

        rootPassword:: error "GcpDebianCassandraPrimedImage: must have field: rootPassword",
        clusterName:: error "GcpDebianCassandraPrimedImage: must have field: clusterName",

        aptKeyUrls+: ["https://www.apache.org/dist/cassandra/KEYS"],
        aptRepoLines+: {
            cassandra: "deb http://www.apache.org/dist/cassandra/debian 21x main",
        },
        aptPackages+: ["cassandra"],

        conf:: cassandra.conf {
            authenticator: "PasswordAuthenticator",
            cluster_name: image.clusterName,
        },

        provisioners+: [
            packer.RootShell {
                inline: [
                    // Shut it down
                    "/etc/init.d/cassandra stop",
                    // Remove junk from unconfigured startup
                    "rm -rfv /var/lib/cassandra/*",
                    // Enable authentication
                    local dest = "/etc/cassandra/cassandra.yaml";
                    "echo %s > %s" % [std.escapeStringBash("" + image.conf), dest],
                    // Start it up again
                    "/etc/init.d/cassandra start",
                    // Wait for it to be ready
                    cassandra.waitForCqlsh("cassandra", "cassandra", "localhost"),
                    // Set root password
                    local cql = "ALTER USER cassandra WITH PASSWORD '%s';" % image.rootPassword;
                    "echo %s | cqlsh -u cassandra -p cassandra" % std.escapeStringBash(cql),
                ],
            },
        ],
    },

    // A line of bash that will wait for a Cassandra service to be "up".
    waitForCqlsh(user, pass, host)::
        "while ! echo show version | cqlsh -u %s -p %s %s ; do sleep 1; done" % [user, pass, host],

    // A line of bash that will wait for the given port to accept connections.
    waitForSeed(host, port)::
        "while ! nc %s %d < /dev/null; do sleep 1; done" % [host, port],

    // This mixin is intended to be used on a Google Cloud Platform Instance based on the above
    // GcpDebianImage.  It adds commands to the startup script that bootstrap Cassandra using a
    // given CQL script and configuration.
    GcpStarterMixin: {

        startup_script+: [
            // Wait for the misconfigured cassandra to start up.
            cassandra.waitForCqlsh("cassandra", self.rootPass, "localhost"),

            // Set up system_auth replication level
            "echo %s | cqlsh -u cassandra -p %s localhost"
            % [std.escapeStringBash("ALTER KEYSPACE system_auth WITH REPLICATION = %s;"
                                    % self.authReplication),
               self.rootPass],

            // Drop in the correct configuration.
            "echo %s > %s"
            % [std.escapeStringBash("" + self.conf), "/etc/cassandra/cassandra.yaml"],

            // Restart with new configuration.
            "/etc/init.d/cassandra restart",

            // Wait for the properly configured cassandra to start up and reach quorum.
            cassandra.waitForCqlsh("cassandra", self.rootPass, "$HOSTNAME"),

            // Set up users, empty tables, etc.
            "echo %s | cqlsh -u cassandra -p %s $HOSTNAME"
            % [std.escapeStringBash(std.lines(self.initCql)), self.rootPass],

        ],
    },

    // This mixin is intended to be used on a Google Cloud Platform Instance based on the above
    // GcpDebianImage.  It adds commands to the startup script that bootstrap Cassandra by wiping
    // its slate clean and allowing it to join an existing cluster.
    GcpTopUpMixin: {
        startup_script+: [
            // Wait for the misconfigured cassandra to start up.
            cassandra.waitForCqlsh("cassandra", self.rootPass, "localhost"),

            // Kill it.
            "/etc/init.d/cassandra stop",

            // Clean up the mess it caused due to being misconfigured.
            "rm -rf /var/lib/cassandra/*",

            // Drop in the correct configuration.
            "echo %s > %s"
            % [std.escapeStringBash("" + self.conf), "/etc/cassandra/cassandra.yaml"],

            // Start it up again.
            "/etc/init.d/cassandra start",
        ],
    },

}
