package kustomize_test

import (
  "testing"
)

func writeGcpCredentialsAdmissionWebhook(th *KustTestHarness) {
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/mutating-webhook-configuration.yaml", `
apiVersion: admissionregistration.k8s.io/v1beta1
kind: MutatingWebhookConfiguration
metadata:
  name: gcp-cred-webhook
webhooks:
- clientConfig:
    caBundle: ""
    service:
      name: gcp-cred-webhook
      namespace: $(namespace)
      path: /add-cred
  name: gcp-cred-webhook.kubeflow.org
  rules:
  - apiGroups:
    - ""
    apiVersions:
    - v1
    operations:
    - CREATE
    resources:
    - pods
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: webhook-bootstrap
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: webhook-bootstrap
rules:
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - '*'
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: webhook-bootstrap
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: webhook-bootstrap
subjects:
- kind: ServiceAccount
  name: webhook-bootstrap
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/config-map.yaml", `
apiVersion: v1
data:
  create_ca.sh: |
    #!/bin/bash

    set -e

    usage() {
        cat <<EOF
    Generate certificate suitable for use with an sidecar-injector webhook service.
    This script uses k8s' CertificateSigningRequest API to a generate a
    certificate signed by k8s CA suitable for use with sidecar-injector webhook
    services. This requires permissions to create and approve CSR. See
    https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster for
    detailed explantion and additional instructions.
    The server key/cert k8s CA cert are stored in a k8s secret.
    usage: ${0} [OPTIONS]
    The following flags are required.
           --service          Service name of webhook.
           --namespace        Namespace where webhook service and secret reside.
           --secret           Secret name for CA certificate and server certificate/key pair.
    EOF
        exit 1
    }

    while [[ $# -gt 0 ]]; do
        case ${1} in
            --service)
                service="$2"
                shift
                ;;
            --secret)
                secret="$2"
                shift
                ;;
            --namespace)
                namespace="$2"
                shift
                ;;
            *)
                usage
                ;;
        esac
        shift
    done

    [ -z ${service} ] && service=gcp-cred-webhook
    [ -z ${secret} ] && secret=gcp-cred-webhook-certs
    [ -z ${namespace} ] && namespace=${NAMESPACE}
    [ -z ${namespace} ] && namespace=default

    echo ${service}
    echo ${namespace}
    echo ${secret}

    if [ ! -x "$(command -v openssl)" ]; then
        echo "openssl not found"
        exit 1
    fi

    csrName=${service}.${namespace}
    tmpdir=$(mktemp -d)
    echo "creating certs in tmpdir ${tmpdir} "

    # x509 outputs a self signed certificate instead of certificate request, later used as self signed root CA
    openssl req -x509 -newkey rsa:2048 -keyout ${tmpdir}/self_ca.key -out ${tmpdir}/self_ca.crt -days 365 -nodes -subj /C=/ST=/L=/O=/OU=/CN=test-certificate-authority

    cat <<EOF >> ${tmpdir}/csr.conf
    [req]
    req_extensions = v3_req
    distinguished_name = req_distinguished_name
    [req_distinguished_name]
    [ v3_req ]
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    extendedKeyUsage = serverAuth
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = ${service}
    DNS.2 = ${service}.${namespace}
    DNS.3 = ${service}.${namespace}.svc
    EOF

    openssl genrsa -out ${tmpdir}/server-key.pem 2048
    openssl req -new -key ${tmpdir}/server-key.pem -subj "/CN=${service}.${namespace}.svc" -out ${tmpdir}/server.csr -config ${tmpdir}/csr.conf

    # Self sign
    openssl x509 -req -days 365 -in ${tmpdir}/server.csr -CA ${tmpdir}/self_ca.crt -CAkey ${tmpdir}/self_ca.key -CAcreateserial -out ${tmpdir}/server-cert.pem

    # create the secret with CA cert and server cert/key
    kubectl create secret generic ${secret} \
            --from-file=key.pem=${tmpdir}/server-key.pem \
            --from-file=cert.pem=${tmpdir}/server-cert.pem \
            --dry-run -o yaml |
        kubectl -n ${namespace} apply -f -

    cat ${tmpdir}/self_ca.crt
    # -a means base64 encode
    caBundle=$(cat ${tmpdir}/self_ca.crt | openssl enc -a -A)
    echo ${caBundle}

    patchString='[{"op": "replace", "path": "/webhooks/0/clientConfig/caBundle", "value":"{{CA_BUNDLE}}"}]'
    patchString=$(echo ${patchString} | sed "s|{{CA_BUNDLE}}|${caBundle}|g")
    echo ${patchString}

    checkWebhookConfig() {
      currentBundle=$(kubectl get mutatingwebhookconfigurations -n ${namespace} gcp-cred-webhook -o jsonpath='{.webhooks[0].clientConfig.caBundle}')
      [[ "$currentBundle" == "$caBundle" ]]
    }

    while true; do
      if ! checkWebhookConfig; then
        echo "patching ca bundle for webhook configuration..."
        kubectl patch mutatingwebhookconfiguration gcp-cred-webhook \
            --type='json' -p="${patchString}"
      fi
      sleep 10
    done
