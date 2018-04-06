local base = import "base.jsonnet";

{
    AwsCredentials:: {
        kind: "Amazon",
        accessKey: error "Amazon credentials must have 'accessKey'",
        secretKey: error "Amazon credentials must have 'secretKey'",
        region: "us-east-1",
    },

    AwsStandardInstance:: {
        machine_type: "m1.small",
        ami: error "AwsStandardInstance must have 'ami'",
        cmds: [],
        bootCmds: [],
    },

    AwsCluster3: base.Service {
        local service = self,
        lbTcpPorts:: [],
        lbUdpPorts:: [],
        fwTcpPorts:: [22],
        fwUdpPorts:: [],
        httpHealthCheckPort:: 80,
        networkName:: "default",
        zones:: error "AwsCluster3 version (or service) needs an array of zones.",

        Mixin:: {
            networkName: service.networkName,
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
        local attached_instances = std.join([], [
            local attached = std.set(service.deployment[vname].attached);
            local deployed = std.set(service.deployment[vname].deployed);
            ["${-}-%s-%d" % [vname, i] for i in std.setInter(attached, deployed)]
            for vname in std.objectFields(service.deployment)
        ]),

        infrastructure+: {
            /*
            google_compute_firewall: {
                "${-}": {
                    name: "${-}",
                    source_ranges: ["0.0.0.0/0"],
                    network: service.networkName,
                    allow: [{ protocol: "tcp", ports: [std.toString(p) for p in service.fwTcpPorts]}],
                    target_tags: ["${-}"],
                }
            },
            */
            aws_instance: instances,

            aws_elb: {
                "{-}": {
                    name: "{-}",

                    listener: [{
                        instance_port: p,
                        instance_protocol: "tcp",
                        lb_port: p,
                        lb_protocol: "tcp",
                    } for p in service.fwTcpPorts],

                    health_check: {
                        healthy_threshold: 2,
                        unhealthy_threshold: 2,
                        timeout: 5,
                        target: "HTTP:%d/" % service.httpHealthCheckPort,
                        interval: 5,
                    },

                    instances: ["${aws_instance.%s.id}" % iname for iname in attached_instances],
                    cross_zone_load_balancing: true,
                    idle_timeout: 60,
                    connection_draining: true,
                    connection_draining_timeout: 60,

                    tags: {
                        Name: "foobar-terraform-elb",
                    },
                },
            },
        },
    },


}
