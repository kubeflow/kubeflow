POD=jupyter-web-app-deployment-64d5fd7b7c-tz5bk
cp -a dist dist2
rm -rf dist/frontend/assets/logos
tar czvf ff.tgz dist/frontend

kubectl cp ff.tgz -n kubeflow ${POD}:/
kubectl cp ../backend/apps/common/yaml/notebook_template.yaml -n kubeflow ${POD}:/
kubectl cp ../backend/apps/default/routes/post.py -n kubeflow ${POD}:/
kubectl cp ../backend/apps/common/utils.py -n kubeflow ${POD}:/
kubectl cp ../backend/apps/common/routes/patch.py -n kubeflow ${POD}:/
kubectl cp ../../common/backend/kubeflow/kubeflow/crud_backend/serving.py -n kubeflow ${POD}:/
kubectl cp ../backend/apps/common/routes/get.py -n kubeflow ${POD}:/
kubectl cp ../../common/backend/kubeflow/kubeflow/crud_backend/api/notebook.py -n kubeflow ${POD}:/
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;tar xzvf ff.tgz; cp -a dist/frontend/* /src/apps/default/static"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a notebook_template.yaml /src/apps/common/yaml/notebook_template.yaml"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a post.py /src/apps/default/routes/post.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a utils.py /src/apps/common/utils.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a patch.py /src/apps/common/routes/patch.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a serving.py /package/kubeflow/kubeflow/crud_backend/serving.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a serving.py /package/build/lib/kubeflow/kubeflow/crud_backend/serving.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a serving.py /usr/local/lib/python3.7/site-packages/kubeflow/kubeflow/crud_backend/serving.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a get.py /src/apps/common/routes/get.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a notebook.py /package/kubeflow/kubeflow/crud_backend/api/notebook.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a notebook.py /package/build/lib/kubeflow/kubeflow/crud_backend/api/notebook.py"
kubectl exec -n kubeflow ${POD} -- sh -c "cd /;cp -a notebook.py /usr/local/lib/python3.7/site-packages/kubeflow/kubeflow/crud_backend/api/notebook.py"
rm -rf dist
mv dist2 dist
exit 0
