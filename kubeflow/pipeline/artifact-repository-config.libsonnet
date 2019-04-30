{
  all(namespace):: [
    $.parts(namespace).artifactRepositoryCM,
  ],

  parts(namespace):: {
    artifactRepositoryCM(bucket, keyPrefix): {
      apiVersion: "v1",
      // Configuring the executor version and the default artifact repository
      kind: "ConfigMap",
      metadata: {
        name: "kfp-artifact-repository-configmap",
        namespace: namespace,
      },
      data: {
        artifactRepository: |||
          s3:
            bucket: mlpipeline
            keyPrefix: "runs/"
            endpoint: minio-service.%s:9000
            insecure: true
            accessKeySecret:
              name: mlpipeline-minio-artifact
              key: accesskey
            secretKeySecret:
              name: mlpipeline-minio-artifact
              key: secretkey"
        ||| % namespace,
      },
    },
   },  // parts
}
