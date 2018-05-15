local base = import "base.jsonnet";
local cmd = import "../cmd/cmd.jsonnet";
local apt = import "../cmd/apt.jsonnet";
local amis_debian = import "../amis/debian.jsonnet";

{
    Credentials:: {
        kind: "Amazon",
        accessKey: error "Amazon credentials must have 'accessKey'",
        secretKey: error "Amazon credentials must have 'secretKey'",
        region: "us-east-1",
    },


    Image:: {
        sourceAmi: error "Amazon AMI must have 'sourceAmi'",
        instanceType: "t2.small",
        sshUser: error "Amazon AMI must have 'sshUser'",
        cmds: [],
    },


    DebianImage:: $.Image + apt.Mixin + apt.PipMixin {
        sourceAmi: amis_debian.wheezy.amd64["20150128"]["us-west-1"],
        sshUser: "admin",
    },


    StandardInstance:: {
        local instance = self,
        instance_type: "t2.small",
        ami: instance.StandardRootImage,
        associate_public_ip_address: true,
        cmds: [],
        bootCmds: [],
        tags: {},
        # TODO(dcunnin): Figure out an equivalent here.
        supportsLogging:: false,
        supportsMonitoring:: false,
        supportsJmxMonitoring:: false,
        enableLogging:: false,
        enableMonitoring:: false,
        enableJmxMonitoring:: false,
        MonitoringLoggingImageMixin:: {
        },
        StandardRootImage:: $.DebianImage + instance.MonitoringLoggingImageMixin,
    },


    Service:: base.Service {
        infrastructure+: if self.dnsZone == null then {
        } else {
            /*
            local instances = if std.objectHas(self, "aws_instance") then self.google_compute_instance else { },
            local addresses = { }, //if std.objectHas(self, "google_compute_address") then self.google_compute_address else { },
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
                    rrdatas: ["${google_compute_instance." + name + ".network_interface.0.access_config.0.nat_ip}"],
                } for name in std.objectFields(instances)
            },
            */
        },
        dnsZone:: null,
        dnsZoneName:: error "Must set dnsZoneName if dnsZone is set.",
    },


    Network:: $.Service {
        local service = self,
        refId(name):: "${aws_vpc.%s.id}" % name,
        refName(name):: "${aws_vpc.%s.name}" % name,
        refSubnetId(name, zone):: "${aws_subnet.%s-%s.id}" % [name, zone],
        ipv4Range:: "10.0.0.0/16",
        infrastructure: {
            aws_vpc: {
                "${-}": {
                    cidr_block: service.ipv4Range,
                },
            },
            aws_internet_gateway: {
                "${-}": {
                    vpc_id: "${aws_vpc.${-}.id}",
                },
            },
            aws_route_table: {
                "${-}": {
                    vpc_id: "${aws_vpc.${-}.id}",
                    route: {
                        cidr_block: "0.0.0.0/0",
                        gateway_id: "${aws_internet_gateway.${-}.id}",
                    },
                },
            },
            aws_subnet: {
                ["${-}-" + zone]: {
                    vpc_id: "${aws_vpc.${-}.id}",
                    cidr_block: service.subnets[zone],
                    availability_zone: zone,
                }
                for zone in std.objectFields(service.subnets)
            },
            aws_route_table_association: {
                ["${-}-" + zone]: {
                    subnet_id: "${aws_subnet.${-}-" + zone + ".id}",
                    route_table_id: "${aws_route_table.${-}.id}",
                }
                for zone in std.objectFields(service.subnets)
            },
        },
        // Maps zone to CIDR.
        subnets:: {},
    },


    InstanceBasedService: $.Service {
        local service = self,
        fwTcpPorts:: [22],
        fwUdpPorts:: [],
        networkName:: null,
        keyName:: error "InstanceBasedService needs keyName",

        Mixin:: (
            if service.networkName != null then {
                vpc_security_group_ids: ["${aws_security_group.${-}.id}"],
                subnet_id: $.Network.refSubnetId(service.networkName, self.availability_zone),
            } else {
                security_groups: ["${aws_security_group.${-}.name}"],
            }
        ) + {
            [if service.keyName != null then "key_name"]: service.keyName,
        },

        Instance:: $.StandardInstance + service.Mixin,

        infrastructure+: {
            aws_security_group: {
                "${-}": {
                    name: "${-}",

                    local IngressRule(p, protocol) = {
                        from_port: p,
                        to_port: p,
                        protocol: protocol,
                        cidr_blocks: ["0.0.0.0/0"],
                    },
                    ingress: [IngressRule(p, "tcp") for p in service.fwTcpPorts]
                             + [IngressRule(p, "udp") for p in service.fwUdpPorts],

                    [if service.networkName != null then "vpc_id"]: $.Network.refId(service.networkName),
                },
            },
            aws_instance: error "InstanceBasedService should define some instances.",
        },
    },


    Cluster3: $.InstanceBasedService {
        local service = self,
        lbTcpPorts:: [],
        lbUdpPorts:: [],
        fwTcpPorts:: [22],
        fwUdpPorts:: [],
        httpHealthCheckPort:: 80,
        zones:: error "Cluster3 version (or service) needs an array of zones.",

        // In this service, the 'instance' is really an instance template used to create
        // a pool of instances.
        Mixin:: {
            zones:: service.zones,
        },
        versions:: {},
        deployment:: {},
        local merge(objs) = std.foldl(function(a, b) a + b, objs, {}),
        local instances = merge([
            {
                ["${-}-%s-%d" % [vname, i]]:
                    if std.objectHas(service.versions, vname) then
                        service.versions[vname] {
                            availability_zone: self.zones[i % std.length(self.zones)],
                            tags+: {
                                version: vname,
                                index: i,
                            },
                        }
                    else
                        error "Undefined version: %s" % vname
                for i in std.set(service.deployment[vname].deployed)
            }
            for vname in std.objectFields(service.deployment)
        ]),
        local attached_instances = std.join([], [
            local attached = std.set(service.deployment[vname].attached);
            local deployed = std.set(service.deployment[vname].deployed);
            ["${-}-%s-%d" % [vname, i] for i in std.setInter(attached, deployed)]
            for vname in std.objectFields(service.deployment)
        ]),

        refAddress(name):: "${aws_elb.%s.dns_name}" % name,

        infrastructure+: {
            aws_instance: instances,

            aws_elb: {
                "${-}": {
                    name: "${-}",

                    availability_zones: service.zones,

                    listener: [{
                        instance_port: p,
                        instance_protocol: "tcp",
                        lb_port: p,
                        lb_protocol: "tcp",
                    } for p in service.lbTcpPorts],

                    health_check: {
                        healthy_threshold: 2,
                        unhealthy_threshold: 2,
                        timeout: 3,
                        target: "HTTP:%d/" % service.httpHealthCheckPort,
                        interval: 5,
                    },

                    instances: ["${aws_instance.%s.id}" % iname for iname in attached_instances],
                    cross_zone_load_balancing: true,
                    idle_timeout: 60,
                    connection_draining: true,
                    connection_draining_timeout: 60,
                },
            },
            aws_security_group: {
                "${-}-elb": {
                    name: "${-}-elb",

                    local IngressRule(p, protocol) = {
                        from_port: p,
                        to_port: p,
                        protocol: protocol,
                        cidr_blocks: ["0.0.0.0/0"],
                    },
                    ingress: [IngressRule(p, "tcp") for p in service.lbTcpPorts]
                             + [IngressRule(p, "udp") for p in service.lbUdpPorts],

                    //[if service.networkName != null then "vpc_id"]: $.Network.refId(service.networkName),
                },
            },
        },
    },


    SingleInstance: $.InstanceBasedService {
        local service = self,
        zone:: error "SingleInstance needs a zone.",

        refAddress(name):: "${aws_instance.%s.public_ip}" % name,

        infrastructure+: {
            aws_instance: {
                "${-}": service.Instance {
                    availability_zone: service.zone,
                },
            },
        },
    },

    DnsZone:: self.Service {
        local service = self,
        dnsName:: error "DnsZone must have dnsName, e.g. example.com",
        refName(name):: "${aws_route53_zone.%s.zone_id}" % name,
        description:: "Zone for " + self.dnsName,
        infrastructure+: {
            aws_route53_zone: {
                "${-}": {
                    dns_name: service.dnsName,
                    comment: service.description,
                },
            },
            aws_dns_record: {
            },
        },
        outputs+: {
            "${-}-name_servers": "${google_dns_managed_zone.${-}.name_servers.0}",
        },
    },


    /*
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
            }
        }
    },
    */

}
