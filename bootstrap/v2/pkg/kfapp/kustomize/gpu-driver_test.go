package kustomize_test

import (
  "testing"
)

func writeGpuDriver(th *KustTestHarness) {
  th.writeF("/manifests/gcp/gpu-driver/overlays/gcp/daemon-set.yaml", `
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  labels:
    k8s-app: nvidia-driver-installer
  name: nvidia-driver-installer
  namespace: kube-system
spec:
  template:
    metadata:
      labels:
        k8s-app: nvidia-driver-installer
        name: nvidia-driver-installer
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: cloud.google.com/gke-accelerator
                operator: Exists
      containers:
      - image: gcr.io/google-containers/pause:2.0
        name: pause
      hostNetwork: true
      hostPID: true
      initContainers:
      - env:
        - name: NVIDIA_INSTALL_DIR_HOST
          value: /home/kubernetes/bin/nvidia
        - name: NVIDIA_INSTALL_DIR_CONTAINER
          value: /usr/local/nvidia
        - name: ROOT_MOUNT_DIR
          value: /root
        image: cos-nvidia-installer:fixed
        imagePullPolicy: Never
        name: nvidia-driver-installer
        resources:
          requests:
            cpu: 0.15
        securityContext:
          privileged: true
        volumeMounts:
        - mountPath: /usr/local/nvidia
          name: nvidia-install-dir-host
        - mountPath: /dev
          name: dev
        - mountPath: /root
          name: root-mount
      tolerations:
      - operator: Exists
      volumes:
      - hostPath:
          path: /dev
        name: dev
      - hostPath:
          path: /home/kubernetes/bin/nvidia
        name: nvidia-install-dir-host
      - hostPath:
          path: /
        name: root-mount
`)
  th.writeK("/manifests/gcp/gpu-driver/overlays/gcp", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- daemon-set.yaml
commonLabels:
  kustomize.component: gpu-driver
images:
  - name: gcr.io/google-containers/pause
    newName: gcr.io/google-containers/pause
    newTag: "2.0"
  - name: cos-nvidia-installer
    newName: cos-nvidia-installer
    newTag: fixed
`)
}

func TestGpuDriver(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/gcp/gpu-driver/overlays/gcp")
  writeGpuDriver(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  labels:
    k8s-app: nvidia-driver-installer
    kustomize.component: gpu-driver
  name: nvidia-driver-installer
  namespace: kube-system
spec:
  selector:
    matchLabels:
      kustomize.component: gpu-driver
  template:
    metadata:
      labels:
        k8s-app: nvidia-driver-installer
        kustomize.component: gpu-driver
        name: nvidia-driver-installer
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: cloud.google.com/gke-accelerator
                operator: Exists
      containers:
      - image: gcr.io/google-containers/pause:2.0
        name: pause
      hostNetwork: true
      hostPID: true
      initContainers:
      - env:
        - name: NVIDIA_INSTALL_DIR_HOST
          value: /home/kubernetes/bin/nvidia
        - name: NVIDIA_INSTALL_DIR_CONTAINER
          value: /usr/local/nvidia
        - name: ROOT_MOUNT_DIR
          value: /root
        image: cos-nvidia-installer:fixed
        imagePullPolicy: Never
        name: nvidia-driver-installer
        resources:
          requests:
            cpu: 0.15
        securityContext:
          privileged: true
        volumeMounts:
        - mountPath: /usr/local/nvidia
          name: nvidia-install-dir-host
        - mountPath: /dev
          name: dev
        - mountPath: /root
          name: root-mount
      tolerations:
      - operator: Exists
      volumes:
      - hostPath:
          path: /dev
        name: dev
      - hostPath:
          path: /home/kubernetes/bin/nvidia
        name: nvidia-install-dir-host
      - hostPath:
          path: /
        name: root-mount
`)
}
