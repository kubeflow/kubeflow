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
caBundle=`cat ${tmpdir}/self_ca.crt | openssl enc -a -A`
echo ${caBundle}

patchString='[{"op": "replace", "path": "/webhooks/0/clientConfig/caBundle", "value":"{{CA_BUNDLE}}"}]'
patchString=`echo ${patchString} | sed "s|{{CA_BUNDLE}}|${caBundle}|g"`
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
