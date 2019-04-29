package kustomize_test

import (
  "testing"
)

func writeModeldb(th *KustTestHarness) {
  th.writeF("/manifests/modeldb/base/config-map.yaml", `
apiVersion: v1
data:
  config.yaml: |-
    #ArtifactStore Properties
    artifactStore_grpcServer:
      port: 8086

    artifactStoreConfig:
      initializeBuckets: false
      storageTypeName: amazonS3 #amazonS3, googleCloudStorage, nfs
      #nfsRootPath: /path/to/my/nfs/storage/location
      bucket_names:
        - artifactstoredemo
kind: ConfigMap
metadata:
  name: modeldb-artifact-store-config
type: Opaque
`)
  th.writeF("/manifests/modeldb/base/deployment.yaml", `
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
  name: modeldb-artifact-store
spec:
  selector:
    matchLabels:
      app: modeldb
      tier: artifact-store
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        tier: artifact-store
    spec:
      containers:
      - env:
        - name: VERTA_ARTIFACT_CONFIG
          value: /config/config.yaml
        image: vertaaiofficial/modeldb-artifact-store:kubeflow
        imagePullPolicy: Always
        name: modeldb-artifact-store
        ports:
        - containerPort: 8086
        volumeMounts:
        - mountPath: /config
          name: modeldb-artifact-store-config
          readOnly: true
      volumes:
      - configMap:
          name: modeldb-artifact-store-config
        name: modeldb-artifact-store-config
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
  name: modeldb-backend
spec:
  selector:
    matchLabels:
      app: modeldb
      tier: backend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        tier: backend
    spec:
      containers:
      - env:
        - name: VERTA_MODELDB_CONFIG
          value: /config-backend/config.yaml
        image: vertaaiofficial/modeldb-backend:kubeflow
        imagePullPolicy: Always
        name: modeldb-backend
        ports:
        - containerPort: 8085
        volumeMounts:
        - mountPath: /config-backend
          name: modeldb-backend-secret-volume
          readOnly: true
      volumes:
      - name: modeldb-backend-secret-volume
        secret:
          secretName: modeldb-backend-config-secret
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
  name: modeldb-mysql-backend
spec:
  selector:
    matchLabels:
      app: modeldb
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        tier: mysql
    spec:
      containers:
      - args:
        - --ignore-db-dir=lost+found
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: root
        image: mysql:5.7
        imagePullPolicy: Always
        name: modeldb-mysql-backend
        ports:
        - containerPort: 3306
        volumeMounts:
        - mountPath: /var/lib/mysql
          name: modeldb-mysql-persistent-storage
      volumes:
      - name: modeldb-mysql-persistent-storage
        persistentVolumeClaim:
          claimName: modeldb-mysql-pv-claim
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
  name: modeldb-backend-proxy
spec:
  selector:
    matchLabels:
      app: modeldb
      tier: backend-proxy
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        tier: backend-proxy
    spec:
      containers:
      - args:
        - -project_endpoint
        - modeldb-backend:8085
        - -experiment_endpoint
        - modeldb-backend:8085
        - -experiment_run_endpoint
        - modeldb-backend:8085
        command:
        - /go/bin/proxy
        image: vertaaiofficial/modeldb-backend-proxy:kubeflow
        imagePullPolicy: Always
        name: modeldb-backend-proxy
        ports:
        - containerPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
  name: modeldb-webapp
spec:
  selector:
    matchLabels:
      app: modeldb
      tier: webapp
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        tier: webapp
    spec:
      containers:
      - image: vertaaiofficial/modeldb-frontend:kubeflow
        imagePullPolicy: Always
        name: modeldb-webapp
        ports:
        - containerPort: 3000
`)
  th.writeK("/manifests/modeldb/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- config-map.yaml
- deployment.yaml
- persistent-volume-claim.yaml
- secret.yaml
- service.yaml
namePrefix: modeldb-
commonLabels:
  kustomize.component: modeldb
`)
  th.writeF("/manifests/modeldb/base/persistent-volume-claim.yaml", `
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    app: modeldb
  name: modeldb-mysql-pv-claim
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi`)
  th.writeF("/manifests/modeldb/base/secret.yaml", `
apiVersion: v1
kind: Secret
metadata:
  name: modeldb-backend-config-secret
stringData:
  config.yaml: |-
    #ModelDB Properties
    grpcServer:
      port: 8085

    #Entity name list
    entities:
      projectEntity: Project
      experimentEntity: Experiment
      experimentRunEntity: ExperimentRun
      artifactStoreMappingEntity: ArtifactStoreMapping
      jobEntity: Job
      collaboratorEntity: Collaborator

    # Database settings (type mysql, mongodb, couchbasedb etc..)
    database:
      DBType: rdbms
      RdbConfiguration:
        RdbDatabaseName: modeldb
        RdbDriver: "com.mysql.cj.jdbc.Driver"
        RdbDialect: "org.hibernate.dialect.MySQL5Dialect"
        RdbUrl: "jdbc:mysql://modeldb-mysql-backend:3306"
        RdbUsername: root
        RdbPassword: root

    #ArtifactStore Properties
    artifactStore_grpcServer:
      host: artifact-store-backend
      port: 8086

    #AuthService Properties
    authService:
      host: #uacservice # Docker container name OR docker IP
      port: #50051
type: Opaque`)
  th.writeF("/manifests/modeldb/base/service.yaml", `
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
  name: modeldb-artifact-store
spec:
  ports:
  - port: 8086
    targetPort: 8086
  selector:
    app: modeldb
    tier: artifact-store
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
  name: modeldb-backend
spec:
  ports:
  - port: 8085
  selector:
    app: modeldb
    tier: backend
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
  name: modeldb-webapp
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: modeldb
    tier: webapp
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
  name: modeldb-backend-proxy
spec:
  ports:
  - port: 8080
    targetPort: 8080
  selector:
    app: modeldb
    tier: backend-proxy
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
  name: modeldb-mysql-backend
spec:
  ports:
  - port: 3306
    targetPort: 3306
  selector:
    app: modeldb
    tier: mysql
  type: ClusterIP
`)
}

func TestModeldb(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/modeldb/base")
  writeModeldb(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
data:
  config.yaml: |-
    #ArtifactStore Properties
    artifactStore_grpcServer:
      port: 8086

    artifactStoreConfig:
      initializeBuckets: false
      storageTypeName: amazonS3 #amazonS3, googleCloudStorage, nfs
      #nfsRootPath: /path/to/my/nfs/storage/location
      bucket_names:
        - artifactstoredemo
kind: ConfigMap
metadata:
  labels:
    kustomize.component: modeldb
  name: modeldb-modeldb-artifact-store-config
  namespace: kubeflow
type: Opaque
---
apiVersion: v1
kind: Secret
metadata:
  labels:
    kustomize.component: modeldb
  name: modeldb-modeldb-backend-config-secret
  namespace: kubeflow
stringData:
  config.yaml: |-
    #ModelDB Properties
    grpcServer:
      port: 8085

    #Entity name list
    entities:
      projectEntity: Project
      experimentEntity: Experiment
      experimentRunEntity: ExperimentRun
      artifactStoreMappingEntity: ArtifactStoreMapping
      jobEntity: Job
      collaboratorEntity: Collaborator

    # Database settings (type mysql, mongodb, couchbasedb etc..)
    database:
      DBType: rdbms
      RdbConfiguration:
        RdbDatabaseName: modeldb
        RdbDriver: "com.mysql.cj.jdbc.Driver"
        RdbDialect: "org.hibernate.dialect.MySQL5Dialect"
        RdbUrl: "jdbc:mysql://modeldb-mysql-backend:3306"
        RdbUsername: root
        RdbPassword: root

    #ArtifactStore Properties
    artifactStore_grpcServer:
      host: artifact-store-backend
      port: 8086

    #AuthService Properties
    authService:
      host: #uacservice # Docker container name OR docker IP
      port: #50051
type: Opaque
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-artifact-store
  namespace: kubeflow
spec:
  ports:
  - port: 8086
    targetPort: 8086
  selector:
    app: modeldb
    kustomize.component: modeldb
    tier: artifact-store
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-backend-proxy
  namespace: kubeflow
spec:
  ports:
  - port: 8080
    targetPort: 8080
  selector:
    app: modeldb
    kustomize.component: modeldb
    tier: backend-proxy
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-backend
  namespace: kubeflow
spec:
  ports:
  - port: 8085
  selector:
    app: modeldb
    kustomize.component: modeldb
    tier: backend
  type: LoadBalancer
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-mysql-backend
  namespace: kubeflow
spec:
  ports:
  - port: 3306
    targetPort: 3306
  selector:
    app: modeldb
    kustomize.component: modeldb
    tier: mysql
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-webapp
  namespace: kubeflow
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: modeldb
    kustomize.component: modeldb
    tier: webapp
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-artifact-store
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: modeldb
      kustomize.component: modeldb
      tier: artifact-store
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        kustomize.component: modeldb
        tier: artifact-store
    spec:
      containers:
      - env:
        - name: VERTA_ARTIFACT_CONFIG
          value: /config/config.yaml
        image: vertaaiofficial/modeldb-artifact-store:kubeflow
        imagePullPolicy: Always
        name: modeldb-artifact-store
        ports:
        - containerPort: 8086
        volumeMounts:
        - mountPath: /config
          name: modeldb-artifact-store-config
          readOnly: true
      volumes:
      - configMap:
          name: modeldb-modeldb-artifact-store-config
        name: modeldb-artifact-store-config
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-backend-proxy
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: modeldb
      kustomize.component: modeldb
      tier: backend-proxy
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        kustomize.component: modeldb
        tier: backend-proxy
    spec:
      containers:
      - args:
        - -project_endpoint
        - modeldb-backend:8085
        - -experiment_endpoint
        - modeldb-backend:8085
        - -experiment_run_endpoint
        - modeldb-backend:8085
        command:
        - /go/bin/proxy
        image: vertaaiofficial/modeldb-backend-proxy:kubeflow
        imagePullPolicy: Always
        name: modeldb-backend-proxy
        ports:
        - containerPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-backend
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: modeldb
      kustomize.component: modeldb
      tier: backend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        kustomize.component: modeldb
        tier: backend
    spec:
      containers:
      - env:
        - name: VERTA_MODELDB_CONFIG
          value: /config-backend/config.yaml
        image: vertaaiofficial/modeldb-backend:kubeflow
        imagePullPolicy: Always
        name: modeldb-backend
        ports:
        - containerPort: 8085
        volumeMounts:
        - mountPath: /config-backend
          name: modeldb-backend-secret-volume
          readOnly: true
      volumes:
      - name: modeldb-backend-secret-volume
        secret:
          secretName: modeldb-modeldb-backend-config-secret
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-mysql-backend
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: modeldb
      kustomize.component: modeldb
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        kustomize.component: modeldb
        tier: mysql
    spec:
      containers:
      - args:
        - --ignore-db-dir=lost+found
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: root
        image: mysql:5.7
        imagePullPolicy: Always
        name: modeldb-mysql-backend
        ports:
        - containerPort: 3306
        volumeMounts:
        - mountPath: /var/lib/mysql
          name: modeldb-mysql-persistent-storage
      volumes:
      - name: modeldb-mysql-persistent-storage
        persistentVolumeClaim:
          claimName: modeldb-modeldb-mysql-pv-claim
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-webapp
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: modeldb
      kustomize.component: modeldb
      tier: webapp
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: modeldb
        kustomize.component: modeldb
        tier: webapp
    spec:
      containers:
      - image: vertaaiofficial/modeldb-frontend:kubeflow
        imagePullPolicy: Always
        name: modeldb-webapp
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    app: modeldb
    kustomize.component: modeldb
  name: modeldb-modeldb-mysql-pv-claim
  namespace: kubeflow
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
`)
}
