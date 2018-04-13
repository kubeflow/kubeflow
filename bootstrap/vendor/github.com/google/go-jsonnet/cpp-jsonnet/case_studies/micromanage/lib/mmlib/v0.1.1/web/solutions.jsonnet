local nginx = import "nginx.jsonnet";
local uwsgi_flask = import "uwsgi_flask.jsonnet";

{
    /** A mixin on top of an HttpService with Debian instances that adds nginx, uwsgi, and flask. */
    DebianFlaskHttpService: {
        local service = self,
        uwsgiModuleContent:: |||
            import flask
            app = flask.Flask(__name__) 
            @app.route('/') 
            def hello_world():
                return 'No content is configured for this web service.'
        |||,
        Instance+: nginx.DebianNginxMixin + uwsgi_flask.DebianUwsgiFlask + uwsgi_flask.NginxUwsgiGlue {
            httpPort: service.httpPort,
            uwsgiModuleContent: service.uwsgiModuleContent,
        },
    },
}
