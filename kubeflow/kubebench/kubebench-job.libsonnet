local k = import "k.libsonnet";

{
  parts:: {

    workflow(name,
             namespace,
             serviceAccount,
             controllerImage,
             configPvc,
             dataPvc,
             experimentPvc,
             githubTokenSecret,
             githubTokenSecretKey,
             awsCredentialsSecret,
             awsCredentialsSecretAccessKeyId,
             awsCredentialsSecretAccessKey,
             awsRegion,
             gcpCredentialsSecret,
             gcpCredentialsSecretKey,
             mainJobKsPrototype,
             mainJobKsPackage,
             mainJobKsRegistry,
             mainJobConfig,
             postJobImage,
             postJobArgs,
             reporterType,
             csvReporterInput,
             csvReporterOutput):

      local kubebenchConfigVol = "kubebench-config-volume";
      local kubebenchDataVol = "kubebench-data-volume";
      local kubebenchExpVol = "kubebench-exp-volume";
      local kubebenchGithubTokenVol = "kubebench-github-token-volume";
      local kubebenchGcpCredsVol = "kubebench-gcp-credentials-volume";
      local kubebenchConfigRoot = "/kubebench/config";
      local kubebenchDataRoot = "/kubebench/data";
      local kubebenchExpRoot = "/kubebench/experiments";
      local configuratorOutputDir = "/kubebench/configurator/output";
      local manifestOutput = configuratorOutputDir + "/kf-job-manifest.yaml";
      local experimentIdOutput = configuratorOutputDir + "/experiment-id";

      local mainJobKsPrototypeRef = {
        name: mainJobKsPrototype,
        package: mainJobKsPackage,
        registry: mainJobKsRegistry,
      };

      local ownerReferences = [
        {
          apiVersion: "argoproj.io/v1alpha1",
          blockOwnerDeletion: true,
          kind: "Workflow",
          name: "{{workflow.name}}",
          uid: "{{workflow.uid}}",
        },
      ];

      local reporterArgs = if reporterType == "csv" then [
        "--input-file=" + csvReporterInput,
        "--output-file=" + csvReporterOutput,
      ] else [];

      local awsSecretEnv = if awsCredentialsSecret != "null" then [
        {
          name: "AWS_ACCESS_KEY_ID",
          valueFrom: {
            secretKeyRef: {
              name: awsCredentialsSecret,
              key: awsCredentialsSecretAccessKeyId,
            },
          },
        },
        {
          name: "AWS_SECRET_ACCESS_KEY",
          valueFrom: {
            secretKeyRef: {
              name: awsCredentialsSecret,
              key: awsCredentialsSecretAccessKey,
            },
          },
        },
        {
          name: "AWS_REGION",
          value: awsRegion
        },
      ] else [];

      local secretEnvVars = [
        if gcpCredentialsSecret != "null" then {
          name: "GOOGLE_APPLICATION_CREDENTIALS",
          value: "/secret/gcp-credentials/" + gcpCredentialsSecretKey,
        },
        if githubTokenSecret != "null" then {
          name: "GITHUB_TOKEN",
          valueFrom: {
            secretKeyRef: {
              name: githubTokenSecret,
              key: githubTokenSecretKey,
            },
          },
        },
      ] + awsSecretEnv;  // secretEnvVars
      local baseEnvVars = [
        {
          name: "KUBEBENCH_CONFIG_ROOT",
          value: kubebenchConfigRoot,
        },
        {
          name: "KUBEBENCH_EXP_ROOT",
          value: kubebenchExpRoot,
        },
        {
          name: "KUBEBENCH_DATA_ROOT",
          value: kubebenchDataRoot,
        },
      ];  // baseEnvVars
      local expEnvVars(isConfigurator=false) = [
        if isConfigurator then {
          name: "KUBEBENCH_EXP_ID",
          value: "null",
        }
        else {
          name: "KUBEBENCH_EXP_ID",
          value: "{{inputs.parameters.experiment-id}}",
        },
        {
          name: "KUBEBENCH_EXP_PATH",
          value: "$(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)",
        },
        {
          name: "KUBEBENCH_EXP_CONFIG_PATH",
          value: "$(KUBEBENCH_EXP_PATH)/config",
        },
        {
          name: "KUBEBENCH_EXP_OUTPUT_PATH",
          value: "$(KUBEBENCH_EXP_PATH)/output",
        },
        {
          name: "KUBEBENCH_EXP_RESULT_PATH",
          value: "$(KUBEBENCH_EXP_PATH)/result",
        },
      ];  // expEnvVars

      local secretVols = [
        if githubTokenSecret != "null" then {
          name: kubebenchGithubTokenVol,
          secret: {
            secretName: githubTokenSecret,
          },
        },
        if gcpCredentialsSecret != "null" then {
          name: kubebenchGcpCredsVol,
          secret: {
            secretName: gcpCredentialsSecret,
          },
        },
      ];  // secretVols
      local baseVols = [
        {
          name: kubebenchConfigVol,
          persistentVolumeClaim: {
            claimName: configPvc,
          },
        },
        {
          name: kubebenchExpVol,
          persistentVolumeClaim: {
            claimName: experimentPvc,
          },
        },
        if dataPvc != "null" then {
          name: kubebenchDataVol,
          persistentVolumeClaim: {
            claimName: dataPvc,
          },
        },
      ];  // baseVols

      local secretVolMnts = [
        if githubTokenSecret != "null" then {
          name: kubebenchGithubTokenVol,
          mountPath: "/secret/github-token",
        },
        if gcpCredentialsSecret != "null" then {
          name: kubebenchGcpCredsVol,
          mountPath: "/secret/gcp-credentials",
        },
      ];  // secretVolMnts
      local baseVolMnts = [
        {
          name: kubebenchConfigVol,
          mountPath: kubebenchConfigRoot,
        },
        {
          name: kubebenchExpVol,
          mountPath: kubebenchExpRoot,
        },
        if dataPvc != "null" then {
          name: kubebenchDataVol,
          mountPath: kubebenchDataRoot,
        },
      ];  // baseVolMnts

      local buildStep(name, template, argParams=[]) = {
        name: name,
        template: template,
      } + if std.length(argParams) > 0 then {
        arguments: {
          parameters: argParams,
        },
      } else {};  // buildStep

      local buildTemplate(stepName, image, command, envVars=[], volMnts=[], inParams=[], outParams=[]) = {
        name: stepName,
        container: {
          command: command,
          image: image,
          env: envVars,
          volumeMounts: volMnts,
        },
      } + if std.length(inParams) > 0 then {
        inputs: {
          parameters: inParams,
        },
      } else {} + if std.length(outParams) > 0 then {
        outputs: {
          parameters: outParams,
        },
      } else {};  // buildTemplate

      local buildResourceTemplate(stepName, action, manifest, successCondition=null, failureCondition=null, inParams=[], outParams=[]) = {
        name: stepName,
        resource: {
          action: action,
          manifest: manifest,
          [if successCondition != null then "successCondition"]: successCondition,
          [if failureCondition != null then "failureCondition"]: failureCondition,
        },
      } + if std.length(inParams) > 0 then {
        inputs: {
          parameters: inParams,
        },
      } else {} + if std.length(outParams) > 0 then {
        outputs: {
          parameters: outParams,
        },
      } else {};  // buildResourceTemplate

      {
        apiVersion: "argoproj.io/v1alpha1",
        kind: "Workflow",
        metadata: {
          name: name,
          namespace: namespace,
        },
        spec: {
          [if serviceAccount != "default" then "serviceAccountName"]: serviceAccount,
          entrypoint: "kubebench-workflow",
          volumes: secretVols + baseVols,
          templates: [
            {
              name: "kubebench-workflow",
              steps: [
                [buildStep("run-configurator", "configurator")],
                [
                  buildStep(
                    "launch-main-job",
                    "main-job",
                    argParams=[
                      {
                        name: "kf-job-manifest",
                        value: "{{steps.run-configurator.outputs.parameters.kf-job-manifest}}",
                      },
                      {
                        name: "experiment-id",
                        value: "{{steps.run-configurator.outputs.parameters.experiment-id}}",
                      },
                    ],
                  ),
                ],
                [
                  buildStep(
                    "wait-for-main-job",
                    "main-job-monitor",
                    argParams=[
                      {
                        name: "kf-job-manifest",
                        value: "{{steps.run-configurator.outputs.parameters.kf-job-manifest}}",
                      },
                    ],
                  ),
                ],
                if postJobImage != "null" && postJobArgs != "null" then
                [
                  buildStep(
                    "run-post-job",
                    "post-job",
                    argParams=[
                      {
                        name: "kf-job-manifest",
                        value: "{{steps.run-configurator.outputs.parameters.kf-job-manifest}}",
                      },
                      {
                        name: "experiment-id",
                        value: "{{steps.run-configurator.outputs.parameters.experiment-id}}",
                      },
                    ],
                  ),
                ] else [],
                if reporterType != "null" then
                [
                  buildStep(
                    "run-reporter",
                    "reporter",
                    argParams=[
                      {
                        name: "kf-job-manifest",
                        value: "{{steps.run-configurator.outputs.parameters.kf-job-manifest}}",
                      },
                      {
                        name: "experiment-id",
                        value: "{{steps.run-configurator.outputs.parameters.experiment-id}}",
                      },
                    ],
                  ),
                ] else [],
              ],
            },
            buildTemplate(
              "configurator",
              controllerImage,
              [
                "configurator",
                "--template-ref=" + std.toString(mainJobKsPrototypeRef),
                "--config=" + mainJobConfig,
                "--namespace=" + namespace,
                "--owner-references=" + std.toString(std.prune(ownerReferences)),
                "--volumes=" + std.toString(std.prune(baseVols)),
                "--volume-mounts=" + std.toString(std.prune(baseVolMnts)),
                "--env-vars=" + std.toString(std.prune(baseEnvVars + expEnvVars(isConfigurator=true))),
                "--manifest-output=" + manifestOutput,
                "--experiment-id-output=" + experimentIdOutput,
              ],
              envVars=secretEnvVars + baseEnvVars,
              volMnts=secretVolMnts + baseVolMnts,
              outParams=[
                {
                  name: "kf-job-manifest",
                  valueFrom: {
                    path: manifestOutput,
                  },
                },
                {
                  name: "experiment-id",
                  valueFrom: {
                    path: experimentIdOutput,
                  },
                },
              ],
            ),
            buildResourceTemplate(
              "main-job",
              "create",
              "{{inputs.parameters.kf-job-manifest}}",
              successCondition="status.startTime",
              inParams=[{ name: "kf-job-manifest" }],
            ),
            buildResourceTemplate(
              "main-job-monitor",
              "get",
              "{{inputs.parameters.kf-job-manifest}}",
              successCondition="status.completionTime",
              inParams=[{ name: "kf-job-manifest" }],
            ),
            if postJobImage != "null" && postJobArgs != "null" then
            buildTemplate(
              "post-job",
              postJobImage,
              postJobArgs,
              envVars=baseEnvVars + expEnvVars(),
              volMnts=baseVolMnts,
              inParams=[{ name: "experiment-id" }],
            ) else {},
            if reporterType != "null" then
            buildTemplate(
              "reporter",
              controllerImage,
              ["reporter", reporterType] + reporterArgs,
              envVars=secretEnvVars + baseEnvVars + expEnvVars(),
              volMnts=secretVolMnts + baseVolMnts,
              inParams=[{ name: "experiment-id" }],
            ) else {},
          ],  // templates
        },
      },  // workflow
  },
}