kind: ConfigMap
metadata:
  name: webhook-bootstrap-config
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  labels:
    app: gcp-cred-webhook
  name: gcp-cred-webhook
spec:
  ports:
  - port: 443
    targetPort: 443
  selector:
    app: gcp-cred-webhook
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/deployment.yaml", `
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: gcp-cred-webhook
spec:
  template:
    metadata:
      labels:
        app: gcp-cred-webhook
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/gcp-admission-webhook:v20190401-v0.4.0-rc.1-309-g4014fa2e-dirty-be6212
        name: gcp-cred-webhook
        volumeMounts:
        - mountPath: /etc/webhook/certs
          name: webhook-cert
          readOnly: true
      volumes:
      - name: webhook-cert
        secret:
          secretName: gcp-cred-webhook-certs
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/stateful-set.yaml", `
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: webhook-bootstrap
spec:
  serviceName: gcp-cred-webhook
  selector:
    matchLabels:
      service: webhook-bootstrap
  template:
    metadata:
      labels:
        service: webhook-bootstrap
    spec:
      containers:
      - command:
        - sh
        - /var/webhook-config/create_ca.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: bootstrap
        volumeMounts:
        - mountPath: /var/webhook-config/
          name: webhook-config
      restartPolicy: Always
      serviceAccountName: webhook-bootstrap
      volumes:
      - configMap:
          name: webhook-bootstrap-config
        name: webhook-config
  # Workaround for https://github.com/kubernetes-sigs/kustomize/issues/677
  volumeClaimTemplates: []
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/params.yaml", `
varReference:
- path: webhooks/clientConfig/service/namespace
  kind: MutatingWebhookConfiguration
`)
  th.writeF("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp/params.env", `
namespace=kubeflow
`)
  th.writeK("/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- mutating-webhook-configuration.yaml
- service-account.yaml
- cluster-role.yaml
- cluster-role-binding.yaml
- config-map.yaml
- service.yaml
- deployment.yaml
- stateful-set.yaml
commonLabels:
  kustomize.component: gcp-credentials-admission-webhook
images:
  - name: gcr.io/kubeflow-images-public/gcp-admission-webhook
    newName: gcr.io/kubeflow-images-public/gcp-admission-webhook
    newTag: v20190401-v0.4.0-rc.1-309-g4014fa2e-dirty-be6212
  - name: gcr.io/kubeflow-images-public/ingress-setup
    newName: gcr.io/kubeflow-images-public/ingress-setup
    newTag: latest
configMapGenerator:
- name: gcp-credentials-admission-webhook-parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: namespace
  objref:
    kind: ConfigMap
    name: gcp-credentials-admission-webhook-parameters 
    apiVersion: v1
  fieldref:
    fieldpath: data.namespace
configurations:
- params.yaml
`)
}

