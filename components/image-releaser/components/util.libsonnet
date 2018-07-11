{
  // convert a list of two items into a map representing an environment variable
  listToMap:: function(v)
    {
      name: v[0],
      value: v[1],
    },
  // Function to turn comma separated list of prow environment variables into a dictionary.
  parseEnv:: function(v)
    local pieces = std.split(v, ",");
    if v != "" && std.length(pieces) > 0 then
      std.map(
        function(i) $.listToMap(std.split(i, "=")),
        std.split(v, ",")
      )
    else [],

  // Build an Argo template to execute a particular command.
  // step_name: Name for the template
  // command: List to pass as the container command.
  buildTemplate:: function(stepName, command, image, pythonPath, prowEnv, envVars=[], sidecars=[]) {
    name: stepName,
    // The tensorflow notebook image builds are flaky because they are very
    // large builds and sometimes there are timeouts while downloading
    // some pip packages. Retry upto 3 times before giving up.
    retryStrategy: {
      limit: 3,
    },
    container: {
      command: command,
      image: image,
      env: [
        {
          // Add the source directories to the python path.
          name: "PYTHONPATH",
          value: pythonPath,
        },
        {
          name: "GOOGLE_APPLICATION_CREDENTIALS",
          value: "/secret/gcp-credentials/key.json",
        },
        {
          name: "GITHUB_TOKEN",
          valueFrom: {
            secretKeyRef: {
              name: "github-token",
              key: "github_token",
            },
          },
        },
      ] + prowEnv + envVars,
      resources: {
        requests: {
          memory: "6Gi",
          cpu: "3",
        },
      },
      volumeMounts: [
        {
          name: "kubeflow-test-volume",
          mountPath: "/mnt/test-data-volume",
        },
        {
          name: "github-token",
          mountPath: "/secret/github-token",
        },
        {
          name: "gcp-credentials",
          mountPath: "/secret/gcp-credentials",
        },
      ],
    },
    sidecars: sidecars,
  },  // buildTemplate

  buildImageTemplate:: function(stepName, command, image, pythonPath, prowEnv)
    $.buildTemplate(
      stepName,
      command,
      image,
      pythonPath,
      prowEnv,
      [
        {
          name: "DOCKER_HOST",
          value: "127.0.0.1",
        },
      ],
      [{
        name: "dind",
        image: "docker:17.10-dind",
        securityContext: {
          privileged: true,
        },
        mirrorVolumeMounts: true,
      }],
    ),  // buildImageTemplate
}
