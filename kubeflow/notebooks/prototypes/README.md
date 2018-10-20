
CRD will require a template that holds:

User:
Image: 
CPU:
Memory:
ExtraResourceLimits:
PV:

Will need to launch
jupyter-kam

$ ☞  kubectl get pods jupyter-kam -oyaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    hub.jupyter.org/username: kam
  creationTimestamp: 2018-10-18T12:50:58Z
  labels:
    app: jupyterhub
    component: singleuser-server
    heritage: jupyterhub
  name: jupyter-kam
  namespace: kubeflow
  resourceVersion: "4039141"
  selfLink: /api/v1/namespaces/kubeflow/pods/jupyter-kam
  uid: 757d4657-d2d4-11e8-83f2-42010a8a0020
spec:
  containers:
  - args:
    - start-singleuser.sh
    - --ip="0.0.0.0"
    - --port=8888
    - --allow-root
    env:
    - name: JUPYTERHUB_API_TOKEN
      value: c383ee33796a40eaafb3bfb6dfc4c9e3
    - name: JPY_API_TOKEN
      value: c383ee33796a40eaafb3bfb6dfc4c9e3
    - name: JUPYTERHUB_CLIENT_ID
      value: jupyterhub-user-kam
    - name: JUPYTERHUB_HOST
    - name: JUPYTERHUB_OAUTH_CALLBACK_URL
      value: /user/kam/oauth_callback
    - name: JUPYTERHUB_USER
      value: kam
    - name: JUPYTERHUB_API_URL
      value: http://jupyterhub-0:8081/hub/api
    - name: JUPYTERHUB_BASE_URL
      value: /
    - name: JUPYTERHUB_SERVICE_PREFIX
      value: /user/kam/
    - name: MEM_GUARANTEE
      value: 1Gi
    - name: CPU_GUARANTEE
      value: 500m
    image: gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0
    imagePullPolicy: IfNotPresent
    lifecycle: {}
    name: notebook
    ports:
    - containerPort: 8888
      name: notebook-port
      protocol: TCP
    resources:
      requests:
        cpu: 500m
        memory: 1Gi
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /home/jovyan
      name: volume-kam
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: jupyter-notebook-token-dk8jv
      readOnly: true
    workingDir: /home/jovyan
  dnsPolicy: ClusterFirst
  nodeName: gke-authz-kam-default-pool-dd1aa33a-sr1k
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext:
    fsGroup: 100
    runAsUser: 1000
  serviceAccount: jupyter-notebook
  serviceAccountName: jupyter-notebook
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: volume-kam
    persistentVolumeClaim:
      claimName: claim-kam
  - name: jupyter-notebook-token-dk8jv
    secret:
      defaultMode: 420
      secretName: jupyter-notebook-token-dk8jv
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: 2018-10-18T12:51:00Z
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: 2018-10-18T12:53:38Z
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: 2018-10-18T12:51:00Z
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://c62d8e2573f6e2115954f2adcd2ba537ed7e170f51eadf48db899f2834b73d52
    image: gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0
    imageID: docker-pullable://gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu@sha256:bd3d2ae9a4e07b2b58910e99a26676ab31f4ba5ae2a633fbde5ce8dee8b63024
    lastState:
      terminated:
        containerID: docker://ec0cb5613a44323300e2aab50350b438691238bc03dbf512d730b50333e31e63
        exitCode: 1
        finishedAt: 2018-10-18T12:53:36Z
        reason: Error
        startedAt: 2018-10-18T12:53:36Z
    name: notebook
    ready: true
    restartCount: 1
    state:
      running:
        startedAt: 2018-10-18T12:53:37Z
  hostIP: 10.138.0.14
  phase: Running
  podIP: 10.64.0.168
  qosClass: Burstable
  startTime: 2018-10-18T12:51:00Z


$ ☞  kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                STORAGECLASS   REASON    AGE
pvc-3e091951-d2d3-11e8-83f2-42010a8a0020   10Gi       RWO            Delete           Bound     kubeflow/vizier-db   standard                 14m
pvc-75722f69-d2d4-11e8-83f2-42010a8a0020   10Gi       RWO            Delete           Bound     kubeflow/claim-kam   standard                 5m
