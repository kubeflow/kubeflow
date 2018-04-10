{
    environments: import "../testenv.libsonnet",

    local SingleInstance = {
        local service = self,

        environment: "google",

        zone:: error "Must override zone.",
        image:: error "Must override zone.",
        machineType:: "g1-small",

        externalIp:: false,
        infrastructure: {
            google_compute_instance: {
                "${-}": {
                    name: "${-}",
                    machine_type: service.machineType,
                    zone: service.zone,
                    disk: [{
                        image: service.image,
                    }],
                    network_interface: {
                        network: "default",
                        access_config:
                            if service.externalIp then [{}] else [],
                    },
                    metadata: {
                    },
                    cmds: [],
                    bootCmds: [],
                },
            },
        },
        outputs: {
            [if service.externalIp then "address"]:
                "${google_compute_instance.${-}.network_interface.access_config.0.nat_ip}",
        },
    },

    instances: {
        environment: "google",
        infrastructure: {},
        wheezy: SingleInstance {
            image: "debian-7-wheezy-v20140814",
            zone: "us-central1-b",
        },
        ubuntu: SingleInstance {
            image: "ubuntu-1504-vivid-v20150911",
            zone: "us-central1-c",
        },
        "core-os": SingleInstance {
            image: "coreos-stable-717-3-0-v20150710",
            zone: "us-central1-f",
            externalIp: true,
        },
    },
}
