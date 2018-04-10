{
    HttpSingleInstance: {
        local service = self,
        httpPort:: 80,
        fwTcpPorts+: [self.httpPort],
        outputs: {
            "${-}": "http://%s:%d" % [service.refAddress("${-}"), service.httpPort],
        },
    },

    HttpService3: self.HttpSingleInstance {
        lbTcpPorts+: [self.httpPort],
        httpHealthCheckPort: self.httpPort,
    },

}
