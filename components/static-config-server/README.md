#Static Config Http Server
This server serves static config file contents through specific path.
Used to share config among k8s pods.

### Parameters:
* keyfile: file path to the config file that will be served by server
* path: path on service address that will be used to serve the config
