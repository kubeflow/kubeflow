package kustomize_test

import (
  "testing"
)

func writeKubebench(th *KustTestHarness) {
  th.writeF("/manifests/kubebench/base/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubebench-operator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubebench-operator
subjects:
- kind: ServiceAccount
  name: default
`)
  th.writeF("/manifests/kubebench/base/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: kubebench-operator
rules:
- apiGroups:
  - kubebench.operator
  resources:
  - kubebenchjobs.kubebench.operator
  - kubebenchjobs
  verbs:
  - create
  - update
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  - pods
  - pods/exec
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  - secrets
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - tfjobs
  - pytorchjobs
  verbs:
  - '*'
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - '*'
`)
  th.writeF("/manifests/kubebench/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: kubebenchjobs.kubebench.operator
spec:
  group: kubebench.operator
  names:
    kind: KubebenchJob
    plural: kubebenchjobs
  scope: Namespaced
  version: v1
`)
  th.writeF("/manifests/kubebench/base/deployment.yaml", `
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: kubebench-dashboard
  name: kubebench-dashboard
spec:
  template:
    metadata:
      labels:
        app: kubebench-dashboard
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard:v0.4.0-13-g262c593
        name: kubebench-dashboard
        ports:
        - containerPort: 8084
      seviceAccountName: kubebench-dashboard
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: kubebench-operator
spec:
  selector:
    matchLabels:
      app: kubebench-operator
  template:
    metadata:
      labels:
        app: kubebench-operator
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/kubebench/kubebench-operator:v0.4.0-13-g262c593
        name: kubebench-operator
      seviceAccountName: kubebench-operator
`)
  th.writeF("/manifests/kubebench/base/role-binding.yaml", `
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: kubebench-dashboard
  name: kubebench-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubebench-dashboard
subjects:
- kind: ServiceAccount
  name: kubebench-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  name: kubebench-user-kubebench-job
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubebench-user-kubebench-job
subjects:
- kind: ServiceAccount
  name: kubebench-user-kubebench-job
`)
  th.writeF("/manifests/kubebench/base/role.yaml", `
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: kubebench-dashboard
  name: kubebench-dashboard
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/exec
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  name: kubebench-user-kubebench-job
rules:
- apiGroups:
  - kubeflow.org
  resources:
  - tfjobs
  - pytorchjobs
  - mpijobs
  verbs:
  - '*'
- apiGroups:
  - apiextensions.k8s.io
  resources:
  - customresourcedefinitions
  verbs:
  - '*'
- apiGroups:
  - storage.k8s.io
  resources:
  - storageclasses
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - configmaps
  - pods
  - pods/log
  - pods/exec
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  verbs:
  - '*'
- apiGroups:
  - apps
  - extensions
  resources:
  - deployments
  verbs:
  - '*'
`)
  th.writeF("/manifests/kubebench/base/service-account.yaml", `
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kubebench-dashboard
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kubebench-user-kubebench-job
`)
  th.writeF("/manifests/kubebench/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: kubebench-dashboard-ui-mapping
      prefix: /dashboard/
      rewrite: /dashboard/
      service: kubebench-dashboard.$(namespace)
  name: kubebench-dashboard
spec:
  ports:
  - port: 80
    targetPort: 9303
  selector:
    app: kubebench-dashboard
`)
  th.writeF("/manifests/kubebench/base/workflow.yaml", `
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  name: kubebench-job
spec:
  entrypoint: kubebench-workflow
  serviceAccountName: kubebench-user-kubebench-job
  templates:
  - name: kubebench-workflow
    steps:
    - - name: run-configurator
        template: configurator
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: launch-main-job
        template: main-job
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
        name: wait-for-main-job
        template: main-job-monitor
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: run-post-job
        template: post-job
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: run-reporter
        template: reporter
  - container:
      command:
      - configurator
      - '--template-ref={"name": "kubebench-example-tfcnn", "package": "kubebench-examples",
        "registry": "github.com/kubeflow/kubebench/tree/master/kubebench"}'
      - --config=tf-cnn/tf-cnn-dummy.yaml
      - --namespace=kubeflow
      - '--owner-references=[{"apiVersion": "argoproj.io/v1alpha1", "blockOwnerDeletion":
        true, "kind": "Workflow", "name": "{{workflow.name}}", "uid": "{{workflow.uid}}"}]'
      - '--volumes=[{"name": "kubebench-config-volume", "persistentVolumeClaim": {"claimName":
        "kubebench-config-pvc"}}, {"name": "kubebench-exp-volume", "persistentVolumeClaim":
        {"claimName": "kubebench-exp-pvc"}}]'
      - '--volume-mounts=[{"mountPath": "/kubebench/config", "name": "kubebench-config-volume"},
        {"mountPath": "/kubebench/experiments", "name": "kubebench-exp-volume"}]'
      - '--env-vars=[{"name": "KUBEBENCH_CONFIG_ROOT", "value": "/kubebench/config"},
        {"name": "KUBEBENCH_EXP_ROOT", "value": "/kubebench/experiments"}, {"name":
        "KUBEBENCH_DATA_ROOT", "value": "/kubebench/data"}, {"name": "KUBEBENCH_EXP_ID",
        "value": "null"}, {"name": "KUBEBENCH_EXP_PATH", "value": "$(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)"},
        {"name": "KUBEBENCH_EXP_CONFIG_PATH", "value": "$(KUBEBENCH_EXP_PATH)/config"},
        {"name": "KUBEBENCH_EXP_OUTPUT_PATH", "value": "$(KUBEBENCH_EXP_PATH)/output"},
        {"name": "KUBEBENCH_EXP_RESULT_PATH", "value": "$(KUBEBENCH_EXP_PATH)/result"}]'
      - --manifest-output=/kubebench/configurator/output/kf-job-manifest.yaml
      - --experiment-id-output=/kubebench/configurator/output/experiment-id
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-controller:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    name: configurator
    outputs:
      parameters:
      - name: kf-job-manifest
        valueFrom:
          path: /kubebench/configurator/output/kf-job-manifest.yaml
      - name: experiment-id
        valueFrom:
          path: /kubebench/configurator/output/experiment-id
  - inputs:
      parameters:
      - name: kf-job-manifest
    name: main-job
    resource:
      action: create
      manifest: '{{inputs.parameters.kf-job-manifest}}'
      successCondition: status.startTime
  - inputs:
      parameters:
      - name: kf-job-manifest
    name: main-job-monitor
    resource:
      action: get
      manifest: '{{inputs.parameters.kf-job-manifest}}'
      successCondition: status.completionTime
  - container:
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      - name: KUBEBENCH_EXP_ID
        value: '{{inputs.parameters.experiment-id}}'
      - name: KUBEBENCH_EXP_PATH
        value: $(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)
      - name: KUBEBENCH_EXP_CONFIG_PATH
        value: $(KUBEBENCH_EXP_PATH)/config
      - name: KUBEBENCH_EXP_OUTPUT_PATH
        value: $(KUBEBENCH_EXP_PATH)/output
      - name: KUBEBENCH_EXP_RESULT_PATH
        value: $(KUBEBENCH_EXP_PATH)/result
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-example-tf-cnn-post-processor:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    inputs:
      parameters:
      - name: experiment-id
    name: post-job
  - container:
      command:
      - reporter
      - csv
      - --input-file=result.json
      - --output-file=report.csv
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      - name: KUBEBENCH_EXP_ID
        value: '{{inputs.parameters.experiment-id}}'
      - name: KUBEBENCH_EXP_PATH
        value: $(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)
      - name: KUBEBENCH_EXP_CONFIG_PATH
        value: $(KUBEBENCH_EXP_PATH)/config
      - name: KUBEBENCH_EXP_OUTPUT_PATH
        value: $(KUBEBENCH_EXP_PATH)/output
      - name: KUBEBENCH_EXP_RESULT_PATH
        value: $(KUBEBENCH_EXP_PATH)/result
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-controller:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    inputs:
      parameters:
      - name: experiment-id
    name: reporter
  volumes:
  - name: kubebench-config-volume
    persistentVolumeClaim:
      claimName: kubebench-config-pvc
  - name: kubebench-exp-volume
    persistentVolumeClaim:
      claimName: kubebench-exp-pvc
`)
  th.writeF("/manifests/kubebench/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeK("/manifests/kubebench/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- crd.yaml
- deployment.yaml
- role-binding.yaml
- role.yaml
- service-account.yaml
- service.yaml
- workflow.yaml
commonLabels:
  kustomize.component: kubebench
images:
  - name: gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard
    newName: gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard
    newTag: v0.4.0-13-g262c593
  - name: gcr.io/kubeflow-images-public/kubebench/kubebench-operator
    newName: gcr.io/kubeflow-images-public/kubebench/kubebench-operator
    newTag: v0.4.0-13-g262c593
  - name: gcr.io/kubeflow-images-public/kubebench/kubebench-controller
    newName: gcr.io/kubeflow-images-public/kubebench/kubebench-controller
    newTag: v0.4.0-13-g262c593
  - name: gcr.io/kubeflow-images-public/kubebench/kubebench-example-tf-cnn-post-processor
    newName: gcr.io/kubeflow-images-public/kubebench/kubebench-example-tf-cnn-post-processor
    newTag: v0.4.0-13-g262c593
vars:
- name: namespace
  objref:
    kind: Service
    name: kubebench-dashboard
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace
configurations:
- params.yaml
`)
}

func TestKubebench(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/kubebench/base")
  writeKubebench(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebenchjobs.kubebench.operator
spec:
  group: kubebench.operator
  names:
    kind: KubebenchJob
    plural: kubebenchjobs
  scope: Namespaced
  version: v1
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: kubebench
  name: default
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-dashboard
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-user-kubebench-job
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: kubebench-dashboard
    kustomize.component: kubebench
  name: kubebench-dashboard
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/exec
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-user-kubebench-job
  namespace: kubeflow
rules:
- apiGroups:
  - kubeflow.org
  resources:
  - tfjobs
  - pytorchjobs
  - mpijobs
  verbs:
  - '*'
- apiGroups:
  - apiextensions.k8s.io
  resources:
  - customresourcedefinitions
  verbs:
  - '*'
- apiGroups:
  - storage.k8s.io
  resources:
  - storageclasses
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - configmaps
  - pods
  - pods/log
  - pods/exec
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  verbs:
  - '*'
- apiGroups:
  - apps
  - extensions
  resources:
  - deployments
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-operator
rules:
- apiGroups:
  - kubebench.operator
  resources:
  - kubebenchjobs.kubebench.operator
  - kubebenchjobs
  verbs:
  - create
  - update
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  - pods
  - pods/exec
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  - secrets
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - tfjobs
  - pytorchjobs
  verbs:
  - '*'
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: kubebench-dashboard
    kustomize.component: kubebench
  name: kubebench-dashboard
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubebench-dashboard
subjects:
- kind: ServiceAccount
  name: kubebench-dashboard
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-user-kubebench-job
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubebench-user-kubebench-job
subjects:
- kind: ServiceAccount
  name: kubebench-user-kubebench-job
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-operator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubebench-operator
subjects:
- kind: ServiceAccount
  name: default
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: kubebench-dashboard-ui-mapping
      prefix: /dashboard/
      rewrite: /dashboard/
      service: kubebench-dashboard.kubeflow
  labels:
    kustomize.component: kubebench
  name: kubebench-dashboard
  namespace: kubeflow
spec:
  ports:
  - port: 80
    targetPort: 9303
  selector:
    app: kubebench-dashboard
    kustomize.component: kubebench
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: kubebench-dashboard
    kustomize.component: kubebench
  name: kubebench-dashboard
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      kustomize.component: kubebench
  template:
    metadata:
      labels:
        app: kubebench-dashboard
        kustomize.component: kubebench
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard:v0.4.0-13-g262c593
        name: kubebench-dashboard
        ports:
        - containerPort: 8084
      seviceAccountName: kubebench-dashboard
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-operator
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: kubebench-operator
      kustomize.component: kubebench
  template:
    metadata:
      labels:
        app: kubebench-operator
        kustomize.component: kubebench
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/kubebench/kubebench-operator:v0.4.0-13-g262c593
        name: kubebench-operator
      seviceAccountName: kubebench-operator
---
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  labels:
    kustomize.component: kubebench
  name: kubebench-job
  namespace: kubeflow
spec:
  entrypoint: kubebench-workflow
  serviceAccountName: kubebench-user-kubebench-job
  templates:
  - name: kubebench-workflow
    steps:
    - - name: run-configurator
        template: configurator
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: launch-main-job
        template: main-job
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
        name: wait-for-main-job
        template: main-job-monitor
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: run-post-job
        template: post-job
    - - arguments:
          parameters:
          - name: kf-job-manifest
            value: '{{steps.run-configurator.outputs.parameters.kf-job-manifest}}'
          - name: experiment-id
            value: '{{steps.run-configurator.outputs.parameters.experiment-id}}'
        name: run-reporter
        template: reporter
  - container:
      command:
      - configurator
      - '--template-ref={"name": "kubebench-example-tfcnn", "package": "kubebench-examples",
        "registry": "github.com/kubeflow/kubebench/tree/master/kubebench"}'
      - --config=tf-cnn/tf-cnn-dummy.yaml
      - --namespace=kubeflow
      - '--owner-references=[{"apiVersion": "argoproj.io/v1alpha1", "blockOwnerDeletion":
        true, "kind": "Workflow", "name": "{{workflow.name}}", "uid": "{{workflow.uid}}"}]'
      - '--volumes=[{"name": "kubebench-config-volume", "persistentVolumeClaim": {"claimName":
        "kubebench-config-pvc"}}, {"name": "kubebench-exp-volume", "persistentVolumeClaim":
        {"claimName": "kubebench-exp-pvc"}}]'
      - '--volume-mounts=[{"mountPath": "/kubebench/config", "name": "kubebench-config-volume"},
        {"mountPath": "/kubebench/experiments", "name": "kubebench-exp-volume"}]'
      - '--env-vars=[{"name": "KUBEBENCH_CONFIG_ROOT", "value": "/kubebench/config"},
        {"name": "KUBEBENCH_EXP_ROOT", "value": "/kubebench/experiments"}, {"name":
        "KUBEBENCH_DATA_ROOT", "value": "/kubebench/data"}, {"name": "KUBEBENCH_EXP_ID",
        "value": "null"}, {"name": "KUBEBENCH_EXP_PATH", "value": "$(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)"},
        {"name": "KUBEBENCH_EXP_CONFIG_PATH", "value": "$(KUBEBENCH_EXP_PATH)/config"},
        {"name": "KUBEBENCH_EXP_OUTPUT_PATH", "value": "$(KUBEBENCH_EXP_PATH)/output"},
        {"name": "KUBEBENCH_EXP_RESULT_PATH", "value": "$(KUBEBENCH_EXP_PATH)/result"}]'
      - --manifest-output=/kubebench/configurator/output/kf-job-manifest.yaml
      - --experiment-id-output=/kubebench/configurator/output/experiment-id
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-controller:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    name: configurator
    outputs:
      parameters:
      - name: kf-job-manifest
        valueFrom:
          path: /kubebench/configurator/output/kf-job-manifest.yaml
      - name: experiment-id
        valueFrom:
          path: /kubebench/configurator/output/experiment-id
  - inputs:
      parameters:
      - name: kf-job-manifest
    name: main-job
    resource:
      action: create
      manifest: '{{inputs.parameters.kf-job-manifest}}'
      successCondition: status.startTime
  - inputs:
      parameters:
      - name: kf-job-manifest
    name: main-job-monitor
    resource:
      action: get
      manifest: '{{inputs.parameters.kf-job-manifest}}'
      successCondition: status.completionTime
  - container:
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      - name: KUBEBENCH_EXP_ID
        value: '{{inputs.parameters.experiment-id}}'
      - name: KUBEBENCH_EXP_PATH
        value: $(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)
      - name: KUBEBENCH_EXP_CONFIG_PATH
        value: $(KUBEBENCH_EXP_PATH)/config
      - name: KUBEBENCH_EXP_OUTPUT_PATH
        value: $(KUBEBENCH_EXP_PATH)/output
      - name: KUBEBENCH_EXP_RESULT_PATH
        value: $(KUBEBENCH_EXP_PATH)/result
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-example-tf-cnn-post-processor:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    inputs:
      parameters:
      - name: experiment-id
    name: post-job
  - container:
      command:
      - reporter
      - csv
      - --input-file=result.json
      - --output-file=report.csv
      env:
      - name: KUBEBENCH_CONFIG_ROOT
        value: /kubebench/config
      - name: KUBEBENCH_EXP_ROOT
        value: /kubebench/experiments
      - name: KUBEBENCH_DATA_ROOT
        value: /kubebench/data
      - name: KUBEBENCH_EXP_ID
        value: '{{inputs.parameters.experiment-id}}'
      - name: KUBEBENCH_EXP_PATH
        value: $(KUBEBENCH_EXP_ROOT)/$(KUBEBENCH_EXP_ID)
      - name: KUBEBENCH_EXP_CONFIG_PATH
        value: $(KUBEBENCH_EXP_PATH)/config
      - name: KUBEBENCH_EXP_OUTPUT_PATH
        value: $(KUBEBENCH_EXP_PATH)/output
      - name: KUBEBENCH_EXP_RESULT_PATH
        value: $(KUBEBENCH_EXP_PATH)/result
      image: gcr.io/kubeflow-images-public/kubebench/kubebench-controller:v0.4.0-13-g262c593
      volumeMounts:
      - mountPath: /kubebench/config
        name: kubebench-config-volume
      - mountPath: /kubebench/experiments
        name: kubebench-exp-volume
    inputs:
      parameters:
      - name: experiment-id
    name: reporter
  volumes:
  - name: kubebench-config-volume
    persistentVolumeClaim:
      claimName: kubebench-config-pvc
  - name: kubebench-exp-volume
    persistentVolumeClaim:
      claimName: kubebench-exp-pvc
`)
}
