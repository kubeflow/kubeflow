{
  all(params, namespace):: [
    $.parts(params, namespace).artifactStoreDeployment,
    $.parts(params, namespace).artifactStoreService,
    $.parts(params, namespace).artifactStoreConfig,
    $.parts(params, namespace).backendProxyDeployment,
    $.parts(params, namespace).backendProxyService,
    $.parts(params, namespace).modeldbBackendDeployment,
    $.parts(params, namespace).modeldbBackendSecret,
    $.parts(params, namespace).modeldbBackendService,
    $.parts(params, namespace).webappDeployment,
    $.parts(params, namespace).webappService,
  ] + if params.mysqlDbService != 'true' then [] else [
    $.parts(params, namespace).mysqlBackendDeployment,
    $.parts(params, namespace).mysqlBackendPV,
    $.parts(params, namespace).mysqlBackendService,
  ],

  parts(params, namespace):: {
    artifactStoreConfig: {
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: {
        namespace: namespace,
        name: 'modeldb-artifact-store-config',
      },
      data: {
        'config.yaml': if params.artifactConfig != '' then params.artifactConfig else
          std.join('\n', [
            '#ArtifactStore Properties',
            'artifactStore_grpcServer:',
            '  port: 8086',
            '',
            'artifactStoreConfig:',
            '  initializeBuckets: false',
            '  storageTypeName: amazonS3 #amazonS3, googleCloudStorage, nfs',
            '  #nfsRootPath: /path/to/my/nfs/storage/location',
            '  bucket_names:',
            '    - artifactstoredemo',
          ]),
      },
      type: 'Opaque',
    },
    artifactStoreDeployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-artifact-store',
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'modeldb',
            tier: 'artifact-store',
          },
        },
        strategy: {
          type: 'Recreate',
        },
        template: {
          metadata: {
            labels: {
              app: 'modeldb',
              tier: 'artifact-store',
            },
          },
          spec: {
            containers: [
              {
                image: params.artifactStoreImage,
                imagePullPolicy: 'Always',
                name: 'modeldb-artifact-store',
                env: [
                  {
                    name: 'VERTA_ARTIFACT_CONFIG',
                    value: '/config/config.yaml',
                  },
                ],
                ports: [
                  {
                    containerPort: 8086,
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: '/config',
                    name: 'modeldb-artifact-store-config',
                    readOnly: true,
                  },
                ],
              },
            ],
            volumes: [
              {
                name: 'modeldb-artifact-store-config',
                configMap: {
                  name: 'modeldb-artifact-store-config',
                },
              },
            ],
          },
        },
      },
    },
    artifactStoreService: {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-artifact-store',
      },
      spec: {
        ports: [
          {
            port: 8086,
            targetPort: 8086,
          },
        ],
        selector: {
          app: 'modeldb',
          tier: 'artifact-store',
        },
        type: 'ClusterIP',
      },
    },
    backendProxyDeployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-backend-proxy',
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'modeldb',
            tier: 'backend-proxy',
          },
        },
        strategy: {
          type: 'Recreate',
        },
        template: {
          metadata: {
            labels: {
              app: 'modeldb',
              tier: 'backend-proxy',
            },
          },
          spec: {
            containers: [
              {
                image: params.modeldbBackendProxyImage,
                imagePullPolicy: 'Always',
                name: 'modeldb-backend-proxy',
                command: ['/go/bin/proxy'],
                args: [
                  '-project_endpoint',
                  'modeldb-backend:8085',
                  '-experiment_endpoint',
                  'modeldb-backend:8085',
                  '-experiment_run_endpoint',
                  'modeldb-backend:8085',
                ],
                ports: [
                  {
                    containerPort: 8080,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    backendProxyService: {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-backend-proxy',
      },
      spec: {
        ports: [
          {
            port: 8080,
            targetPort: 8080,
          },
        ],
        selector: {
          app: 'modeldb',
          tier: 'backend-proxy',
        },
        type: params.modeldbBackendService,
      },
    },
    modeldbBackendDeployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-backend',
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'modeldb',
            tier: 'backend',
          },
        },
        strategy: {
          type: 'Recreate',
        },
        template: {
          metadata: {
            labels: {
              app: 'modeldb',
              tier: 'backend',
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: 'VERTA_MODELDB_CONFIG',
                    value: '/config-backend/config.yaml',
                  },
                ],
                image: params.modeldbBackendImage,
                imagePullPolicy: 'Always',
                name: 'modeldb-backend',
                ports: [
                  {
                    containerPort: 8085,
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: '/config-backend',
                    name: 'modeldb-backend-secret-volume',
                    readOnly: true,
                  },
                ],
              },
            ],
            volumes: [
              {
                name: 'modeldb-backend-secret-volume',
                secret: {
                  secretName: 'modeldb-backend-config-secret',
                },
              },
            ],
          },
        },
      },
    },
    modeldbBackendSecret: {
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        namespace: namespace,
        name: 'modeldb-backend-config-secret',
      },
      stringData: {
        'config.yaml': if params.config != '' then params.config else
          std.join('\n', [
            '#ModelDB Properties',
            'grpcServer:',
            '  port: 8085',
            '',
            '#Entity name list',
            'entities:',
            '  projectEntity: Project',
            '  experimentEntity: Experiment',
            '  experimentRunEntity: ExperimentRun',
            '  artifactStoreMappingEntity: ArtifactStoreMapping',
            '  jobEntity: Job',
            '  collaboratorEntity: Collaborator',
            '',
            '# Database settings (type mysql, mongodb, couchbasedb etc..)',
            'database:',
            '  DBType: rdbms',
            '  RdbConfiguration:',
            '    RdbDatabaseName: modeldb',
            '    RdbDriver: "com.mysql.cj.jdbc.Driver"',
            '    RdbDialect: "org.hibernate.dialect.MySQL5Dialect"',
            '    RdbUrl: "jdbc:mysql://modeldb-mysql-backend:3306"',
            '    RdbUsername: root',
            '    RdbPassword: root',
            '',
            '#ArtifactStore Properties',
            'artifactStore_grpcServer:',
            '  host: artifact-store-backend',
            '  port: 8086',
            '',
            '#AuthService Properties',
            'authService:',
            '  host: #uacservice # Docker container name OR docker IP',
            '  port: #50051',
          ]),
      },
      type: 'Opaque',
    },
    modeldbBackendService: {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-backend',
      },
      spec: {
        ports: [
          {
            port: 8085,
          },
        ],
        selector: {
          app: 'modeldb',
          tier: 'backend',
        },
        type: params.modeldbBackendService,
      },
    },
    mysqlBackendDeployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-mysql-backend',
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'modeldb',
            tier: 'mysql',
          },
        },
        strategy: {
          type: 'Recreate',
        },
        template: {
          metadata: {
            labels: {
              app: 'modeldb',
              tier: 'mysql',
            },
          },
          spec: {
            containers: [
              {
                image: params.modeldbDatabaseImage,
                imagePullPolicy: 'Always',
                name: 'modeldb-mysql-backend',
                args: [
                  '--ignore-db-dir=lost+found',
                ],
                env: [
                  {
                    name: 'MYSQL_ROOT_PASSWORD',
                    value: 'root',
                  },
                ],
                ports: [
                  {
                    containerPort: 3306,
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: '/var/lib/mysql',
                    name: 'modeldb-mysql-persistent-storage',
                  },
                ],
              },
            ],
            volumes: [
              {
                name: 'modeldb-mysql-persistent-storage',
                persistentVolumeClaim: {
                  claimName: 'modeldb-mysql-pv-claim',
                },
              },
            ],
          },
        },
      },
    },
    mysqlBackendPV: {
      apiVersion: 'v1',
      kind: 'PersistentVolumeClaim',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-mysql-pv-claim',
      },
      spec: {
        accessModes: [
          'ReadWriteOnce',
        ],
        resources: {
          requests: {
            storage: params.modeldbMysqlPvcSize,
          },
        },
      },
    },
    mysqlBackendService: {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-mysql-backend',
      },
      spec: {
        ports: [
          {
            port: 3306,
            targetPort: 3306,
          },
        ],
        selector: {
          app: 'modeldb',
          tier: 'mysql',
        },
        type: 'ClusterIP',
      },
    },
    webappDeployment: {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-webapp',
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'modeldb',
            tier: 'webapp',
          },
        },
        strategy: {
          type: 'Recreate',
        },
        template: {
          metadata: {
            labels: {
              app: 'modeldb',
              tier: 'webapp',
            },
          },
          spec: {
            containers: [
              {
                image: params.modeldbWebappImage,
                imagePullPolicy: 'Always',
                name: 'modeldb-webapp',
                ports: [
                  {
                    containerPort: 3000,
                  },
                ],
              },
            ],
          },
        },
      },
    },
    webappService: {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        labels: {
          app: 'modeldb',
        },
        namespace: namespace,
        name: 'modeldb-webapp',
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 3000,
          },
        ],
        selector: {
          app: 'modeldb',
          tier: 'webapp',
        },
        type: params.modeldbWebappService,
      },
    },
  },
}
