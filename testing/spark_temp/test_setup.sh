#set -e
#set -x
#set -o pipefail

kubectl create clusterrolebinding default-admin \
  --clusterrole=cluster-admin \
  --user=$(gcloud config get-value account) || echo "already have default admin"
export SERVICE_ACCOUNT=kf-spark-test
export KEY_FILE=${HOME}/secrets/${SERVICE_ACCOUNT_EMAIL}.json
export PROJECT_ID=boos-demo-projects-are-rad
export SERVICE_ACCOUNT_EMAIL=${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com
gcloud iam service-accounts create ${SERVICE_ACCOUNT} \
       --display-name "GCP Service Account for Spark tests" || echo "already have gcp service account"
gcloud iam service-accounts keys create ${KEY_FILE} \
  --iam-account ${SERVICE_ACCOUNT_EMAIL}
kubectl create secret generic user-gcp-sa \
  --from-file=user-gcp-sa.json="${KEY_FILE}" || echo "Secrets uploaded."
