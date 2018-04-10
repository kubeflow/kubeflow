local cmd = import "mmlib/v0.1.2/cmd/cmd.libsonnet";
local amis_ubuntu = import "mmlib/v0.1.2/amis/ubuntu.libsonnet";
local amis_debian = import "mmlib/v0.1.2/amis/debian.libsonnet";

{
    environments: import "../testenv.libsonnet",

    local SingleAmazonInstance = {
        local service = self,

        // Cut off the last letter
        local region_from_zone(z) = std.substr(z, 0, std.length(z) - 1),

        environment: "amazon",

        zone:: error "Must override zone.",
        amiMap:: error "Must override amiMap or ami.",
        ami:: null,
        machineType:: "t2.small",
        keyName:: null,
        cmds:: [],

        externalIp:: false,
        infrastructure: {
            aws_instance: {
                "${-}": {
                    [if service.keyName != null then "key_name"]: service.keyName,
                    instance_type: service.machineType,
                    availability_zone: service.zone,
                    ami: if service.ami != null then service.ami else service.amiMap[region_from_zone(service.zone)],
                    associate_public_ip_address: service.externalIp,
                    cmds: service.cmds,
                },
            },
        },
        outputs: {
            "${-}-address": "${aws_instance.${-}.public_ip}",
            "${-}-id": "${aws_instance.${-}.id}",
        },
    },

    ubuntu_aws: SingleAmazonInstance {
        externalIp: true,
        keyName: "kp",
        amiMap: amis_ubuntu.trusty.amd64["20151117"],
        zone: "us-west-1b",
        cmds: [
            "echo hi > /hi.txt",
            cmd.LiteralFile {
                to: "/var/log/bye.txt",
                content: |||
                    bye
                |||,
                filePermissions: "700",
            },
        ],
    },


    ubuntu_aws_ami: SingleAmazonInstance {
        externalIp: true,
        keyName: "kp",
        ami: {
            sourceAmi: amis_ubuntu.trusty.amd64["20151117"]["us-west-1"],
            instanceType: "t2.small",
            sshUser: "ubuntu",
            cmds: [
                "echo hi > /hi.txt",
                cmd.LiteralFile {
                    to: "/var/log/bye.txt",
                    content: |||
                        bye
                    |||,
                    filePermissions: "700",
                },
            ],
        },
        zone: "us-west-1b",
    },


    debian_aws: SingleAmazonInstance {
        externalIp: true,
        keyName: "kp",
        amiMap: amis_debian.wheezy.amd64["20150128"],
        zone: "us-west-1c",
        cmds: [
            "echo hi > /hi.txt",
            cmd.LiteralFile {
                to: "/var/log/bye.txt",
                content: |||
                    bye
                |||,
                filePermissions: "700",
            },
        ],
    },


    debian_aws_ami: SingleAmazonInstance {
        externalIp: true,
        keyName: "kp",
        ami: {
            sourceAmi: amis_debian.wheezy.amd64["20150128"]["us-west-1"],
            instanceType: "t2.small",
            sshUser: "admin",
            cmds: [
                "echo hi > /hi.txt",
                cmd.LiteralFile {
                    to: "/var/log/bye.txt",
                    content: |||
                        bye
                    |||,
                    filePermissions: "700",
                },
            ],
        },
        zone: "us-west-1b",
    },
}
