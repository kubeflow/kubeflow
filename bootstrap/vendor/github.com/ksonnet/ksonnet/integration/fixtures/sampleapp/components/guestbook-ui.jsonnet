local k = import "k.libsonnet";
local service = k.core.v1.service;
local servicePort = k.core.v1.service.mixin.spec.portsType;

local targetPort = 80;
local labels = {app: "guestbook-ui"};

local appService = service
  .new(
    "guestbook-ui",
    labels,
    servicePort.new(80, targetPort))
  .withType("LoadBalancer");

k.core.v1.list.new([appService])
