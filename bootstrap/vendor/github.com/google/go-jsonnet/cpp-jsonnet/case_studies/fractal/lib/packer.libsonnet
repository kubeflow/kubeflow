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

{
    local packer = self,

    // A Packer shell provisioner to run something as root.
    RootShell:: {
        type: "shell",
        execute_command: "{{ .Vars }} sudo -E /bin/bash '{{ .Path }}'",
    },

    // A Packer shell provisioner to run something as the current user.
    Shell:: {
        type: "shell",
    },

    // A Packer file provisioner.
    File:: {
        type: "file",
        destination: error "File requires field: destination",
        source: error "File requires field: source",
    },

    // A Packer provisioner that creates a file from inline content, with the given permissions.
    EnsureFile:: packer.RootShell {
        content:: error "EnsureFile provisioner must have field content",
        destination:: error "EnsureFile provisioner must have field destination",
        permissions:: "644",
        user:: "root",
        group:: self.user,
        environment_vars: [
            // TODO(dcunnin): escaping bash is a workaround for Packer #1733
            "PACKER_EXPLICIT_FILE_CONTENT='%s'" % std.escapeStringBash(self.content),
            "PACKER_EXPLICIT_FILE=" + self.destination,
        ],
        inline: [
            "mkdir -v -p \"$(dirname \"$PACKER_EXPLICIT_FILE\")\"",
            "echo \"Creating file: $PACKER_EXPLICIT_FILE\"",
            "echo -n \"$PACKER_EXPLICIT_FILE_CONTENT\" > \"$PACKER_EXPLICIT_FILE\"",
            "chmod -v %s \"$PACKER_EXPLICIT_FILE\"" % [self.permissions],
            "chown -v %s.%s \"$PACKER_EXPLICIT_FILE\"" % [self.user, self.group],
        ],
    },

    // A Packer provisioner that creates a directory with given permissions.
    EnsureDir:: packer.RootShell {
        dir:: error "EnsureDir provisioner must have field dir",
        permissions:: "775",
        user:: "root",
        group:: self.user,
        environment_vars: [
            "PACKER_DIR=" + self.dir,
        ],
        inline: [
            "mkdir -pv \"$PACKER_DIR\"",
            "chmod -v %s \"$PACKER_DIR\"" % [self.permissions],
            "chown -v %s.%s \"$PACKER_DIR\"" % [self.user, self.group],
        ],
    },

    // A Packer provisioner that creates a symlink.
    EnsureSymLink:: packer.RootShell {
        from:: error "EnsureSymLink provisioner must have field: from",
        to:: error "EnsureSymLink provisioner must have field: to",
        environment_vars: [
            "PACKER_SYM_FROM=" + self.from,
            "PACKER_SYM_TO=" + self.to,
        ],
        inline: [
            "ln -sfv \"$PACKER_SYM_FROM\" \"$PACKER_SYM_TO\"",
        ],
    },

    // A Packer provisioner to install Python packages via Pip.  Pip must already be installed.  The
    // packages are given as an array of strings.
    Pip:: packer.RootShell {
        packages:: error "Pip provisioner must have field: packages",
        inline: ["pip install " + std.join(" ", self.packages)],
    },

    // A Packer provisioner to install Apt packages.  This provisioner can be configured with
    // additional keys and repositories.  The packages are given as an array of strings.
    Apt:: packer.RootShell {
        packages:: error "Apt provisioner must have field: packages",
        keyUrls:: [],
        // { foo: "..." } will add a foo.list containing the given content.
        repoLines:: {},
        // { foo: "..." } will add a foo.list fetched from the given URL.
        repoUrls:: {},

        keyCommands:: ["curl --silent %s | apt-key add -" % [url] for url in self.keyUrls],

        local dir = "/etc/apt/sources.list.d",
        local repoLineCommands = ["echo \"%s\" > %s/%s.list" % [self.repoLines[k], dir, k]
                                  for k in std.objectFields(self.repoLines)],
        local repoUrlCommands = ["curl -o %s/%s.list %s" % [dir, k, self.repoUrls[k]]
                                 for k in std.objectFields(self.repoUrls)],
        repoCommands:: repoLineCommands + repoUrlCommands,

        local opts = "-o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold",
        installCommands:: ["apt-get -qq -y %s install %s" % [opts, std.join(" ", self.packages)]],

        environment_vars: ["DEBIAN_FRONTEND=noninteractive"],
        inline: self.repoCommands + self.keyCommands
                + ["apt-get -qq -y update"] + self.installCommands,
    },
    // TODO(dcunnin): yum
    /*
      # RHEL and CentOS.
      rpm -Uvh --quiet "RPM_URL"
      yum makecache
      yum -q -y install package1 package2 ...
    */

    // TODO(dcunnin): zypper
    /*
      zypper refresh
      zypper --non-interactive --quiet install package1 package2 ...
    */

    // A template for building an image on Google Cloud Platform.  This brings out build attributes
    // to the top level and provides defaults for others.
    GcpImage:: {

        // Override these
        name:: error "GcpImage must have field: name",
        description: "Packer GcpImage: " + self.name,
        source_image:: error "GcpImage must have field: name",
        project_id:: error "GcpImage must have field: project_id",
        account_file:: error "GcpImage must have field: account_file",
        sshUsername:: error "GcpImage must have field: sshUsername",

        local img = self,
        builder:: {
            type: "googlecompute",

            name: img.name,
            image_name: "%s" % [self.name],
            image_description: "GCP builder for " + self.name,

            // Project & authentication
            project_id: img.project_id,
            account_file: img.account_file,

            // Instance mechanics
            machine_type: "n1-standard-1",  // Multicore probably doesn't provide any benefit
            source_image: img.source_image,
            instance_name: "packer-" + self.name,
            zone: "us-central1-a",
            ssh_username: img.sshUsername,
            [if std.objectHas(img, "disk_size") then "disk_size"]: img.disk_size,
        },

        builders: [self.builder],

        provisioners: [],
    },

    // A template for building a Debian image on Google Cloud Platform.  This allows specifying apt
    // and pip attributes at the top-level and automatically provisions the desired packages.
    GcpDebianImage:: packer.GcpImage {
        local image = self,

        source_image: "backports-debian-7-wheezy-v20141017",

        local pip_pkgs = self.aptPackages
                         + if std.length(self.pipPackages) == 0 then [] else ["python-pip"],
        aptPackages:: [],
        aptKeyUrls:: [],
        aptRepoLines:: {},
        aptRepoUrls:: {},

        pipPackages:: [],

        local apt_provisioners =
            if std.length(pip_pkgs) == 0
               && std.length(self.aptKeyUrls) == 0
               && std.length(self.aptRepos) == 0 then [
            ] else [
                packer.Apt {
                    packages: pip_pkgs,
                    keyUrls: image.aptKeyUrls,
                    repoLines: image.aptRepoLines,
                    repoUrls: image.aptRepoUrls,
                },
            ],

        local pip_provisioners =
            if std.length(self.pipPackages) == 0 then [
            ] else [
                packer.Pip { packages: image.pipPackages },
            ],

        provisioners+: apt_provisioners + pip_provisioners,

    },

    // A template for building Nginx/uwsgi/flask based application servers.  The uwsgi configuration
    // is provided at the top level and is automatically compiler to INI format.  A simple cron line
    // is used to start the uwsgi emporer at boot.  The given Flask module must exist in /var/www,
    // so extend this template with additional provisioners to create that content.
    GcpDebianNginxUwsgiFlaskImage:: packer.GcpDebianImage {
        local image = self,

        module:: error "NginxUwsgiFlaskImage must have field: module",
        application:: "app",
        port:: 80,
        uwsgiSocket:: "/var/www/uwsgi.sock",

        aptPackages+: ["nginx", "python-dev"],
        pipPackages+: ["flask", "uwsgi"],

        uwsgiConf:: {
            chdir: "/var/www",
            base: "/var/www",
            module: image.module,
            pythonpath: "/var/www",
            socket: image.uwsgiSocket,
            "chmod-socket": "644",
            callable: image.application,
            logto: "/var/log/uwsgi/uwsgi.log",
        },

        nginxConf:: [
            "server {",
            "    listen %d;" % image.port,
            "    server_name localhost;",
            "    charset     utf-8;",
            "    client_max_body_size 75M;",
            "    location / { try_files $uri @yourapplication; }",
            "    location @yourapplication {",
            "        include uwsgi_params;",
            "        uwsgi_pass unix:%s;" % image.uwsgiSocket,
            "    }",
            "}",
        ],

        provisioners+: [
            packer.RootShell { inline: ["rm /etc/nginx/sites-enabled/default"] },
            packer.EnsureFile {
                destination: "/etc/nginx/conf.d/frontend_nginx.conf",
                content: std.lines(image.nginxConf),
            },
            packer.EnsureFile {
                destination: "/etc/uwsgi/vassals/uwsgi.ini",
                content: std.manifestIni({
                    sections: {
                        uwsgi: image.uwsgiConf,
                    },
                }),
            },
            packer.EnsureFile {
                destination: "/etc/cron.d/emperor",
                content: "@reboot root /usr/local/bin/uwsgi --master --emperor /etc/uwsgi/vassals "
                         + "--daemonize /var/log/uwsgi/emperor.log --pidfile /var/run/uwsgi.pid "
                         + "--die-on-term --uid www-data --gid www-data\n",
            },
            packer.EnsureDir { dir: "/var/log/uwsgi", user: "www-data" },
            packer.EnsureDir { dir: "/var/www", user: "www-data" },
        ],
    },


    // A template to help build PostgreSQL images (experimental).
    GcpDebianPostgresqlImage: packer.GcpDebianImage {
        local image = self,

        rootPassword:: error "GcpDebianPostgresqlImage: must have field: rootPassword",

        aptPackages+: ["postgresql", "postgresql-contrib"],

        initSql:: [
            "ALTER USER POSTGRES WITH PASSWORD '%s';" % image.rootPassword,
        ],

        provisioners+: [
            packer.RootShell { inline: [
                "echo %s | sudo -u postgres psql" % std.escapeStringBash(std.lines(image.initSql)),
            ] },
            packer.EnsureFile {
                destination: "/etc/postgresql/9.1/main/postgresql.conf",
                content: std.lines([
                    "data_directory = '/var/lib/postgresql/9.1/main'",
                    "hba_file = '/etc/postgresql/9.1/main/pg_hba.conf'",
                    "ident_file = '/etc/postgresql/9.1/main/pg_ident.conf'",
                    "external_pid_file = '/var/run/postgresql/9.1-main.pid'",
                    "listen_addresses = '*'",
                    "port = 5432",
                    "max_connections = 100",
                    "unix_socket_directory = '/var/run/postgresql'",
                    "ssl = true",
                    "shared_buffers = 32MB",
                    "log_line_prefix = '%t '",
                    "datestyle = 'iso, mdy'",
                    "lc_messages = 'en_US.UTF-8'",
                    "lc_monetary = 'en_US.UTF-8'",
                    "lc_numeric = 'en_US.UTF-8'",
                    "lc_time = 'en_US.UTF-8'",
                    "default_text_search_config = 'pg_catalog.english'",
                ]),
            },
            packer.EnsureFile {
                destination: "/etc/postgresql/9.1/main/pg_hba.conf",
                content: std.lines([
                    "local all all                   md5",
                    "host  all all 255.255.255.255/0 md5",
                    "host  all all ::1/128           md5",
                ]),
            },
        ],
    },

    // A template to help build MySQL images (experimental).
    GcpDebianMysqlImage: packer.GcpDebianImage {
        local image = self,

        rootPassword:: error "GcpDebianMysqlImage: must have field: rootPassword",

        aptPackages+: ["mysql-server"],

        initSql:: [],

        provisioners+: [
            packer.RootShell { inline: [
                "mysqladmin -u root password '%s'" % std.escapeStringBash(image.rootPassword),
                "echo %s | mysql -u root --password=%s"
                % [std.escapeStringBash(std.lines(image.initSql)),
                   std.escapeStringBash(image.rootPassword)],
            ] },
            packer.EnsureFile {
                destination: "/etc/mysql/conf.d/local.cnf",
                content: std.manifestIni({
                    sections: {
                        mysqld: {
                            "bind-address": "0.0.0.0",
                        },
                    },
                }),
            },
        ],
    },
}