func TestGcpCredentialsAdmissionWebhook(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/gcp/gcp-credentials-admission-webhook/overlays/gcp")
  writeGcpCredentialsAdmissionWebhook(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: admissionregistration.k8s.io/v1beta1
kind: MutatingWebhookConfiguration
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: gcp-cred-webhook
webhooks:
- clientConfig:
    caBundle: ""
    service:
      name: gcp-cred-webhook
      namespace: kubeflow
      path: /add-cred
  name: gcp-cred-webhook.kubeflow.org
  rules:
  - apiGroups:
    - ""
    apiVersions:
    - v1
    operations:
    - CREATE
    resources:
    - pods
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: webhook-bootstrap
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: webhook-bootstrap
rules:
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: webhook-bootstrap
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: webhook-bootstrap
subjects:
- kind: ServiceAccount
  name: webhook-bootstrap
---
apiVersion: v1
data:
  namespace: kubeflow
kind: ConfigMap
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: gcp-credentials-admission-webhook-parameters
---
apiVersion: v1
data:
  create_ca.sh: |
    #!/bin/bash

    set -e

    usage() {
        cat <<EOF
    Generate certificate suitable for use with an sidecar-injector webhook service.
    This script uses k8s' CertificateSigningRequest API to a generate a
    certificate signed by k8s CA suitable for use with sidecar-injector webhook
    services. This requires permissions to create and approve CSR. See
    https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster for
    detailed explantion and additional instructions.
    The server key/cert k8s CA cert are stored in a k8s secret.
    usage: ${0} [OPTIONS]
    The following flags are required.
           --service          Service name of webhook.
           --namespace        Namespace where webhook service and secret reside.
           --secret           Secret name for CA certificate and server certificate/key pair.
    EOF
        exit 1
    }

    while [[ $# -gt 0 ]]; do
        case ${1} in
            --service)
                service="$2"
                shift
                ;;
            --secret)
                secret="$2"
                shift
                ;;
            --namespace)
                namespace="$2"
                shift
                ;;
            *)
                usage
                ;;
        esac
        shift
    done

    [ -z ${service} ] && service=gcp-cred-webhook
    [ -z ${secret} ] && secret=gcp-cred-webhook-certs
    [ -z ${namespace} ] && namespace=${NAMESPACE}
    [ -z ${namespace} ] && namespace=default

    echo ${service}
    echo ${namespace}
    echo ${secret}

    if [ ! -x "$(command -v openssl)" ]; then
        echo "openssl not found"
        exit 1
    fi

    csrName=${service}.${namespace}
    tmpdir=$(mktemp -d)
    echo "creating certs in tmpdir ${tmpdir} "

    # x509 outputs a self signed certificate instead of certificate request, later used as self signed root CA
    openssl req -x509 -newkey rsa:2048 -keyout ${tmpdir}/self_ca.key -out ${tmpdir}/self_ca.crt -days 365 -nodes -subj /C=/ST=/L=/O=/OU=/CN=test-certificate-authority

    cat <<EOF >> ${tmpdir}/csr.conf
    [req]
    req_extensions = v3_req
    distinguished_name = req_distinguished_name
    [req_distinguished_name]
    [ v3_req ]
    basicConstraints = CA:FALSE
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment
    extendedKeyUsage = serverAuth
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = ${service}
    DNS.2 = ${service}.${namespace}
    DNS.3 = ${service}.${namespace}.svc
    EOF

    openssl genrsa -out ${tmpdir}/server-key.pem 2048
    openssl req -new -key ${tmpdir}/server-key.pem -subj "/CN=${service}.${namespace}.svc" -out ${tmpdir}/server.csr -config ${tmpdir}/csr.conf

    # Self sign
    openssl x509 -req -days 365 -in ${tmpdir}/server.csr -CA ${tmpdir}/self_ca.crt -CAkey ${tmpdir}/self_ca.key -CAcreateserial -out ${tmpdir}/server-cert.pem

    # create the secret with CA cert and server cert/key
    kubectl create secret generic ${secret} \
            --from-file=key.pem=${tmpdir}/server-key.pem \
            --from-file=cert.pem=${tmpdir}/server-cert.pem \
            --dry-run -o yaml |
        kubectl -n ${namespace} apply -f -

    cat ${tmpdir}/self_ca.crt
    # -a means base64 encode
    caBundle=$(cat ${tmpdir}/self_ca.crt | openssl enc -a -A)
    echo ${caBundle}

    patchString='[{"op": "replace", "path": "/webhooks/0/clientConfig/caBundle", "value":"{{CA_BUNDLE}}"}]'
    patchString=$(echo ${patchString} | sed "s|{{CA_BUNDLE}}|${caBundle}|g")
    echo ${patchString}

    checkWebhookConfig() {
      currentBundle=$(kubectl get mutatingwebhookconfigurations -n ${namespace} gcp-cred-webhook -o jsonpath='{.webhooks[0].clientConfig.caBundle}')
      [[ "$currentBundle" == "$caBundle" ]]
    }

    while true; do
      if ! checkWebhookConfig; then
        echo "patching ca bundle for webhook configuration..."
        kubectl patch mutatingwebhookconfiguration gcp-cred-webhook \
            --type='json' -p="${patchString}"
      fi
      sleep 10
    done
kind: ConfigMap
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: webhook-bootstrap-config
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: gcp-cred-webhook
    kustomize.component: gcp-credentials-admission-webhook
  name: gcp-cred-webhook
spec:
  ports:
  - port: 443
    targetPort: 443
  selector:
    app: gcp-cred-webhook
    kustomize.component: gcp-credentials-admission-webhook
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: gcp-cred-webhook
spec:
  selector:
    matchLabels:
      kustomize.component: gcp-credentials-admission-webhook
  template:
    metadata:
      labels:
        app: gcp-cred-webhook
        kustomize.component: gcp-credentials-admission-webhook
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/gcp-admission-webhook:v20190401-v0.4.0-rc.1-309-g4014fa2e-dirty-be6212
        name: gcp-cred-webhook
        volumeMounts:
        - mountPath: /etc/webhook/certs
          name: webhook-cert
          readOnly: true
      volumes:
      - name: webhook-cert
        secret:
          secretName: gcp-cred-webhook-certs
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    kustomize.component: gcp-credentials-admission-webhook
  name: webhook-bootstrap
spec:
  selector:
    matchLabels:
      kustomize.component: gcp-credentials-admission-webhook
      service: webhook-bootstrap
  serviceName: gcp-cred-webhook
  template:
    metadata:
      labels:
        kustomize.component: gcp-credentials-admission-webhook
        service: webhook-bootstrap
    spec:
      containers:
      - command:
        - sh
        - /var/webhook-config/create_ca.sh
        env:
        - name: NAMESPACE
          value: kubeflow
        image: gcr.io/kubeflow-images-public/ingress-setup:latest
        name: bootstrap
        volumeMounts:
        - mountPath: /var/webhook-config/
          name: webhook-config
      restartPolicy: Always
      serviceAccountName: webhook-bootstrap
      volumes:
      - configMap:
          name: webhook-bootstrap-config
        name: webhook-config
  volumeClaimTemplates: []
`)
}
