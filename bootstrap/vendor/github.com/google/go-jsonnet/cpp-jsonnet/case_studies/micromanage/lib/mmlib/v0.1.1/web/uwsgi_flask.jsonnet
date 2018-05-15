local cmd = import "../cmd/cmd.jsonnet";

{
    /** A Debian instance mixin that installs Flask. */
    DebianUwsgiFlask:: {

        local version = self,

        StandardRootImage+: {
            aptPackages+: ["python-dev"],
            pipPackages+: ["flask", "uwsgi"],
            cmds+: [
                cmd.LiteralFile {
                    to: "/etc/cron.d/emperor",
                    content: "@reboot root /usr/local/bin/uwsgi --master --emperor /etc/uwsgi/vassals "
                             + "--daemonize /var/log/uwsgi/emperor.log --pidfile /var/run/uwsgi.pid "
                             + "--die-on-term --uid www-data --gid www-data\n",
                    filePermissions: "700",
                },
            ],
        },

        application:: "app",
        module:: "uwsgi_module",

        uwsgiSocket:: "/var/www/uwsgi.sock",

        uwsgiConf:: {
            chdir: "/var/www",
            base: "/var/www",
            module: version.module,
            pythonpath: "/var/www",
            socket: version.uwsgiSocket,
            "chmod-socket": "644",
            callable: version.application,
            logto: "/var/log/uwsgi/uwsgi.log",
        },

        uwsgiModuleContent:: null,

        httpContentCmds+: if version.uwsgiModuleContent == null then [] else [
            cmd.LiteralFile {
                content: version.uwsgiModuleContent,
                to: "/var/www/%s.py" % version.module,
            },
        ],


        httpHandlerCmds+: [
            cmd.EnsureDir { dir: "/etc/uwsgi/vassals" },
            cmd.LiteralFile {
                to: "/etc/uwsgi/vassals/uwsgi.ini",
                content: std.manifestIni({
                    sections: {
                        uwsgi: version.uwsgiConf,
                    },
                }),
            },
            cmd.EnsureDir { dir: "/var/log/uwsgi", owner: "www-data" },
            "/usr/local/bin/uwsgi --master --emperor /etc/uwsgi/vassals "
            + "--daemonize /var/log/uwsgi/emperor.log --pidfile /var/run/uwsgi.pid "
            + "--die-on-term --uid www-data --gid www-data\n",
        ],
    },

    /* A mixin on top of an instance that has both Nginx and Uwsgi, which binds them together. */
    NginxUwsgiGlue: {
        local version = self,

        nginxUwsgiConf:: |||
            server {
                listen %(port)d;
                server_name ~^.*$;
                charset     utf-8;
                client_max_body_size 75M;
                location / { try_files $uri @yourapplication; }
                location @yourapplication {
                    include uwsgi_params;
                    uwsgi_pass unix:%(socket)s;
                }
            }
        ||| % { port: version.httpPort, socket: version.uwsgiSocket },

        nginxAdditionalCmds+: [
            cmd.LiteralFile {
                to: "/etc/nginx/conf.d/frontend_nginx.conf",
                content: version.nginxUwsgiConf,
            },
        ],
    },
}
