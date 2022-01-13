# Eclipse Paho JavaScript client

The Paho JavaScript Client is an MQTT browser-based client library written in Javascript that uses WebSockets to connect to an MQTT Broker.

## Project description:

The Paho project has been created to provide reliable open-source implementations of open and standard messaging protocols aimed at new, existing, and emerging applications for Machine-to-Machine (M2M) and Internet of Things (IoT).
Paho reflects the inherent physical and cost constraints of device connectivity. Its objectives include effective levels of decoupling between devices and applications, designed to keep markets open and encourage the rapid growth of scalable Web and Enterprise middleware and applications.

## Links

- Project Website: [https://www.eclipse.org/paho](https://www.eclipse.org/paho)
- Eclipse Project Information: [https://projects.eclipse.org/projects/iot.paho](https://projects.eclipse.org/projects/iot.paho)
- Paho Javascript Client Page: [https://eclipse.org/paho/clients/js/](https://eclipse.org/paho/clients/js)
- GitHub: [https://github.com/eclipse/paho.mqtt.javascript](https://github.com/eclipse/paho.mqtt.javascript)
- Twitter: [@eclipsepaho](https://twitter.com/eclipsepaho)
- Issues: [github.com/eclipse/paho.mqtt.javascript/issues](https://github.com/eclipse/paho.mqtt.javascript/issues)
- Mailing-list: [https://dev.eclipse.org/mailman/listinfo/paho-dev](https://dev.eclipse.org/mailman/listinfo/paho-dev


## Using the Paho Javascript Client


### Downloading

A zip file containing the full and a minified version the Javascript client can be downloaded from the [Paho downloads page](https://projects.eclipse.org/projects/technology.paho/downloads)

Alternatively the Javascript client can be downloaded directly from the projects git repository: [https://raw.githubusercontent.com/eclipse/paho.mqtt.javascript/master/src/paho-mqtt.js](https://raw.githubusercontent.com/eclipse/paho.mqtt.javascript/master/src/paho-mqtt.js).

Please **do not** link directly to this url from your application.

### Building from source

There are two active branches on the Paho Java git repository, ```master``` which is used to produce stable releases, and ```develop``` where active development is carried out. By default cloning the git repository will download the ```master``` branch, to build from develop make sure you switch to the remote branch: ```git checkout -b develop remotes/origin/develop```

The project contains a maven based build that produces a minified version of the client, runs unit tests and generates it's documentation.

To run the build:

```
$ mvn
```

The output of the build is copied to the ```target``` directory.

### Tests

The client uses the [Jasmine](http://jasmine.github.io/) test framework. The tests for the client are in:

```
src/tests
```

To run the tests with maven, use the following command:
```
$ mvn test
```
The parameters passed in should be modified to match the broker instance being tested against.

### Documentation

Reference documentation is online at: [http://www.eclipse.org/paho/files/jsdoc/index.html](http://www.eclipse.org/paho/files/jsdoc/index.html)

### Compatibility

The client should work in any browser fully supporting WebSockets, [http://caniuse.com/websockets](http://caniuse.com/websockets) lists browser compatibility.

## Getting Started

The included code below is a very basic sample that connects to a server using WebSockets and subscribes to the topic ```World```, once subscribed, it then publishes the message ```Hello``` to that topic. Any messages that come into the subscribed topic will be printed to the Javascript console.

This requires the use of a broker that supports WebSockets natively, or the use of a gateway that can forward between WebSockets and TCP.

```JS
// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}
```
