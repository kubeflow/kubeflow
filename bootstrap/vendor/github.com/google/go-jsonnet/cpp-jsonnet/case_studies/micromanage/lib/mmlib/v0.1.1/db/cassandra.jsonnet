local service_google = import "../service/google.jsonnet";
local service_amazon = import "../service/amazon.jsonnet";

// TODO(dcunnin): Separate into 5 mixins:
// 1) mixins that sets up cassandra via 1) grabbing JAR from cassandra.org, 2) using Debian
// 2) mixins that sets up infrastructure on 1) GCP 2) AWS
// 3) mixin that does the common stuff (different types of nodes, cassandra bootstrap)

{

    // Unchanged from Cassandra distribution
    DefaultConf:: {
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

    // A line of bash that will wait for a Cassandra service to be "up".
    local wait_for_cqlsh(user, pass, host) =
        "while ! echo show version | cqlsh -u %s -p %s %s ; do sleep 1; done" % [user, pass, host],

    local StandardNodeMixin = {
        local node = self,

        rootPassword:: error "Needs 'rootPassword'",

        conf:: error "Needs 'conf'",

        StandardRootImage+: {
            aptKeyUrls+: ["https://www.apache.org/dist/cassandra/KEYS"],
            aptRepoLines+: {
                cassandra: "deb http://www.apache.org/dist/cassandra/debian 21x main",
            },
            aptPackages+: ["cassandra"],

            local bootstrap_conf = $.DefaultConf {
                authenticator: "PasswordAuthenticator",
            },

            cmds+: [
                // Shut it down
                "/etc/init.d/cassandra stop",
                // Remove junk from unconfigured startup
                "rm -rfv /var/lib/cassandra/*",
                // Enable authentication
                local dest = "/etc/cassandra/cassandra.yaml";
                "echo %s > %s" % [std.escapeStringBash("" + bootstrap_conf), dest],
                // Start it up again (for some reason 'start' does not do anything...)
                "/etc/init.d/cassandra restart",
                // Wait for it to be ready
                wait_for_cqlsh("cassandra", "cassandra", "localhost"),
                // Set root password
                local cql = "ALTER USER cassandra WITH PASSWORD '%s';" % node.rootPassword;
                "echo %s | cqlsh -u cassandra -p cassandra" % std.escapeStringBash(cql),

            ],
        },
    },

    // Bootstraps the database.
    StarterNodeMixin:: StandardNodeMixin {
        initReplicationFactor:: error "Needs 'initReplicationFactor'",
        initCql:: [],
        initReplication::
            "{ 'class' : 'SimpleStrategy', 'replication_factor' : %d }"
            % self.initReplicationFactor,
        initAuthReplication:: self.initReplication,

        cmds+: [
            // Wait for the misconfigured cassandra to start up.
            wait_for_cqlsh("cassandra", self.rootPassword, "localhost"),

            // Set up system_auth replication level
            "echo %s | cqlsh -u cassandra -p %s localhost"
            % [std.escapeStringBash("ALTER KEYSPACE system_auth WITH REPLICATION = %s;"
                                    % self.initAuthReplication),
               self.rootPassword],

            // Drop in the correct configuration.
            "echo %s > %s"
            % [std.escapeStringBash("" + self.conf), "/etc/cassandra/cassandra.yaml"],

            // Restart with new configuration.
            "/etc/init.d/cassandra restart",

            // Wait for the properly configured cassandra to start up and reach quorum.
            wait_for_cqlsh("cassandra", self.rootPassword, "$HOSTNAME"),

            // Set up users, empty tables, etc.
            "echo %s | cqlsh -u cassandra -p %s $HOSTNAME"
            % [std.escapeStringBash(std.lines(self.initCql)), self.rootPassword],
        ],
    },

    // Simply restarts with the given config.
    TopUpNodeMixin:: StandardNodeMixin {
        cmds+: [
            // Wait for the misconfigured cassandra to start up.
            wait_for_cqlsh("cassandra", self.rootPassword, "localhost"),

            // Kill it.
            "/etc/init.d/cassandra stop",

            // Clean up the mess it caused due to being misconfigured.
            "rm -rf /var/lib/cassandra/*",

            // Drop in the correct configuration.
            "echo %s > %s"
            % [std.escapeStringBash("" + self.conf), "/etc/cassandra/cassandra.yaml"],

            // Start it up again.
            "/etc/init.d/cassandra restart",

        ],
    },

    GcpDebianCassandra: service_google.Service {

        local service = self,

        networkName:: "default",

        gossipPorts:: ["7000", "7001", "7199"],  // Only between this pool.
        otherPorts:: ["9042", "9160"],

        rootPassword:: error "Cassandra Service must have field: rootPassword",
        clusterName:: error "Cassandra Service must have field: clusterName",

        tcpFirewallPorts:: self.gossipPorts + self.otherPorts,

        cassandraConf:: $.DefaultConf {
            authenticator: "PasswordAuthenticator",
            cluster_name: service.clusterName,
        },

        StandardGcpInstance:: service_google.StandardInstance {
            machine_type: "n1-standard-1",
        },

        GeneralNodeMixin:: self.JmxMixin {
            conf: service.cassandraConf,
            rootPassword: service.rootPassword,
        },

        // GCP only.
        StarterNode:: self.StandardGcpInstance + $.StarterNodeMixin + self.GeneralNodeMixin,
        TopUpNode:: self.StandardGcpInstance + $.TopUpNodeMixin + self.GeneralNodeMixin,

        JmxMixin:: {
            enableMonitoring: self.supportsMonitoring,
            enableJmxMonitoring: self.supportsJmxMonitoring,
            jmxHost: "localhost",
            jmxPort: 7199,
            jmxLocalhostConfig+: {
                SdCassQuery:: self.SdQuery {
                    attr: ["ActiveCount", "CompletedTasks", "CurrentlyBlockedTasks",
                           "PendingTasks"],
                },
                queries+: [
                    self.SdQuery {
                        resultAlias: "cassandra.storageservice",
                        obj: "org.apache.cassandra.db:type=StorageService",
                        attr: ["Load", "ExceptionCount"],
                    },
                    self.SdQuery {
                        resultAlias: "cassandra.commitlog",
                        obj: "org.apache.cassandra.db:type=Commitlog",
                        attr: ["CompletedTasks", "PendingTasks", "TotalCommitlogSize"],
                    },
                    self.SdQuery {
                        resultAlias: "cassandra.compactionmanager",
                        obj: "org.apache.cassandra.db:type=CompactionManager",
                        attr: ["PendingTasks", "CompletedTasks"],
                    },
                    self.SdQuery {
                        resultAlias: "cassandra.stage.MutationStage",
                        obj: "org.apache.cassandra.request:type=MutationStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.stage.ReadRepairStage",
                        obj: "org.apache.cassandra.request:type=ReadRepairStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.stage.ReadStage",
                        obj: "org.apache.cassandra.request:type=ReadStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.stage.ReplicateOnWriteStage",
                        obj: "org.apache.cassandra.request:type=ReplicateOnWriteStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.stage.RequestResponseStage",
                        obj: "org.apache.cassandra.request:type=RequestResponseStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.AntiEntropySessions",
                        obj: "org.apache.cassandra.internal:type=AntiEntropySessions",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.AntiEntropyStage",
                        obj: "org.apache.cassandra.internal:type=AntiEntropyStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.FlushWriter",
                        obj: "org.apache.cassandra.internal:type=FlushWriter",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.GossipStage",
                        obj: "org.apache.cassandra.internal:type=GossipStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.HintedHandoff",
                        obj: "org.apache.cassandra.internal:type=HintedHandoff",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.InternalResponseStage",
                        obj: "org.apache.cassandra.internal:type=InternalResponseStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.MemtablePostFlusher",
                        obj: "org.apache.cassandra.internal:type=MemtablePostFlusher",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.MigrationStage",
                        obj: "org.apache.cassandra.internal:type=MigrationStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.MiscStage",
                        obj: "org.apache.cassandra.internal:type=MiscStage",
                    },
                    self.SdCassQuery {
                        resultAlias: "cassandra.internal.StreamStage",
                        obj: "org.apache.cassandra.internal:type=StreamStage",
                    },
                    self.SdQuery {
                        resultAlias: "cassandra.internal.StorageProxy",
                        obj: "org.apache.cassandra.db:type=StorageProxy",
                        attr: ["RecentReadLatencyMicros", "RecentWriteLatencyMicros",
                               "RecentRangeLatencyMicros", "HintsInProgress"],
                    },
                ],
            },

            enableLogging: self.supportsLogging,
        },

        nodes:: {},

        infrastructure+: {
            google_compute_disk: {
                ["${-}-" + n]: {
                    name: "${-}-" + n,
                    image: service.nodes[n].StandardRootImage,
                    zone: service.nodes[n].zone,
                }
                for n in std.objectFields(service.nodes)
            },
            google_compute_instance: {
                ["${-}-" + n]: service.nodes[n] {
                    name: "${-}-" + n,
                    networkName: service.networkName,
                    tags+: [service.clusterName],
                    disk: [
                        {
                            disk: "${google_compute_disk.${-}-%s.name}" % n,
                            auto_delete: false,
                        },
                    ],
                }
                for n in std.objectFields(service.nodes)
            },
            google_compute_firewall: {
                "${-}-fw": {
                    name: "${-}-fw",
                    source_ranges: ["0.0.0.0/0"],
                    network: "default",
                    allow: [
                        {
                            protocol: "tcp",
                            ports: [std.toString(p) for p in service.tcpFirewallPorts],
                        },
                    ],
                    target_tags: [service.clusterName],
                },
            },
        },
    },
}
