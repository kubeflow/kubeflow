local cmd = import "../cmd/cmd.jsonnet";

{
    /** A Debian instance mixin that installs Nginx. */
    DebianNginxMixin:: {

        local version = self,

        httpPort:: error "DebianNginxMixin requires port",

        enableMonitoring: version.supportsMonitoring,
        enableLogging: version.supportsLogging,

        StandardRootImage+: {
            local image = self,

            aptPackages+: ["nginx"],

            nginxMonitoringConf:: |||
                server {
                    listen 80;
                    server_name local-stackdriver-agent.stackdriver.com;
                    location /nginx_status {
                      stub_status on;
                      access_log   off;
                      allow 127.0.0.1;
                      deny all;
                    }
                    location / {
                      root /dev/null;
                    }
                }
            |||,

            nginxCollectdConf:: |||
                LoadPlugin "nginx"
                <Plugin "nginx">
                  URL "http://local-stackdriver-agent.stackdriver.com/nginx_status"
                </Plugin>
            |||,


            cmds+: (if version.enableMonitoring then [
                cmd.LiteralFile {
                    to: "/etc/nginx/conf.d/monitoring.conf",
                    content: image.nginxMonitoringConf,
                },
                cmd.LiteralFile {
                    to: "/opt/stackdriver/collectd/etc/collectd.d/nginx.conf",
                    content: image.nginxCollectdConf,
                },
            ] else []) + [
                "rm /etc/nginx/sites-enabled/default",
            ],
        },


        // Filse that must exist on top before any handling daemons are started.
        httpContentCmds:: [
            cmd.EnsureDir { dir: "/var/www", owner: "www-data" },
        ],

        // Running handling daemons.
        httpHandlerCmds:: [
        ],

        // Additional Nginx config commands.
        nginxAdditionalCmds:: [
        ],

        cmds+: self.httpContentCmds + self.httpHandlerCmds + self.nginxAdditionalCmds + [
            "nginx -s reload",
        ],
    },
}
