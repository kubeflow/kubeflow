{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local daemonset = {
      "apiVersion": "extensions/v1beta1",
    	"kind": "DaemonSet",
    	"metadata": {
    		"name": "nvidia-driver-installer",
    		"namespace": "kube-system",
    		"labels": {
    			"k8s-app": "nvidia-driver-installer"
    		}
    	},
    	"spec": {
    		"template": {
    			"metadata": {
    				"labels": {
    					"name": "nvidia-driver-installer",
    					"k8s-app": "nvidia-driver-installer"
    				}
    			},
    			"spec": {
    				"affinity": {
    					"nodeAffinity": {
    						"requiredDuringSchedulingIgnoredDuringExecution": {
    							"nodeSelectorTerms": [
    								{
    									"matchExpressions": [
    										{
    											"key": "cloud.google.com/gke-accelerator",
    											"operator": "Exists"
    										}
    									]
    								}
    							]
    						}
    					}
    				},
    				"tolerations": [
    					{
    						"operator": "Exists"
    					}
    				],
    				"hostNetwork": true,
    				"hostPID": true,
    				"volumes": [
    					{
    						"name": "dev",
    						"hostPath": {
    							"path": "/dev"
    						}
    					},
    					{
    						"name": "nvidia-install-dir-host",
    						"hostPath": {
    							"path": "/home/kubernetes/bin/nvidia"
    						}
    					},
    					{
    						"name": "root-mount",
    						"hostPath": {
    							"path": "/"
    						}
    					}
    				],
    				"initContainers": [
    					{
    						"image": "cos-nvidia-installer:fixed",
    						"imagePullPolicy": "Never",
    						"name": "nvidia-driver-installer",
    						"resources": {
    							"requests": {
    								"cpu": 0.15
    							}
    						},
    						"securityContext": {
    							"privileged": true
    						},
    						"env": [
    							{
    								"name": "NVIDIA_INSTALL_DIR_HOST",
    								"value": "/home/kubernetes/bin/nvidia"
    							},
    							{
    								"name": "NVIDIA_INSTALL_DIR_CONTAINER",
    								"value": "/usr/local/nvidia"
    							},
    							{
    								"name": "ROOT_MOUNT_DIR",
    								"value": "/root"
    							}
    						],
    						"volumeMounts": [
    							{
    								"name": "nvidia-install-dir-host",
    								"mountPath": "/usr/local/nvidia"
    							},
    							{
    								"name": "dev",
    								"mountPath": "/dev"
    							},
    							{
    								"name": "root-mount",
    								"mountPath": "/root"
    							}
    						]
    					}
    				],
    				"containers": [
    					{
    						"image": "gcr.io/google-containers/pause:2.0",
    						"name": "pause"
    					}
    				]
    			}
    		}
    	}
    },
    daemonset:: daemonset,

    parts:: self,
    all:: [
      self.daemonset,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}
