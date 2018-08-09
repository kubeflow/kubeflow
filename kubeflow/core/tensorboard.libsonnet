{
  // Parameters are intended to be late bound.
  params:: {
    name: null,
    labels: {
      app: $.params.name,
    },

    serviceType: "ClusterIP",

    logDir: "",

    defaultTbImage: "gcr.io/tensorflow/tensorflow:latest",


    // Whether or not to enable s3 parameters
    s3Enable:: false,

    // Which cloud to use
    cloud:: null,
  },

  // Parametes specific to GCP.
  gcpParams:: {
    gcpCredentialSecretName: "",
  } + $.params,

  // Parameters that control S3 access
  // params overrides s3params because params can be overwritten by the user to override the defaults.
  s3params:: {
    //  Name of the k8s secrets containing S3 credentials
    s3SecretName: "",
    // Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID.
    s3SecretAccesskeyidKeyName: "",

    // Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY.
    s3SecretSecretaccesskeyKeyName: "",

    // S3 region
    s3AwsRegion: "us-west-1",

    // TODO(jlewi): We should use util.toBool to automatically conver to actual boolean values.
    // The use of strings is left over from when they were prototype parameters which only supports string type.

    // true Whether or not to use https for S3 connections
    s3UseHttps: "true",

    // Whether or not to verify https certificates for S3 connections
    s3VerifySsl: "true",

    // URL for your s3-compatible endpoint.
    s3Endpoint: "http://s3.us-west-1.amazonaws.com,",
  } + $.params,


  components:: {

    all::
      // TODO(jlewi): It would be better to structure s3 as a mixin.
      // As an example it would be great to allow S3 and GCS parameters
      // to be enabled simultaneously. This should be doable because
      // each entails adding a set of environment variables and volumes
      // to the containers. These volumes/environment variables shouldn't
      // overlap so there's no reason we shouldn't be able to just add
      // both modifications to the base container.
      // I think we want to restructure things as mixins so they can just
      // be added.
      if $.params.s3Enable then
        [
          $.s3parts.tb,
          $.s3parts.tfDeployment,
        ]
      else if $.params.cloud == "gcp" then
        [
          $.gcpParts.tb,
          $.gcpParts.tfDeployment,
        ]
      else
        [
          $.parts.tb,
          $.parts.tfDeployment,
        ],
  }.all,

  parts:: {
    // We define the containers one level beneath parts because combined with jsonnet late binding
    // this makes it easy for users to override specific bits of the container.
    tbContainer:: {
      name: $.params.name,
      image: $.params.defaultTbImage,
      imagePullPolicy: "IfNotPresent",
      args: [
        $.params.logDir,
        "--port=9000",
      ],
      command: [
        "/usr/local/bin/tensorboard",
      ],
      ports: [
        {
          containerPort: 9000,
        },
      ],

      resources: {
        requests: {
          memory: "1Gi",
          cpu: "1",
        },
        limits: {
          memory: "4Gi",
          cpu: "4",
        },
      },
    },  // tbContainer

    tfDeployment: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: $.params.name,
        namespace: $.params.namespace,
        labels: $.params.labels,
      },
      spec: {
        template: {
          metadata: {
            labels: $.params.labels,
          },
          spec: {
            containers: [
              $.parts.tbContainer,
            ],

          },
        },
      },
    },  // tfDeployment

    tb: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: $.params.labels,
        name: $.params.name,
        namespace: $.params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tb-mapping-" + $.params.name + "-get",
              "prefix: /tensorboard/ " + $.params.name + "/",
              "rewrite: /",
              "method: GET",
              "service: " + $.params.name + "." + $.params.namespace + ":9000",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            name: "tb",
            port: 9000,
            targetPort: 9000,
          },
        ],
        selector: $.params.labels,
        type: $.params.serviceType,
      },
    },  // tb

  },  // parts

  // Parts specific to S3
  s3parts:: $.parts {
    s3Env:: [
      { name: "AWS_ACCESS_KEY_ID", valueFrom: { secretKeyRef: { name: $.s3params.s3SecretName, key: $.s3params.s3SecretAccesskeyidKeyName } } },
      { name: "AWS_SECRET_ACCESS_KEY", valueFrom: { secretKeyRef: { name: $.s3params.s3SecretName, key: $.s3params.s3SecretSecretaccesskeyKeyName } } },
      { name: "AWS_REGION", value: $.s3params.s3AwsRegion },
      { name: "S3_REGION", value: $.s3params.s3AwsRegion },
      { name: "S3_USE_HTTPS", value: $.s3params.s3UseHttps },
      { name: "S3_VERIFY_SSL", value: $.s3params.s3VerifySsl },
      { name: "S3_ENDPOINT", value: $.s3params.s3Endpoint },
    ],

    tbContainer: $.parts.tbContainer {
      env+: $.s3parts.s3Env,
    },

    tfDeployment: $.parts.tfDeployment {
      spec: +{
        template: +{

          spec: +{
            containers: [
              $.s3parts.tbContainer,
            ],
          },
        },
      },
    },  // tfDeployment
  },  // s3parts

  // Parts specific to GCP
  gcpParts:: $.parts {
    gcpEnv:: [
      if $.gcpParams.gcpCredentialSecretName != "" then
        { name: "GOOGLE_APPLICATION_CREDENTIALS", value: "/secret/gcp-credentials/key.json" },
    ],

    tbContainer: $.parts.tbContainer {
      env+: $.gcpParts.gcpEnv,
      volumeMounts+: [
        if $.gcpParams.gcpCredentialSecretName != "" then
          {
            name: "gcp-credentials",
            mountPath: "/secret/gcp-credentials",
          },
      ],
    },

    tfDeployment: $.parts.tfDeployment {
      spec+: {
        template+: {

          spec+: {
            containers: [
              $.gcpParts.tbContainer,
            ],

            volumes: [
              if $.gcpParams.gcpCredentialSecretName != "" then
                {
                  name: "gcp-credentials",
                  secret: {
                    secretName: $.gcpParams.gcpCredentialSecretName,
                  },
                },
            ],
          },
        },
      },
    },  // tfDeployment
  },  // gcpParts
}
