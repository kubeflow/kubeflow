{
    /** A mixin on top of a single instance service that turns it into an HTTP service. */
    HttpSingleInstance: {
        local service = self,
        httpPort:: 80,
        fwTcpPorts+: [self.httpPort],
        outputs: {
            "${-}": "http://%s:%d" % [service.refAddress("${-}"), service.httpPort],
        },
    },

    /** A mixin on top of a cluster3 service that turns it into an HTTP service. */
    HttpService3: self.HttpSingleInstance {
        lbTcpPorts+: [self.httpPort],
        httpHealthCheckPort: self.httpPort,
    },

}
