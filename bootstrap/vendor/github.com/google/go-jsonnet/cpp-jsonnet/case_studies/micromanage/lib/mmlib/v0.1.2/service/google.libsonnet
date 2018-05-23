local base = import "base.libsonnet";
local cmd = import "../cmd/cmd.libsonnet";
local apt = import "../cmd/apt.libsonnet";

{
    Credentials:: {
        kind: "Google",
        project: error "Google credentials must have 'project'",
        serviceAccount: error "Google credentials must have 'serviceAccount'",
        sshUser: error "Google credentials must have 'sshUser'",
        region: "us-central1",
    },


    Image:: {
        source: error "Google Image must have 'source'",
        machineType: "n1-standard-1",
        zone: "us-central1-f",
        cmds: [],
    },


    DebianImage:: $.Image + apt.Mixin + apt.PipMixin {
        source: "backports-debian-7-wheezy-v20150603",
    },


    StandardInstance:: {
        local instance = self,
        machine_type: "f1-micro",
        scopes:: ["devstorage.read_only", "logging.write"],
        networkName:: "default",
        cmds: [],
        bootCmds: [],
        network_interface: {
            network: instance.networkName,
            access_config: {
            },
        },
        service_account: [
            {
                scopes: ["https://www.googleapis.com/auth/" + s for s in instance.scopes],
            },
        ],
        disk: [
            {
                image: instance.StandardRootImage,
            },
        ],

        supportsLogging:: true,
        supportsMonitoring:: true,
        supportsJmxMonitoring:: true,
        enableLogging:: false,
        enableMonitoring:: false,
        enableJmxMonitoring:: false,
        jmxHost:: "localhost",
        jmxPort:: 9012,
        jmxHotspotConfig:: {
            host: instance.jmxHost,
            port: instance.jmxPort,
            numQueryThreads: 2,
            SdQuery:: {
                outputWriters: [
                    {
                        "@class": "com.googlecode.jmxtrans.model.output.StackdriverWriter",
                        settings: {
                            token: "STACKDRIVER_API_KEY",
                            detectInstance: "GCE",
                            url: "https://jmx-gateway.google.stackdriver.com/v1/custom",
                        },
                    },
                ],
            },
            queries: [
                self.SdQuery {
                    resultAlias: "jvm.localhost.Threading",
                    obj: "java.lang:type=Threading",
                    attr: ["DaemonThreadCount", "ThreadCount", "PeakThreadCount"],
                },
                self.SdQuery {
                    resultAlias: "jvm.localhost.Memory",
                    obj: "java.lang:type=Memory",
                    attr: ["HeapMemoryUsage", "NonHeapMemoryUsage"],
                },
                self.SdQuery {
                    resultAlias: "jvm.localhost.Runtime",
                    obj: "java.lang:type=Runtime",
                    attr: ["Uptime"],
                },
                self.SdQuery {
                    resultAlias: "jvm.localhost.os",
                    obj: "java.lang:type=OperatingSystem",
                    attr: [
                        "CommittedVirtualMemorySize",
                        "FreePhysicalMemorySize",
                        "FreeSwapSpaceSize",
                        "OpenFileDescriptorCount",
                        "ProcessCpuTime",
                        "SystemLoadAverage",
                    ],
                },
                self.SdQuery {
                    resultAlias: "jvm.localhost.gc",
                    obj: "java.lang:type=GarbageCollector,name=*",
                    attr: ["CollectionCount", "CollectionTime"],
                },
            ],
        },
        jmxLocalhostConfig:: instance.jmxHotspotConfig,
        jmxConfig:: {
            servers: [
                instance.jmxLocalhostConfig,
            ],
        },

        MonitoringLoggingImageMixin:: {
            local monitoring =
                if instance.enableMonitoring then [
                    "curl -s https://repo.stackdriver.com/stack-install.sh | bash",
                ] else [],
            local jmx =
                if instance.enableJmxMonitoring then [
                    "mkdir -p /opt/jmxtrans/{conf,log}",
                    "curl https://repo.stackdriver.com/jmxtrans/jmxtrans-all.jar -o /opt/jmxtrans/jmxtrans-all.jar",
                    cmd.LiteralFile {
                        to: "/etc/cron.d/jmxtrans",
                        content: "@reboot root /usr/bin/java -Djmxtrans.log.dir=/opt/jmxtrans/log -jar /opt/jmxtrans/jmxtrans-all.jar -j /opt/jmxtrans/conf/ &\n",
                        filePermissions: "700",
                    },
                    cmd.LiteralFile {
                        to: "/opt/jmxtrans/conf/jmx.json",
                        content: std.toString(instance.jmxConfig),
                    },
                ] else [],
            local logging =
                if instance.enableLogging then [
                    "curl -s https://dl.google.com/cloudagents/install-logging-agent.sh | bash",
                ] else [],
            cmds+: monitoring + jmx + logging,
        },

        StandardRootImage:: $.DebianImage + instance.MonitoringLoggingImageMixin,

        tags: ["${-}"],
        metadata: {},
    },


    Service: base.Service {
        local service = self,
        infrastructure+: if self.dnsZone == null then {
        } else {
            local instances = if std.objectHas(self, "google_compute_instance") then self.google_compute_instance else {},
            local addresses = if std.objectHas(self, "google_compute_address") then self.google_compute_address else {},
            local DnsRecord = {
                managed_zone: service.dnsZone.refName(service.dnsZoneName),
                type: "A",
                ttl: 300,
            },
            # Add a record for every address and instance
            google_dns_record_set: {
                [name]: DnsRecord {
                    name: "${google_compute_address." + name + ".name}." + service.dnsZone.dnsName,
                    rrdatas: ["${google_compute_address." + name + ".address}"],
                } for name in std.objectFields(addresses)
            } + {
                [name]: DnsRecord {
                    name: "${google_compute_instance." + name + ".name}." + service.dnsZone.dnsName,
                    rrdatas: ["${google_compute_instance." + name + ".network_interface.0.access_config.0.assigned_nat_ip}"],
                } for name in std.objectFields(instances)
            },
        },
        dnsZone:: null,
        dnsZoneName:: error "Must set dnsZoneName if dnsZone is set.",
    },


    Network:: $.Service {
        local service = self,
        refName(name):: "${google_compute_network.%s.name}" % name,
        ipv4Range:: "10.0.0.0/16",
        infrastructure: {
            google_compute_network: {
                "${-}": {
                    name: "${-}",
                    ipv4_range: service.ipv4Range,
                },
            },
        },
    },


    InstanceBasedService: $.Service {
        local service = self,
        fwTcpPorts:: [22],
        fwUdpPorts:: [],
        networkName:: "default",

        Mixin:: {
            networkName: service.networkName,
        },

        Instance:: $.StandardInstance + service.Mixin,

        refAddress(name):: "${google_compute_address.%s.address}" % name,

        infrastructure+: {
            google_compute_address: {
                "${-}": { name: "${-}" },
            },
            google_compute_firewall: {
                "${-}": {
                    name: "${-}",
                    source_ranges: ["0.0.0.0/0"],
                    network: service.networkName,
                    allow: [{ protocol: "tcp", ports: [std.toString(p) for p in service.fwTcpPorts] }],
                    target_tags: ["${-}"],
                },
            },
            google_compute_instance: error "InstanceBasedService should define some instances.",
        },
    },


    Cluster3: self.InstanceBasedService {
        local service = self,
        lbTcpPorts:: [],
        lbUdpPorts:: [],
        httpHealthCheckPort:: 80,
        zones:: error "Cluster3 version (or service) needs an array of zones.",

        Mixin+: {
            zones:: service.zones,
        },

        versions:: {},
        deployment:: {},
        local instances = std.foldl(function(a, b) a + b, [
            {
                ["${-}-%s-%d" % [vname, i]]:
                    if std.objectHas(service.versions, vname) then
                        service.versions[vname] {
                            name: "${-}-%s-%d" % [vname, i],
                            zone: self.zones[i % std.length(self.zones)],
                            tags+: [vname, "index-%d" % i],
                        }
                    else
                        error "Undefined version: %s" % vname
                for i in std.set(service.deployment[vname].deployed)
            }
            for vname in std.objectFields(service.deployment)
        ], {}),
        local attached_instances = std.join(
            [], [
                local attached = std.set(service.deployment[vname].attached);
                local deployed = std.set(service.deployment[vname].deployed);
                ["${-}-%s-%d" % [vname, i] for i in std.setInter(attached, deployed)]
                for vname in std.objectFields(service.deployment)
            ]),

        infrastructure+: {
            google_compute_http_health_check: {
                "${-}": {
                    name: "${-}",
                    port: service.httpHealthCheckPort,
                },
            },
            google_compute_target_pool: {
                "${-}": {
                    name: "${-}",
                    depends_on: ["google_compute_http_health_check.${-}"],
                    health_checks: ["${-}"],
                    instances: ["%s/%s" % [instances[iname].zone, iname]
                                for iname in attached_instances],
                },
            },
            google_compute_forwarding_rule: {
                ["${-}-%s" % port]: {
                    name: "${-}-%s" % port,
                    ip_address: "${google_compute_address.${-}.address}",
                    target: "${google_compute_target_pool.${-}.self_link}",
                    port_range: port,
                }
                for port in [std.toString(p) for p in service.lbTcpPorts]
            },
            google_compute_instance: instances,
        },
    },


    SingleInstance: self.InstanceBasedService {
        local service = self,
        zone:: error "SingleInstance needs a zone.",

        infrastructure+: {
            google_compute_instance: {
                "${-}": service.Instance {
                    name: "${-}",
                    zone: service.zone,
                    network_interface+: {
                        access_config: {
                            nat_ip: "${google_compute_address.${-}.address}",
                        },
                    },
                },
            },
        },
    },


    DnsZone:: self.Service {
        local service = self,
        dnsName:: error "DnsZone must have dnsName, e.g. example.com",
        refName(name):: "${google_dns_managed_zone.%s.name}" % name,
        description:: "Zone for " + self.dnsName,
        infrastructure+: {
            google_dns_managed_zone: {
                "${-}": {
                    name: "${-}",
                    dns_name: service.dnsName,
                    description: service.description,
                },
            },
            google_dns_record_set: {
            },
        },
        outputs+: {
            "${-}-name_servers": "${google_dns_managed_zone.${-}.name_servers.0}",
        },
    },


    DnsRecordWww:: self.Service {
        local service = self,
        dnsName:: service.zone.dnsName,
        zone:: error "DnsRecordWww requires zone.",
        zoneName:: error "DnsRecordWww requires zoneName.",
        target:: error "DnsRecordWww requires target.",
        infrastructure+: {
            google_dns_record_set: {
                "${-}": {
                    managed_zone: service.zone.refName(service.zoneName),
                    name: "www." + service.dnsName,
                    type: "CNAME",
                    ttl: 300,
                    rrdatas: [service.target + "." + service.dnsName],
                },
            },
        },
    },
}
